import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  SBB_KYB_FORM_BLOCKS_PART_ONE,
  SBB_KYB_FORM_FIELDS,
  type SbbKybFormPartOneValue,
  sbbKybFormSchemaPartOne
} from "./const"
import { ComponentMapper } from "@/modules/form-template/components/templates/FormTemplate"
import {
  RHFOptionInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useEffect, useMemo } from "react"

import { get } from "lodash"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import {
  BINARY_VALUES,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form"
import { AutoCompleteGoogleMap } from "@/modules/loan-application/components/molecules/autocomplete/AutoCompleteGoogleMap"
import { type AddressType } from "@/types/common.type"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { useSelectCities } from "@/modules/loan-application/hooks/utils/useSelectCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"
import { isEnableGoogleMapInput } from "@/utils/feature-flag.utils"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

export function SBBKybFormPartOne() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const { sbbBusinessInformationPartOne, dispatchFormAction } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () => getOrDefault(sbbBusinessInformationPartOne),
    [sbbBusinessInformationPartOne]
  )

  const onSubmit = (data: SbbKybFormPartOneValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE,
      state: {
        ...data
      }
    })
    finishCurrentStep()
  }

  const form = useForm<SbbKybFormPartOneValue>({
    resolver: zodResolver(sbbKybFormSchemaPartOne),
    values: defaultValues,
    mode: "onBlur"
  })

  useAutoCompleteStepEffect(
    form,
    LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE
  )

  const { handleChangeCity, handleChangeState, city, state, STATE_DATA } =
    useSelectCities()

  useEffect(() => {
    if (city) {
      form.setValue(SBB_KYB_FORM_FIELDS.CITY, city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue(SBB_KYB_FORM_FIELDS.STATE, state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue(SBB_KYB_FORM_FIELDS.CITY, "", {
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [form, state])
  const handleAutoCompleteAddress = (address: AddressType) => {
    form.setValue(SBB_KYB_FORM_FIELDS.STATE, address.state, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    handleChangeState(address.state)
    handleChangeCity(address.city)
    form.setValue(SBB_KYB_FORM_FIELDS.CITY, address.city, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    // Remove space from postal code
    form.setValue(
      SBB_KYB_FORM_FIELDS.POSTAL_CODE,
      address.zip.replace(/ /g, ""),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      }
    )
    form.setValue(SBB_KYB_FORM_FIELDS.ADDRESS_LINE_1, address.addressLine1, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  return (
    <FormLayout
      id={LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE}
      title="Business Information"
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <Form {...form}>
        <form className="grid grid-cols-12 gap-x-4xl gap-y-2xl">
          {SBB_KYB_FORM_BLOCKS_PART_ONE.map(({ type, props, name }) => {
            if (
              name === SBB_KYB_FORM_FIELDS.ADDRESS_LINE_1 &&
              isEnableGoogleMapInput()
            ) {
              return (
                <AutoCompleteGoogleMap
                  key={name}
                  defaultValues={{
                    addressLine1: defaultValues.addressLine1,
                    state: defaultValues[SBB_KYB_FORM_FIELDS.STATE],
                    country: "United States",
                    countryCode: "US",
                    zip: defaultValues.postalCode,
                    city: defaultValues.city
                  }}
                  onSelect={handleAutoCompleteAddress}
                />
              )
            }
            if (name === SBB_KYB_FORM_FIELDS.CITY) {
              return (
                <AutoCompleteCities
                  key={name}
                  required
                  className="col-span-4"
                  control={form.control}
                  emptyText="No results found"
                  label="Business city"
                  name="city"
                  options={
                    STATE_DATA.find((s) => s.name === form.getValues("state"))
                      ?.cities ?? []
                  }
                  value={form.getValues("city")}
                  onChange={handleChangeCity}
                />
              )
            }
            if (name === SBB_KYB_FORM_FIELDS.STATE) {
              return (
                <AutoCompleteStates
                  key={name}
                  required
                  className="col-span-4"
                  control={form.control}
                  emptyText="No results found"
                  label="Business state"
                  name="state"
                  options={STATE_DATA}
                  value={form.getValues("state")}
                  onChange={handleChangeState}
                />
              )
            }

            if (name !== SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY) {
              const Component = ComponentMapper[type]

              return (
                <Component
                  key={name}
                  className="col-span-12"
                  name={name}
                  {...props}
                />
              )
            } else {
              return (
                <div
                  key={SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY}
                  className="col-span-12 flex flex-col"
                >
                  <RHFOptionInput
                    className="col-span-12"
                    name={SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY}
                    {...props}
                    label="Is your business of subsidiary of another business?"
                    options={YES_NO_OPTIONS}
                  />
                  {form.watch(SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY) ===
                    BINARY_VALUES.YES && (
                    <RHFTextInput
                      key={SBB_KYB_FORM_FIELDS.PARENT_COMPANY}
                      className="col-span-12 flex items-end gap-1 "
                      label="If yes, what is the name of the owning company?"
                      name={SBB_KYB_FORM_FIELDS.PARENT_COMPANY}
                      styleProps={{
                        inputClassName: cn(
                          "ml-2.5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                          "text-sm font-normal text-text-secondary",
                          "!max-w-40 rounded-none border-x-0 border-t-0"
                        ),
                        labelClassName: "leading-normal"
                      }}
                    />
                  )}
                </div>
              )
            }
          })}
        </form>
      </Form>

      {!isReviewApplicationStep(step) && (
        <FormSubmitButton
          isDisabled={!form.formState.isValid}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      )}
    </FormLayout>
  )
}

function getOrDefault(
  sbbBusinessInformationPartOne: SbbKybFormPartOneValue
): SbbKybFormPartOneValue {
  return Object.keys(
    // because we are using zodResolver with refined schema, we need to get shape from _def.schema instead of directly from schema
    sbbKybFormSchemaPartOne._def.schema.shape
  ).reduce<SbbKybFormPartOneValue>(
    (acc, key) => ({
      ...acc,
      [key]: get(sbbBusinessInformationPartOne, key, "")
    }),
    {
      addressLine1: "",
      businessLegalName: "",
      businessTin: "",
      businessWebsite: "",
      cbdRelatedBusiness: "",
      city: "",
      customerType: "",
      dba: "",
      id: "",
      industryType: "",
      involvedInWeaponsSales: "",
      isHoldingCompany: "",
      isSubsidiary: "",
      marijuanaRelatedBusiness: "",
      numberOfW2Employees: "",
      ownedByTrust: "",
      parentCompany: "",
      politicalOrgContributor: "",
      postalCode: "",
      state: "",
      totalNumberOfEmployees: "",
      yearsInOperation: ""
    }
  )
}
