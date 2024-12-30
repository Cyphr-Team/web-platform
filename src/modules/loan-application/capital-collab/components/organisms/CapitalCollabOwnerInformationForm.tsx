import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toPattern } from "@/components/ui/mask-input"
import { Separator } from "@/components/ui/separator"
import { SSN_PATTERN } from "@/constants"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"

import {
  BINARY_VALUES,
  YES_NO_OPTIONS,
  type IOwnerFormValue
} from "@/modules/loan-application/constants/form"
import {
  capitalCollabOwnerFormSchema,
  type CapitalCollabOwnerFormValue
} from "@/modules/loan-application/constants/form.kyc"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { useSelectCities } from "@/modules/loan-application/hooks/utils/useSelectCities"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import {
  RHFCalendarPickerInput,
  RHFCurrencyInput,
  RHFMaskInput,
  RHFPercentageInput,
  RHFPhoneInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"

import { RHFProvider } from "@/modules/form-template/providers"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"
import {
  CapitalCollabKYCFieldName,
  EMPTY_ADDITIONAL_OWNER_ITEM,
  PERSONAL_CREDIT_SCORE_OPTIONS
} from "@/modules/loan-application/capital-collab/constants/kyc"
import AdditionalOwnerArrayForm from "@/modules/loan-application/capital-collab/components/organisms/AdditionalOwnerArrayForm"

export function CapitalCollabOwnerInformationForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { dispatchFormAction, ownerInformationForm } =
    useLoanApplicationFormContext()

  const form = useForm<CapitalCollabOwnerFormValue>({
    resolver: zodResolver(capitalCollabOwnerFormSchema),
    mode: "onBlur",
    defaultValues: getOrDefault(ownerInformationForm)
  })

  const { handleChangeState, handleChangeCity, STATE_DATA } = useSelectCities()

  const onSubmit = form.handleSubmit((data) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
      state: data
    })
    finishCurrentStep()
  })

  const handleChangeStateAndResetCity = (value: string) => {
    handleChangeState(value)
    form.setValue("businessCity", "")
  }

  const onAutoSave = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
      state: form.getValues()
    })
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OWNER_INFORMATION)

  const isHaveAdditionalOwner =
    form.watch(CapitalCollabKYCFieldName.IS_BUSINESS_SOLELY_OWNED) ===
    BINARY_VALUES.NO

  return (
    <FormLayout
      id={LOAN_APPLICATION_STEPS.OWNER_INFORMATION}
      title="Individual Information"
    >
      <h5 className="text-lg font-semibold">Individual Information</h5>
      <Separator />
      <RHFProvider methods={form} onSubmit={onSubmit}>
        <div
          className={cn(
            "col-span-8 flex h-fit flex-col gap-6 overflow-auto rounded-lg text-sm shadow-none"
          )}
        >
          <FormLayout hideTopNavigation>
            <h5 className="text-lg font-semibold">
              Owner / Guarantor Information
            </h5>
            <Separator />

            <div className="grid grid-cols-6 gap-x-4xl gap-y-2xl">
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
                onChange={handleChangeStateAndResetCity}
              />
              <AutoCompleteCities
                className="col-span-6 lg:col-span-2"
                control={form.control}
                emptyText="No results found"
                label="City"
                name="businessCity"
                options={
                  STATE_DATA.find(
                    (s) => s.name === form.getValues("businessState")
                  )?.cities ?? []
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
                name={CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE}
                options={PERSONAL_CREDIT_SCORE_OPTIONS}
                selectContentProps={{
                  side: "top"
                }}
              />
              <RHFCurrencyInput
                className="col-span-6"
                label="Annual income"
                name={CapitalCollabKYCFieldName.ANNUAL_INCOME}
                placeholder=""
                prefixIcon="$"
                styleProps={{ inputClassName: "pl-7.5" }}
              />
              <div />
            </div>
          </FormLayout>

          <FormLayout hideTopNavigation>
            <Form {...form}>
              <h5 className="text-lg font-semibold">Additional Owners</h5>
              <h5 className="financial-projection mt-2 text-sm font-normal text-muted-foreground">
                Add details about the ownership structure of your business. If
                you are not the sole owner, provide information on other owners,
                including their ownership percentage and roles.
              </h5>
              <Separator />

              <div className="grid grid-cols-6 gap-x-4xl gap-y-2xl">
                <RHFSelectInput
                  isRowDirection
                  className="col-span-6"
                  label="Is your business solely owned by you?"
                  name={CapitalCollabKYCFieldName.IS_BUSINESS_SOLELY_OWNED}
                  options={YES_NO_OPTIONS}
                  selectContentProps={{
                    side: "top"
                  }}
                  styleProps={{
                    labelClassName: "w-full"
                  }}
                />
                {isHaveAdditionalOwner ? (
                  <div className="grid grid-col-6 gap-6 col-span-6">
                    <AdditionalOwnerArrayForm
                      allowEmpty
                      addIcon={<Plus />}
                      dataName="Additional owner"
                      defaultEmptyObject={EMPTY_ADDITIONAL_OWNER_ITEM}
                      fieldName={CapitalCollabKYCFieldName.ADDITIONAL_OWNERS}
                      onBlur={onAutoSave}
                    />
                  </div>
                ) : null}
              </div>

              {!isReviewApplicationStep(step) && (
                <Button disabled={!form.formState.isValid} onClick={onSubmit}>
                  Next
                </Button>
              )}
            </Form>
          </FormLayout>
        </div>
      </RHFProvider>
    </FormLayout>
  )
}

function getOrDefault(
  ownerInformationForm: IOwnerFormValue
): CapitalCollabOwnerFormValue {
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
    businessZipCode: ownerInformationForm?.businessZipCode ?? "",
    governmentFile: ownerInformationForm?.governmentFile ?? [],
    [CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE]:
      ownerInformationForm?.[CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE],
    [CapitalCollabKYCFieldName.ANNUAL_INCOME]:
      ownerInformationForm?.[CapitalCollabKYCFieldName.ANNUAL_INCOME],
    [CapitalCollabKYCFieldName.IS_BUSINESS_SOLELY_OWNED]:
      ownerInformationForm?.[
        CapitalCollabKYCFieldName.IS_BUSINESS_SOLELY_OWNED
      ],
    [CapitalCollabKYCFieldName.ADDITIONAL_OWNERS]:
      ownerInformationForm?.additionalOwners ?? [EMPTY_ADDITIONAL_OWNER_ITEM]
  }
}
