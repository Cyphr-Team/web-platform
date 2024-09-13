import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
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
  SbbKycFormValue
} from "./const"
import { BeneficialOwnersInput } from "./BeneficialOwners"
import { ControlAuthorization } from "./ControlAuthorization"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { useSelectCities } from "@/modules/loan-application/hooks/useSelectCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"

export const SbbKycForm = () => {
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
    defaultValues
  })

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OWNER_INFORMATION)

  const { handleChangeCity, handleChangeState, city, state, STATE_DATA } =
    useSelectCities()

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
    <div className="col-span-8 md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm">
      <Form {...form}>
        <div className="flex flex-col gap-2xl">
          <Card
            className={cn(
              "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 shadow-none w-full"
            )}
            id={LOAN_APPLICATION_STEPS.OWNER_INFORMATION}
          >
            <h5 className="text-lg font-semibold">
              Owner / Guarantor Information
            </h5>
            <Separator />

            <form className="grid grid-cols-12 gap-y-2xl gap-x-4xl">
              {SBB_KYC_FORM_BLOCKS.map(({ type, props, name }) => {
                if (name === SBB_KYC_FIELD_NAMES.BUSINESS_CITY) {
                  return (
                    <AutoCompleteCities
                      key={name}
                      options={
                        STATE_DATA.find(
                          (s) =>
                            s.name ===
                            form.getValues(SBB_KYC_FIELD_NAMES.BUSINESS_STATE)
                        )?.cities ?? []
                      }
                      label="Business city"
                      emptyText="No results found"
                      name={SBB_KYC_FIELD_NAMES.BUSINESS_CITY}
                      control={form.control}
                      onChange={handleChangeCity}
                      value={form.getValues(SBB_KYC_FIELD_NAMES.BUSINESS_CITY)}
                      className="col-span-4"
                      required
                    />
                  )
                }
                if (name === SBB_KYC_FIELD_NAMES.BUSINESS_STATE) {
                  return (
                    <AutoCompleteStates
                      key={name}
                      options={STATE_DATA}
                      label="Business state"
                      emptyText="No results found"
                      name={SBB_KYC_FIELD_NAMES.BUSINESS_STATE}
                      control={form.control}
                      onChange={handleChangeState}
                      value={form.getValues(SBB_KYC_FIELD_NAMES.BUSINESS_STATE)}
                      className="col-span-4"
                      required
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
          </Card>
          <BeneficialOwnersInput />

          <ControlAuthorization step={step} onSubmit={onSubmit} />
        </div>
      </Form>
    </div>
  )
}
