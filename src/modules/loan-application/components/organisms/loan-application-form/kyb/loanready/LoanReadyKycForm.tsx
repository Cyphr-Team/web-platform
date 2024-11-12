import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toPattern } from "@/components/ui/mask-input"
import { Separator } from "@/components/ui/separator"
import { SSN_PATTERN } from "@/constants"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"
import {
  LoanReadyKYCFieldName,
  PERSONAL_CREDIT_SCORE_OPTIONS
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import {
  type IOwnerFormValue,
  loanReadyOwnerFormSchema,
  type LoanReadyOwnerFormValue
} from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { useSelectCities } from "@/modules/loan-application/hooks/useSelectCities"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import {
  RHFCalendarPickerInput,
  RHFMaskInput,
  RHFPercentageInput,
  RHFPhoneInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"

interface OwnerInformationFormProps {
  wrapperClassName?: string
}

export function LoanReadyOwnerInformationForm({
  wrapperClassName
}: OwnerInformationFormProps) {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { dispatchFormAction, ownerInformationForm } =
    useLoanApplicationFormContext()

  const form = useForm<LoanReadyOwnerFormValue>({
    resolver: zodResolver(loanReadyOwnerFormSchema),
    mode: "onBlur",
    defaultValues: getOrDefault(ownerInformationForm)
  })

  const { handleChangeState, handleChangeCity, STATE_DATA, state, city } =
    useSelectCities()

  const onSubmit = form.handleSubmit((data) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
      state: data
    })
    finishCurrentStep()
  })

  useEffect(() => {
    if (city) {
      form.setValue("businessCity", city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue("businessCity", "", {
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue("businessState", state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [form, state])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OWNER_INFORMATION)

  return (
    <FormLayout
      cardClassName={wrapperClassName}
      id={LOAN_APPLICATION_STEPS.OWNER_INFORMATION}
      title="Owner / Guarantor Information"
    >
      <Form {...form}>
        <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
        <Separator />

        <form className="grid grid-cols-6 gap-x-4xl gap-y-2xl">
          <RHFTextInput
            className="col-span-3"
            label="Full legal name"
            name="fullName"
            placeholder="Full legal name"
          />
          <RHFTextInput
            className="col-span-3"
            label="Your role"
            name="businessRole"
            placeholder="Your role"
          />
          <RHFTextInput
            className="col-span-6"
            label="Resident address"
            name="addressLine1"
            placeholder="Start typing your address"
          />
          <AutoCompleteStates
            className="col-span-6 lg:col-span-2"
            control={form.control}
            emptyText="No results found"
            label="State"
            name="businessState"
            options={STATE_DATA}
            value={form.getValues("businessState")}
            onChange={handleChangeState}
          />
          <AutoCompleteCities
            className="col-span-6 lg:col-span-2"
            control={form.control}
            emptyText="No results found"
            label="City"
            name="businessCity"
            options={
              STATE_DATA.find((s) => s.name === form.getValues("businessState"))
                ?.cities ?? []
            }
            value={form.getValues("businessCity")}
            onChange={handleChangeCity}
          />
          <RHFTextInput
            className="col-span-6 lg:col-span-2"
            label="Zip"
            name="businessZipCode"
            placeholder="Zip"
          />
          <RHFTextInput
            className="col-span-6 lg:col-span-3"
            label="Email address"
            name="email"
            placeholder="i.e: larry@latte.com"
          />
          <RHFPhoneInput
            className="col-span-6 lg:col-span-3"
            label="Phone number"
            name="phoneNumber"
            placeholder="Enter phone number"
          />
          <RHFCalendarPickerInput
            className="col-span-6 lg:col-span-3"
            label="Date of birth"
            name="dateOfBirth"
            placeholder="i.e: 01-01-1991"
            styleProps={{ calendarClassName: "" }}
          />
          <RHFMaskInput
            className="col-span-6 lg:col-span-3"
            label="SSN / ITIN"
            name="socialSecurityNumber"
            pattern={SSN_PATTERN}
            placeholder="12-3456789"
          />
          <RHFPercentageInput
            className="col-span-6 lg:col-span-3"
            label="What percent of the business do you own?"
            name="businessOwnershipPercentage"
            placeholder="Your ownership percentage"
            styleProps={{
              labelClassName: "whitespace-nowrap",
              subtitleClassName: "text-xs text-text-tertiary font-normal",
              suffixClassName:
                "font-medium text-sm text-text-tertiary border-l h-full flex items-center px-3"
            }}
            subtitle="Please enter a number between 0 - 100"
          />
          <RHFSelectInput
            className="col-span-6 lg:col-span-3"
            label="Personal credit score"
            name={LoanReadyKYCFieldName.PERSONAL_CREDIT_SCORE}
            options={PERSONAL_CREDIT_SCORE_OPTIONS}
            selectContentProps={{
              side: "top"
            }}
          />
          <div />
        </form>

        {!isReviewApplicationStep(step) && (
          <Button disabled={!form.formState.isValid} onClick={onSubmit}>
            Next
          </Button>
        )}
      </Form>
    </FormLayout>
  )
}

function getOrDefault(
  ownerInformationForm: IOwnerFormValue
): LoanReadyOwnerFormValue {
  return {
    id: ownerInformationForm?.id ?? "",
    fullName: ownerInformationForm?.fullName ?? "",
    businessRole: ownerInformationForm?.businessRole ?? "",
    addressLine1: ownerInformationForm?.addressLine1 ?? "",
    addressLine2: ownerInformationForm?.addressLine2 ?? "",
    businessState: ownerInformationForm?.businessState ?? "",
    businessCity: ownerInformationForm?.businessCity ?? "",
    phoneNumber: ownerInformationForm?.phoneNumber ?? "",
    email: ownerInformationForm?.email ?? "",
    dateOfBirth: ownerInformationForm?.dateOfBirth ?? "",
    socialSecurityNumber: ownerInformationForm?.socialSecurityNumber
      ? toPattern(ownerInformationForm?.socialSecurityNumber, SSN_PATTERN)
      : "",
    businessOwnershipPercentage:
      ownerInformationForm?.businessOwnershipPercentage ?? "",
    hasOtherSubstantialStackHolders:
      ownerInformationForm?.hasOtherSubstantialStackHolders.toString() ??
      "false",
    businessZipCode: ownerInformationForm?.businessZipCode ?? "",
    governmentFile: ownerInformationForm?.governmentFile ?? [],
    [LoanReadyKYCFieldName.PERSONAL_CREDIT_SCORE]:
      ownerInformationForm?.[LoanReadyKYCFieldName.PERSONAL_CREDIT_SCORE]
  }
}
