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
  type IBusinessFormValue,
  loanReadyBusinessFormSchema,
  type LoanReadyBusinessFormValue
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

function getOrDefault(
  businessInformation: IBusinessFormValue
): LoanReadyBusinessFormValue {
  const defaultValues: Record<string, string> = {}

  Object.keys(loanReadyBusinessFormSchema.shape).forEach((fieldName) => {
    defaultValues[fieldName] = get(businessInformation, fieldName, "")
  })

  return defaultValues as LoanReadyBusinessFormValue
}

export function LoanReadyBusinessInformationForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { businessInformation, dispatchFormAction } =
    useLoanApplicationFormContext()

  const form = useForm<LoanReadyBusinessFormValue>({
    resolver: zodResolver(loanReadyBusinessFormSchema),
    mode: "onBlur",
    defaultValues: getOrDefault(businessInformation)
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
            label="Business legal name"
            name={LoanReadyKYBFieldName.BUSINESS_LEGAL_NAME}
            placeholder="Business legal name"
          />

          <RHFTextInput
            label="Business trade name/DBA"
            name={LoanReadyKYBFieldName.DBA}
            placeholder="Business trade name/DBA"
          />

          <RHFTextInput
            label="Business street address"
            name={LoanReadyKYBFieldName.ADDRESS_LINE1}
            placeholder="Start typing your address"
          />
          <div className="flex gap-2 md:gap-4 flex-wrap">
            <AutoCompleteStates
              className="flex-1"
              control={form.control}
              emptyText="No results found"
              label="State"
              name={LoanReadyKYBFieldName.STATE}
              options={STATE_DATA}
              value={form.getValues(LoanReadyKYBFieldName.STATE)}
              onChange={handleChangeState}
            />
            <AutoCompleteCities
              className="flex-1"
              control={form.control}
              emptyText="No results found"
              label="City"
              name={LoanReadyKYBFieldName.CITY}
              options={
                STATE_DATA.find(
                  (s) => s.name === form.getValues(LoanReadyKYBFieldName.STATE)
                )?.cities ?? []
              }
              value={form.getValues(LoanReadyKYBFieldName.CITY)}
              onChange={handleChangeCity}
            />
            <RHFTextInput
              className="flex-1"
              label="Zip"
              name={LoanReadyKYBFieldName.POSTAL_CODE}
              placeholder="i.e: 97531"
              styleProps={{ labelClassName: "whitespace-nowrap" }}
            />
          </div>

          <RHFMaskInput
            label="Employer Identification Number (EIN)"
            name={LoanReadyKYBFieldName.EIN}
            pattern={EIN_PATTERN}
            placeholder="12-3456789"
          />

          <RHFTextInput
            label="Business website"
            name={LoanReadyKYBFieldName.BUSINESS_WEBSITE}
            placeholder="Enter website URL"
            prefixIcon={
              <div className="text-sm opacity-50 border-r h-full flex items-center pr-2">
                https://
              </div>
            }
            styleProps={{
              inputClassName: "pl-[4.4rem]"
            }}
          />

          <RHFSelectInput
            label="Business stage"
            name={LoanReadyKYBFieldName.BUSINESS_STAGE}
            options={BUSINESS_STAGE_OPTIONS}
          />

          <RHFTextInput
            label="Business description"
            name={LoanReadyKYBFieldName.BUSINESS_DESCRIPTION}
            placeholder="Business description"
          />

          {!isReviewApplicationStep(step) && (
            <FormSubmitButton
              isDisabled={!form.formState.isValid}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          )}
        </div>
      </RHFProvider>
    </Card>
  )
}
