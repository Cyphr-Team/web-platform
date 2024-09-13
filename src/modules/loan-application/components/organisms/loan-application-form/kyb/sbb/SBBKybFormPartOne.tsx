import { Card } from "@/components/ui/card"
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
  SbbKybFormPartOneValue,
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
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import {
  BINARY_VALUES,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form"
import { AutoCompleteGoogleMap } from "@/modules/loan-application/components/molecules/autocomplete/AutoCompleteGoogleMap"
import { AddressType } from "@/types/common.type"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { useSelectCities } from "@/modules/loan-application/hooks/useSelectCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"
import { isEnableGoogleMapInput } from "@/utils/feature-flag.utils"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"

export const SBBKybFormPartOne = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const { sbbBusinessInformationPartOne, dispatchFormAction } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () =>
      // because we are using zodResolver with refined schema, we need to get shape from _def.schema instead of directly from schema
      Object.keys(sbbKybFormSchemaPartOne._def.schema.shape).reduce(
        (acc, key) => ({
          ...acc,
          [key]: get(sbbBusinessInformationPartOne, key, "")
        }),
        {} as SbbKybFormPartOneValue
      ),
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

  const handleAutoCompleteAddress = (address: AddressType) => {
    form.setValue(SBB_KYB_FORM_FIELDS.STATE, address.state, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    form.setValue(SBB_KYB_FORM_FIELDS.CITY, address.city, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    form.setValue(SBB_KYB_FORM_FIELDS.POSTAL_CODE, address.zip, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    form.setValue(SBB_KYB_FORM_FIELDS.ADDRESS_LINE_1, address.addressLine1, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

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

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
      id={LOAN_APPLICATION_STEPS.SBB_BUSINESS_INFORMATION_PART_ONE}
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <Form {...form}>
        <form className="grid grid-cols-12 gap-y-2xl gap-x-4xl">
          {SBB_KYB_FORM_BLOCKS_PART_ONE.map(({ type, props, name }) => {
            if (
              name === SBB_KYB_FORM_FIELDS.ADDRESS_LINE_1 &&
              isEnableGoogleMapInput()
            ) {
              return (
                <AutoCompleteGoogleMap
                  key={name}
                  onSelect={handleAutoCompleteAddress}
                  defaultValues={{
                    addressLine1: defaultValues.addressLine1,
                    state: defaultValues[SBB_KYB_FORM_FIELDS.STATE],
                    country: "United States",
                    countryCode: "US",
                    zip: defaultValues.postalCode,
                    city: defaultValues.city
                  }}
                />
              )
            }
            if (name === SBB_KYB_FORM_FIELDS.CITY) {
              return (
                <AutoCompleteCities
                  key={name}
                  options={
                    STATE_DATA.find((s) => s.name === form.getValues("state"))
                      ?.cities ?? []
                  }
                  label="Business city"
                  emptyText="No results found"
                  name="city"
                  control={form.control}
                  onChange={handleChangeCity}
                  value={form.getValues("city")}
                  className="col-span-4"
                  required
                />
              )
            }
            if (name === SBB_KYB_FORM_FIELDS.STATE) {
              return (
                <AutoCompleteStates
                  key={name}
                  options={STATE_DATA}
                  label="Business state"
                  emptyText="No results found"
                  name="state"
                  control={form.control}
                  onChange={handleChangeState}
                  value={form.getValues("state")}
                  className="col-span-4"
                  required
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
                  className="flex flex-col col-span-12"
                  key={SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY}
                >
                  <RHFOptionInput
                    className="col-span-12"
                    name={SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY}
                    options={YES_NO_OPTIONS}
                    {...props}
                    label="Is your business of subsidiary of another business?"
                  />
                  {form.watch(SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY) ===
                    BINARY_VALUES.YES && (
                    <RHFTextInput
                      label="If yes, what is the name of the owning company?"
                      key={SBB_KYB_FORM_FIELDS.PARENT_COMPANY}
                      className="col-span-12 flex items-end gap-1 "
                      styleProps={{
                        inputClassName: cn(
                          "ml-2.5 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                          "text-sm text-text-secondary font-normal",
                          "!max-w-40 border-l-0 border-r-0 border-t-0 rounded-none"
                        ),
                        labelClassName: "leading-normal"
                      }}
                      name={SBB_KYB_FORM_FIELDS.PARENT_COMPANY}
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
          onSubmit={form.handleSubmit(onSubmit)}
          isDisabled={!form.formState.isValid}
        />
      )}
    </Card>
  )
}
