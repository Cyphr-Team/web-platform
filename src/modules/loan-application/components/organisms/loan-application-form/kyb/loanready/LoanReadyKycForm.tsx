import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { toPattern } from "@/components/ui/mask-input"
import { Separator } from "@/components/ui/separator"
import { SSN_PATTERN } from "@/constants"
import { cn } from "@/lib/utils"
import {
  RHFCalendarPickerInput,
  RHFMaskInput,
  RHFPercentageInput,
  RHFPhoneInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"
import {
  LoanReadyKYCFieldName,
  PERSONAL_CREDIT_SCORE_OPTIONS
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import {
  loanReadyOwnerFormSchema,
  LoanReadyOwnerFormValue
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
import { ArrowRight } from "lucide-react"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"

interface OwnerInformationFormProps {
  wrapperClassName?: string
}
export function LoanReadyOwnerInformationForm({
  wrapperClassName
}: OwnerInformationFormProps) {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { dispatchFormAction, ownerInformationForm } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () => ({
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
    }),
    [ownerInformationForm]
  )

  const form = useForm<LoanReadyOwnerFormValue>({
    resolver: zodResolver(loanReadyOwnerFormSchema),
    values: defaultValues,
    mode: "onBlur"
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
      form.setValue("businessState", state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue("businessCity", "", {
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [form, state])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OWNER_INFORMATION)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm",
        wrapperClassName
      )}
      id={LOAN_APPLICATION_STEPS.OWNER_INFORMATION}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit shadow-none">
            <h5 className="text-lg font-semibold">
              Owner / Guarantor Information
            </h5>
            <Separator />

            <form className="grid grid-cols-6 gap-y-2xl gap-x-4xl">
              <RHFTextInput
                name="fullName"
                label="Full legal name"
                placeholder="Full legal name"
                className="col-span-3"
              />
              <RHFTextInput
                name="businessRole"
                label="Your Role"
                placeholder="Your role"
                className="col-span-3"
              />
              <RHFTextInput
                placeholder="Start typing your address"
                label="Resident address"
                name="addressLine1"
                className="col-span-6"
              />
              <AutoCompleteStates
                options={STATE_DATA}
                label="State"
                emptyText="No results found"
                name="businessState"
                control={form.control}
                onChange={handleChangeState}
                value={form.getValues("businessState")}
                className="col-span-6 lg:col-span-2"
              />
              <AutoCompleteCities
                options={
                  STATE_DATA.find(
                    (s) => s.name === form.getValues("businessState")
                  )?.cities ?? []
                }
                label="City"
                emptyText="No results found"
                name="businessCity"
                control={form.control}
                onChange={handleChangeCity}
                value={form.getValues("businessCity")}
                className="col-span-6 lg:col-span-2"
              />
              <RHFTextInput
                placeholder="Zip"
                label="Zip"
                name="businessZipCode"
                className="col-span-6 lg:col-span-2"
              />
              <RHFTextInput
                name="email"
                label="Email address"
                placeholder="i.e: larry@latte.com"
                className="col-span-6 lg:col-span-3"
              />
              <RHFPhoneInput
                className="col-span-6 lg:col-span-3"
                label="Phone number"
                name="phoneNumber"
                placeholder="Enter phone number"
              />
              <RHFCalendarPickerInput
                name="dateOfBirth"
                label="Date of birth"
                className="col-span-6 lg:col-span-3"
                styleProps={{ calendarClassName: "" }}
                placeholder="i.e: 01-01-1991"
              />
              <RHFMaskInput
                name="socialSecurityNumber"
                label="SSN / ITIN"
                className="col-span-6 lg:col-span-3"
                pattern={SSN_PATTERN}
                placeholder="12-3456789"
              />
              <RHFPercentageInput
                className="col-span-6 lg:col-span-3"
                styleProps={{
                  labelClassName: "whitespace-nowrap",
                  subtitleClassName: "text-xs text-text-tertiary font-normal",
                  suffixClassName:
                    "font-medium text-sm text-text-tertiary border-l h-full flex items-center px-3"
                }}
                label="What percent of the business do you own?"
                name="businessOwnershipPercentage"
                subtitle="Please enter a number between 0 - 100"
              />
              <RHFSelectInput
                name={LoanReadyKYCFieldName.PERSONAL_CREDIT_SCORE}
                label="Personal credit score"
                options={PERSONAL_CREDIT_SCORE_OPTIONS}
                className="col-span-6 lg:col-span-3"
              />
              <div />
            </form>

            {!isReviewApplicationStep(step) && (
              <Button disabled={!form.formState.isValid} onClick={onSubmit}>
                Next <ArrowRight className="ml-1 w-4" />
              </Button>
            )}
          </Card>
        </Form>
      </div>
    </div>
  )
}
