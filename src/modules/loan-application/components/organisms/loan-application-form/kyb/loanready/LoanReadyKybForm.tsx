import { Card } from "@/components/ui/card"
import { revertPattern } from "@/components/ui/mask-input"
import { Separator } from "@/components/ui/separator"
import { EIN_PATTERN } from "@/constants"
import { cn } from "@/lib/utils"
import {
  RHFMaskInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { RHFProvider } from "@/modules/form-template/providers"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton.tsx"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"
import {
  BUSINESS_STAGE_OPTIONS,
  LoanReadyKYBFieldName
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import {
  loanReadyBusinessFormSchema,
  LoanReadyBusinessFormValue
} from "@/modules/loan-application/constants/form.ts"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { useSelectCities } from "@/modules/loan-application/hooks/useSelectCities"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { get } from "lodash"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export const LoanReadyBusinessInformationForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const { businessInformation, dispatchFormAction } =
    useLoanApplicationFormContext()
  const defaultValues: { [key: string]: string } = {}
  Object.keys(loanReadyBusinessFormSchema.shape).forEach((fieldName) => {
    defaultValues[fieldName] = get(businessInformation, fieldName, "")
  })
  const form = useForm<LoanReadyBusinessFormValue>({
    resolver: zodResolver(loanReadyBusinessFormSchema),
    mode: "onBlur",
    defaultValues
  })

  const onSubmit = (data: LoanReadyBusinessFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
      state: {
        ...data,
        businessTin: revertPattern(data.businessTin)
      }
    })
    finishCurrentStep()
  }

  const { handleChangeState, handleChangeCity, STATE_DATA, state, city } =
    useSelectCities()

  useEffect(() => {
    if (city) {
      form.setValue(LoanReadyKYBFieldName.CITY, city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue(LoanReadyKYBFieldName.STATE, state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue(LoanReadyKYBFieldName.CITY, "", {
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [form, state])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm w-full"
      )}
      id={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <RHFProvider
        key={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
        methods={form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-2xl gap-x-4xl">
          <RHFTextInput
            name={LoanReadyKYBFieldName.BUSINESS_LEGAL_NAME}
            label="Business legal name"
            placeholder="Business legal name"
          />

          <RHFTextInput
            name={LoanReadyKYBFieldName.DBA}
            label="Business trade name/DBA"
            placeholder="Business trade name/DBA"
          />

          <RHFTextInput
            name={LoanReadyKYBFieldName.ADDRESS_LINE1}
            label="Business street address"
            placeholder="Start typing your address"
          />
          <div className="flex gap-2 md:gap-4 flex-wrap">
            <AutoCompleteStates
              options={STATE_DATA}
              label="State"
              emptyText="No results found"
              name={LoanReadyKYBFieldName.STATE}
              control={form.control}
              onChange={handleChangeState}
              value={form.getValues(LoanReadyKYBFieldName.STATE)}
              className="flex-1"
            />
            <AutoCompleteCities
              options={
                STATE_DATA.find(
                  (s) => s.name === form.getValues(LoanReadyKYBFieldName.STATE)
                )?.cities ?? []
              }
              label="City"
              emptyText="No results found"
              name={LoanReadyKYBFieldName.CITY}
              control={form.control}
              onChange={handleChangeCity}
              value={form.getValues(LoanReadyKYBFieldName.CITY)}
              className="flex-1"
            />
            <RHFTextInput
              placeholder="i.e: 97531"
              label="Zip"
              styleProps={{ labelClassName: "whitespace-nowrap" }}
              name={LoanReadyKYBFieldName.POSTAL_CODE}
              className="flex-1"
            />
          </div>

          <RHFMaskInput
            name={LoanReadyKYBFieldName.EIN}
            label="Employer Identification Number (EIN)"
            placeholder="12-3456789"
            pattern={EIN_PATTERN}
          />

          <RHFTextInput
            name={LoanReadyKYBFieldName.BUSINESS_WEBSITE}
            label="Business website"
            placeholder="Enter website URL"
            styleProps={{
              inputClassName: "pl-[4.4rem]"
            }}
            prefixIcon={
              <div className="text-sm opacity-50 border-r h-full flex items-center pr-2">
                https://
              </div>
            }
          />

          <RHFSelectInput
            name={LoanReadyKYBFieldName.BUSINESS_STAGE}
            label="Business stage"
            options={BUSINESS_STAGE_OPTIONS}
          />

          <RHFTextInput
            name={LoanReadyKYBFieldName.BUSINESS_DESCRIPTION}
            label="Business description"
            placeholder="Business description"
          />

          {!isReviewApplicationStep(step) && (
            <FormSubmitButton
              onSubmit={form.handleSubmit(onSubmit)}
              isDisabled={!form.formState.isValid}
            />
          )}
        </div>
      </RHFProvider>
    </Card>
  )
}
