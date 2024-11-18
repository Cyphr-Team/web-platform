import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ComponentMapper } from "@/modules/form-template/components/templates/FormTemplate"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { useEffect, useMemo } from "react"

import { get } from "lodash"
import {
  SBB_KYC_FIELD_NAMES,
  SBB_KYC_FORM_BLOCKS,
  sbbKycFormSchema,
  type SbbKycFormValue
} from "./const"
import { BeneficialOwnersInput } from "./BeneficialOwners"
import { ControlAuthorization } from "./ControlAuthorization"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { useSelectCities } from "@/modules/loan-application/hooks/useSelectCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"
import { type AddressType } from "@/types/common.type"
import { AutoCompleteGoogleMap } from "@/modules/loan-application/components/molecules/autocomplete/AutoCompleteGoogleMap"
import { isEnableGoogleMapInput } from "@/utils/feature-flag.utils"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"
import { cn } from "@/lib/utils.ts"

export function SbbKycForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const { dispatchFormAction, ownerInformationForm } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(() => {
    return {
      [SBB_KYC_FIELD_NAMES.ID]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.ID,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.ADDRESS_LINE1]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.ADDRESS_LINE1,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.BUSINESS_CITY]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.BUSINESS_CITY,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.BUSINESS_STATE]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.BUSINESS_STATE,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.BUSINESS_ZIP_CODE]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.BUSINESS_ZIP_CODE,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.PHONE_NUMBER]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.PHONE_NUMBER,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.EMAIL]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.EMAIL,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.DATE_OF_BIRTH]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.DATE_OF_BIRTH,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.SOCIAL_SECURITY_NUMBER]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.SOCIAL_SECURITY_NUMBER,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE,
        ""
      ),

      [SBB_KYC_FIELD_NAMES.BUSINESS_ROLE]: get(
        ownerInformationForm,
        SBB_KYC_FIELD_NAMES.BUSINESS_ROLE,
        ""
      ),
      [SBB_KYC_FIELD_NAMES.METADATA]: {
        [SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS]: get(
          ownerInformationForm,
          [
            SBB_KYC_FIELD_NAMES.METADATA,
            SBB_KYC_FIELD_NAMES.HAS_BENEFICIAL_OWNERS
          ],
          undefined
        ),
        [SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS]: get(
          ownerInformationForm,
          [SBB_KYC_FIELD_NAMES.METADATA, SBB_KYC_FIELD_NAMES.BENEFICIAL_OWNERS],
          []
        ),
        [SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION]: get(
          ownerInformationForm,
          [
            SBB_KYC_FIELD_NAMES.METADATA,
            SBB_KYC_FIELD_NAMES.CONTROL_AUTHORIZATION
          ],
          undefined
        ),
        [SBB_KYC_FIELD_NAMES.FIRST_NAME]: get(
          ownerInformationForm,
          [SBB_KYC_FIELD_NAMES.METADATA, SBB_KYC_FIELD_NAMES.FIRST_NAME],
          ""
        ),
        [SBB_KYC_FIELD_NAMES.LAST_NAME]: get(
          ownerInformationForm,
          [SBB_KYC_FIELD_NAMES.METADATA, SBB_KYC_FIELD_NAMES.LAST_NAME],
          ""
        )
      },

      // Ignore unused value
      fullName: "ignore",
      hasOtherSubstantialStackHolders: "ignore",
      addressLine2: "ignore"
    }
  }, [ownerInformationForm])

  const onSubmit = (data: SbbKycFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
      state: {
        ...data
      }
    })
    finishCurrentStep()
  }

  const form = useForm<SbbKycFormValue>({
    resolver: zodResolver(sbbKycFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues
  })

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OWNER_INFORMATION)

  const { handleChangeCity, handleChangeState, city, state, STATE_DATA } =
    useSelectCities()

  const handleAutoCompleteAddress = (address: AddressType) => {
    form.setValue(SBB_KYC_FIELD_NAMES.BUSINESS_STATE, address.state, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    handleChangeState(address.state)
    handleChangeCity(address.city)
    form.setValue(SBB_KYC_FIELD_NAMES.BUSINESS_CITY, address.city, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
    // Remove space from postal code
    form.setValue(
      SBB_KYC_FIELD_NAMES.BUSINESS_ZIP_CODE,
      address.zip.replace(/ /g, ""),
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      }
    )
    form.setValue(SBB_KYC_FIELD_NAMES.ADDRESS_LINE1, address.addressLine1, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  useEffect(() => {
    if (city) {
      form.setValue(SBB_KYC_FIELD_NAMES.BUSINESS_CITY, city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue(SBB_KYC_FIELD_NAMES.BUSINESS_STATE, state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue(SBB_KYC_FIELD_NAMES.BUSINESS_CITY, "", {
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [form, state])

  return (
    <div
      className={cn(
        "col-span-8 mx-6 flex h-fit flex-col gap-2xl overflow-auto rounded-lg shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <Form {...form}>
        <div className="flex flex-col gap-2xl">
          <FormLayout title="Owner / Guarantor Information">
            <h5 className="text-lg font-semibold">
              Owner / Guarantor Information
            </h5>
            <Separator />

            <form className="grid grid-cols-12 gap-x-4xl gap-y-2xl">
              {SBB_KYC_FORM_BLOCKS.map(({ type, props, name }) => {
                if (
                  name === SBB_KYC_FIELD_NAMES.ADDRESS_LINE1 &&
                  isEnableGoogleMapInput()
                ) {
                  return (
                    <AutoCompleteGoogleMap
                      key={name}
                      defaultValues={{
                        addressLine1: defaultValues.addressLine1,
                        state:
                          defaultValues[SBB_KYC_FIELD_NAMES.BUSINESS_STATE],
                        country: "United States",
                        countryCode: "US",
                        zip: defaultValues[
                          SBB_KYC_FIELD_NAMES.BUSINESS_ZIP_CODE
                        ],
                        city: defaultValues[SBB_KYC_FIELD_NAMES.BUSINESS_CITY]
                      }}
                      onSelect={handleAutoCompleteAddress}
                    />
                  )
                }
                if (name === SBB_KYC_FIELD_NAMES.BUSINESS_CITY) {
                  return (
                    <AutoCompleteCities
                      key={name}
                      required
                      className="col-span-4"
                      control={form.control}
                      emptyText="No results found"
                      label="Business city"
                      name={SBB_KYC_FIELD_NAMES.BUSINESS_CITY}
                      options={
                        STATE_DATA.find(
                          (s) =>
                            s.name ===
                            form.getValues(SBB_KYC_FIELD_NAMES.BUSINESS_STATE)
                        )?.cities ?? []
                      }
                      value={form.getValues(SBB_KYC_FIELD_NAMES.BUSINESS_CITY)}
                      onChange={handleChangeCity}
                    />
                  )
                }
                if (name === SBB_KYC_FIELD_NAMES.BUSINESS_STATE) {
                  return (
                    <AutoCompleteStates
                      key={name}
                      required
                      className="col-span-4"
                      control={form.control}
                      emptyText="No results found"
                      label="Business state"
                      name={SBB_KYC_FIELD_NAMES.BUSINESS_STATE}
                      options={STATE_DATA}
                      value={form.getValues(SBB_KYC_FIELD_NAMES.BUSINESS_STATE)}
                      onChange={handleChangeState}
                    />
                  )
                }

                const Component = ComponentMapper[type]

                return (
                  <Component
                    key={name}
                    className="col-span-12"
                    name={name}
                    {...props}
                  />
                )
              })}
            </form>
          </FormLayout>
          <BeneficialOwnersInput />

          <ControlAuthorization step={step} onSubmit={onSubmit} />
        </div>
      </Form>
    </div>
  )
}
