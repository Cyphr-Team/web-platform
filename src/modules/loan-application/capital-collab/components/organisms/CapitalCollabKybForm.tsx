import { revertPattern } from "@/components/ui/mask-input"
import { Separator } from "@/components/ui/separator"
import {
  RHFCalendarPickerInput,
  RHFCurrencyInput,
  RHFMaskInput,
  RHFPhoneInput,
  RHFSelectInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton.tsx"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates"
import {
  BUSINESS_STAGE_OPTIONS,
  CapitalCollabKYBFieldName,
  PROPERTY_OPTIONS
} from "@/modules/loan-application/capital-collab/constants/kyb"
import {
  BINARY_VALUES,
  type IBusinessFormValue,
  YES_NO_OPTIONS
} from "@/modules/loan-application/constants/form"
import {
  capitalCollabBusinessFormSchema,
  type CapitalCollabBusinessFormValue
} from "@/modules/loan-application/constants/form.kyb"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { useSelectCities } from "@/modules/loan-application/hooks/utils/useSelectCities"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { useEffect } from "react"
import { EIN_PATTERN } from "@/constants"
import { RHFProvider } from "@/modules/form-template/providers"

export function CapitalCollabBusinessInformationForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { businessInformation, dispatchFormAction } =
    useLoanApplicationFormContext()

  const form = useForm<CapitalCollabBusinessFormValue>({
    resolver: zodResolver(capitalCollabBusinessFormSchema),
    mode: "onBlur",
    defaultValues: getOrDefault(businessInformation)
  })

  const onSubmit = (data: CapitalCollabBusinessFormValue) => {
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
      form.setValue(CapitalCollabKYBFieldName.CITY, city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue(CapitalCollabKYBFieldName.CITY, "", {
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue(CapitalCollabKYBFieldName.STATE, state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [form, state])

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        state: {
          ...data,
          businessTin: revertPattern(data.businessTin)
        }
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)

  return (
    <FormLayout
      id={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
      title="Business Information"
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <RHFProvider
        key={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
        methods={form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-x-4xl gap-y-2xl">
          <RHFTextInput
            label="Business legal name"
            name={CapitalCollabKYBFieldName.BUSINESS_LEGAL_NAME}
            placeholder="Business legal name"
          />

          <RHFTextInput
            label="Business trade name/DBA"
            name={CapitalCollabKYBFieldName.DBA}
            placeholder="Business trade name/DBA"
          />

          <RHFTextInput
            label="Business street address"
            name={CapitalCollabKYBFieldName.ADDRESS_LINE1}
            placeholder="Start typing your address"
          />
          <div className="flex flex-wrap gap-2 md:gap-4">
            <AutoCompleteStates
              className="flex-1"
              control={form.control}
              emptyText="No results found"
              label="State"
              name={CapitalCollabKYBFieldName.STATE}
              options={STATE_DATA}
              value={form.getValues(CapitalCollabKYBFieldName.STATE)}
              onChange={handleChangeState}
            />
            <AutoCompleteCities
              className="flex-1"
              control={form.control}
              emptyText="No results found"
              label="City"
              name={CapitalCollabKYBFieldName.CITY}
              options={
                STATE_DATA.find(
                  (s) =>
                    s.name === form.getValues(CapitalCollabKYBFieldName.STATE)
                )?.cities ?? []
              }
              value={form.getValues(CapitalCollabKYBFieldName.CITY)}
              onChange={handleChangeCity}
            />

            <RHFTextInput
              className="flex-1"
              label="Zip"
              name={CapitalCollabKYBFieldName.POSTAL_CODE}
              placeholder="i.e: 97531"
              styleProps={{ labelClassName: "whitespace-nowrap" }}
            />
          </div>

          <RHFMaskInput
            label="Employer Identification Number (EIN)"
            name={CapitalCollabKYBFieldName.EIN}
            pattern={EIN_PATTERN}
            placeholder="12-3456789"
          />

          <div className="grid grid-cols-12 gap-y-4 lg:gap-x-4">
            <RHFCalendarPickerInput
              className="col-span-12 lg:col-span-6"
              label="Business inception date"
              name={CapitalCollabKYBFieldName.BUSINESS_INCEPTION_DATE}
              placeholder="i.e: 01-01-1991"
              styleProps={{ calendarClassName: "" }}
            />

            <RHFSelectInput
              className="col-span-12 lg:col-span-6"
              label="Does your business have more than 1 bank account ?"
              name={
                CapitalCollabKYBFieldName.BUSINESS_MORE_THAN_ONE_BANK_ACCOUNT
              }
              options={YES_NO_OPTIONS}
            />
          </div>

          <RHFTextInput
            label="Business website"
            name={CapitalCollabKYBFieldName.BUSINESS_WEBSITE}
            placeholder=" Enter website URL"
            prefixIcon={
              <div className="flex h-full items-center border-r pr-2 text-sm">
                https://
              </div>
            }
            styleProps={{
              inputClassName: "pl-20"
            }}
          />

          <RHFSelectInput
            label="Business stage"
            name={CapitalCollabKYBFieldName.BUSINESS_STAGE}
            options={BUSINESS_STAGE_OPTIONS}
          />

          <RHFTextInput
            label="Business description"
            name={CapitalCollabKYBFieldName.BUSINESS_DESCRIPTION}
            placeholder="Business description"
          />

          <div className="grid grid-cols-12 gap-y-4 lg:gap-x-4">
            <RHFSelectInput
              className="col-span-12 lg:col-span-6"
              label="Lease or own your business property"
              name={CapitalCollabKYBFieldName.PROPERTY_LEASE_OR_OWN}
              options={PROPERTY_OPTIONS}
            />

            <RHFCurrencyInput
              className="col-span-12 lg:col-span-6 flex flex-col justify-end gap-1"
              label="Business property payment (monthly)"
              name={CapitalCollabKYBFieldName.PROPERTY_PAYMENT}
              prefixIcon="$"
              styleProps={{ inputClassName: "pl-7.5" }}
            />
          </div>

          <div className="grid grid-cols-12 gap-y-4 lg:gap-x-4">
            <RHFTextInput
              className="col-span-12 lg:col-span-6"
              label="Landlord name"
              name={CapitalCollabKYBFieldName.LANDLORD_NAME}
              placeholder="Landlord name"
            />

            <RHFPhoneInput
              className="col-span-12 lg:col-span-6"
              label="Landlord phone number"
              name={CapitalCollabKYBFieldName.LANDLORD_PHONE}
              placeholder="i.e 999-999-9999"
            />
          </div>

          <div className="grid grid-cols-12 gap-y-4 lg:gap-x-4">
            <RHFSelectInput
              className="col-span-12 lg:col-span-8"
              label="Open loan/advance balance with daily or weekly payments?"
              name={CapitalCollabKYBFieldName.BALANCE_DAILY_OR_WEEKLY}
              options={YES_NO_OPTIONS}
            />

            <RHFCurrencyInput
              className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-1"
              label="Total balance owed"
              name={CapitalCollabKYBFieldName.BALANCE_TOTAL}
              prefixIcon="$"
              styleProps={{ inputClassName: "pl-7.5" }}
            />
          </div>

          <div className="grid grid-cols-12 gap-y-4 lg:gap-x-4">
            <RHFSelectInput
              className="col-span-12 lg:col-span-6"
              label="Business accepted credit cards for 3+ months?"
              name={CapitalCollabKYBFieldName.CREDIT_CARD_THREE_MONTHS}
              options={YES_NO_OPTIONS}
            />

            {form.watch(CapitalCollabKYBFieldName.CREDIT_CARD_THREE_MONTHS) ===
              BINARY_VALUES.YES && (
              <RHFCurrencyInput
                className="col-span-12 lg:col-span-6 flex flex-col justify-end gap-1"
                label="Average credit card processing volume"
                name={CapitalCollabKYBFieldName.CREDIT_CARD_AVERAGE_VOLUME}
                placeholder="Avg. credit card processing volume"
                prefixIcon="$"
                styleProps={{ inputClassName: "pl-7.5" }}
                suffixIcon={<span className="text-text-placeholder">/ mo</span>}
              />
            )}
          </div>

          {form.watch(CapitalCollabKYBFieldName.CREDIT_CARD_THREE_MONTHS) ===
            BINARY_VALUES.YES && (
            <RHFTextInput
              label="Credit card processor"
              name={CapitalCollabKYBFieldName.CREDIT_CARD_PROCESSOR}
              placeholder="Credit card processor"
            />
          )}

          {!isReviewApplicationStep(step) && (
            <FormSubmitButton
              isDisabled={!form.formState.isValid}
              onSubmit={form.handleSubmit(onSubmit)}
            />
          )}
        </div>
      </RHFProvider>
    </FormLayout>
  )
}

function getOrDefault(
  businessInformation: IBusinessFormValue
): CapitalCollabBusinessFormValue {
  return {
    id: businessInformation?.id ?? "",
    [CapitalCollabKYBFieldName.BUSINESS_LEGAL_NAME]:
      businessInformation?.businessLegalName ?? "",
    [CapitalCollabKYBFieldName.DBA]: businessInformation?.dba ?? "",
    [CapitalCollabKYBFieldName.ADDRESS_LINE1]:
      businessInformation?.addressLine1 ?? "",
    [CapitalCollabKYBFieldName.STATE]: businessInformation?.state ?? "",
    [CapitalCollabKYBFieldName.CITY]: businessInformation?.city ?? "",
    [CapitalCollabKYBFieldName.POSTAL_CODE]:
      businessInformation?.postalCode ?? "",
    [CapitalCollabKYBFieldName.EIN]: businessInformation?.businessTin ?? "",
    [CapitalCollabKYBFieldName.BUSINESS_INCEPTION_DATE]:
      businessInformation?.businessInceptionDate ?? "",
    [CapitalCollabKYBFieldName.BUSINESS_MORE_THAN_ONE_BANK_ACCOUNT]:
      businessInformation?.businessMoreThanOneBankAccount ?? "",
    [CapitalCollabKYBFieldName.BUSINESS_WEBSITE]:
      businessInformation?.businessWebsite ?? "",
    [CapitalCollabKYBFieldName.BUSINESS_STAGE]:
      businessInformation?.businessStage ?? "",
    [CapitalCollabKYBFieldName.BUSINESS_DESCRIPTION]:
      businessInformation?.businessDescription ?? "",
    [CapitalCollabKYBFieldName.PROPERTY_LEASE_OR_OWN]:
      businessInformation?.propertyLeaseOrOwn ?? "",
    [CapitalCollabKYBFieldName.PROPERTY_PAYMENT]:
      businessInformation?.propertyPayment ?? "",
    [CapitalCollabKYBFieldName.LANDLORD_NAME]:
      businessInformation?.landlordName ?? "",
    [CapitalCollabKYBFieldName.LANDLORD_PHONE]:
      businessInformation?.landlordPhone ?? "",
    [CapitalCollabKYBFieldName.BALANCE_DAILY_OR_WEEKLY]:
      businessInformation?.balanceDailyOrWeekly ?? "",
    [CapitalCollabKYBFieldName.BALANCE_TOTAL]:
      businessInformation?.balanceTotal ?? "",
    [CapitalCollabKYBFieldName.CREDIT_CARD_THREE_MONTHS]:
      businessInformation?.creditCardThreeMonths ?? "",
    [CapitalCollabKYBFieldName.CREDIT_CARD_AVERAGE_VOLUME]:
      businessInformation?.creditCardAverageVolume ?? 0,
    [CapitalCollabKYBFieldName.CREDIT_CARD_PROCESSOR]:
      businessInformation?.creditCardProcessor ?? ""
  }
}
