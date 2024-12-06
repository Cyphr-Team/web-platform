import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MaskInput } from "@/components/ui/mask-input"
import { CountrySelect, CustomPhoneInput } from "@/components/ui/phone-input"
import { Separator } from "@/components/ui/separator"
import { SSN_PATTERN } from "@/constants"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import PhoneInput from "react-phone-number-input"

import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates.tsx"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities.tsx"
import { SelectInput } from "@/shared/organisms/form/SelectInput.tsx"
import { OptionInput } from "@/shared/organisms/form/OptionInput.tsx"
import {
  BUSINESS_ROLE_OPTIONS,
  getKycOptionsByField,
  LAUNCH_KC_KYC_FIELD_NAMES,
  YES_NO_OPTIONS
} from "./const"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import {
  launchKCOwnerFormSchema,
  type LaunchKCOwnerFormValue
} from "@/modules/loan-application/constants/form.kyc.ts"
import { type IOwnerFormValue } from "@/modules/loan-application/constants/form.ts"
import { useSelectCities } from "@/modules/loan-application/hooks/utils/useSelectCities.ts"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"

export function LaunchKCOwnerInformationForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { dispatchFormAction, ownerInformationForm } =
    useLoanApplicationFormContext()

  const form = useForm<LaunchKCOwnerFormValue>({
    resolver: zodResolver(launchKCOwnerFormSchema),
    mode: "onBlur",
    defaultValues: getOrDefault(ownerInformationForm)
  })

  const handleSelectDate = (date: Date | undefined) => {
    form.setValue(
      LAUNCH_KC_KYC_FIELD_NAMES.DATE_OF_BIRTH,
      date?.toISOString() ?? "",
      {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      }
    )
  }

  const { handleChangeState, handleChangeCity, STATE_DATA, state, city } =
    useSelectCities()

  const onSubmit = (data: LaunchKCOwnerFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
      state: data
    })
    finishCurrentStep()
  }

  useEffect(() => {
    if (city) {
      form.setValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_CITY, city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_STATE, state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_CITY, "", {
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
        key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        state: {
          ...data,
          fullName: `${data.firstName} ${data.lastName}`
        }
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OWNER_INFORMATION)

  return (
    <FormLayout
      id={LOAN_APPLICATION_STEPS.OWNER_INFORMATION}
      title="Owner / Guarantor Information"
    >
      <Form {...form}>
        <h5 className="text-lg font-semibold">Owner / Guarantor Information</h5>
        <Separator />

        <form className="grid grid-cols-12 gap-x-4xl gap-y-2xl">
          <TextInput
            required
            className="col-span-4"
            control={form.control}
            label="First name"
            name={LAUNCH_KC_KYC_FIELD_NAMES.FIRST_NAME}
            placeholder="i.e: Larry"
          />
          <TextInput
            required
            className="col-span-4"
            control={form.control}
            label="Last name"
            name={LAUNCH_KC_KYC_FIELD_NAMES.LAST_NAME}
            placeholder="i.e: Latte"
          />
          <SelectInput
            required
            className="col-span-4"
            control={form.control}
            inputClassName="xl:ml-0 xl:max-w-80"
            label="Title"
            name={LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_ROLE}
            options={BUSINESS_ROLE_OPTIONS}
            placeholder="Please Select"
          />
          <OptionInput
            hasOtherOption
            required
            className="col-span-12"
            control={form.control}
            label="Which best describes your gender identity?"
            name={LAUNCH_KC_KYC_FIELD_NAMES.GENDER_IDENTITY}
            options={getKycOptionsByField(
              LAUNCH_KC_KYC_FIELD_NAMES.GENDER_IDENTITY
            )}
            otherText="Prefer to self-describe"
          />
          <OptionInput
            hasOtherOption
            required
            className="col-span-12"
            control={form.control}
            label="Which best describes your preferred pronoun?"
            name={LAUNCH_KC_KYC_FIELD_NAMES.PREFERRED_PRONOUN}
            options={getKycOptionsByField(
              LAUNCH_KC_KYC_FIELD_NAMES.PREFERRED_PRONOUN
            )}
          />
          <SelectInput
            required
            className="col-span-6"
            control={form.control}
            inputClassName="xl:ml-0 xl:max-w-80"
            label="Racial identification"
            name={LAUNCH_KC_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION}
            options={getKycOptionsByField(
              LAUNCH_KC_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION
            )}
            placeholder="Please Select"
          />
          <SelectInput
            required
            className="col-span-6"
            control={form.control}
            inputClassName="xl:ml-0 xl:max-w-80"
            label="Ethnic identification"
            name={LAUNCH_KC_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION}
            options={getKycOptionsByField(
              LAUNCH_KC_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION
            )}
            placeholder="Please Select"
          />
          <TextInput
            required
            className="col-span-12"
            control={form.control}
            label="Resident address line #1"
            name={LAUNCH_KC_KYC_FIELD_NAMES.ADDRESS_LINE1}
            placeholder="i.e: 456 Bean Ave."
          />
          <TextInput
            className="col-span-12"
            control={form.control}
            label="Resident address line #2 (optional)"
            name={LAUNCH_KC_KYC_FIELD_NAMES.ADDRESS_LINE2}
            placeholder="i.e: Suite 789"
          />
          <AutoCompleteStates
            required
            className="col-span-12 lg:col-span-4"
            control={form.control}
            emptyText="No results found"
            label="State"
            name={LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_STATE}
            options={STATE_DATA}
            value={form.getValues("businessState")}
            onChange={handleChangeState}
          />
          <AutoCompleteCities
            required
            className="col-span-12 lg:col-span-4"
            control={form.control}
            emptyText="No results found"
            label="City"
            name={LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_CITY}
            options={
              STATE_DATA.find((s) => s.name === form.getValues("businessState"))
                ?.cities ?? []
            }
            value={form.getValues(LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_CITY)}
            onChange={handleChangeCity}
          />
          <TextInput
            required
            className="col-span-12 lg:col-span-4"
            control={form.control}
            label="Zip code"
            name={LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_ZIP_CODE}
            placeholder="i.e: 98765"
          />
          <TextInput
            required
            className="col-span-12 lg:col-span-6"
            control={form.control}
            label="Email address"
            name={LAUNCH_KC_KYC_FIELD_NAMES.EMAIL}
            placeholder="i.e: larry@latte.com"
            prefixIcon={<Mail className="size-5 text-muted-foreground" />}
          />
          <FormField
            name={LAUNCH_KC_KYC_FIELD_NAMES.PHONE_NUMBER}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel className="text-text-secondary">
                  Phone number
                  <RequiredSymbol />
                </FormLabel>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  countrySelectComponent={CountrySelect}
                  defaultCountry="US"
                  inputComponent={CustomPhoneInput}
                  placeholder="+1 (555) 000-0000"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={LAUNCH_KC_KYC_FIELD_NAMES.DATE_OF_BIRTH}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel className="text-text-secondary">
                  Date of birth
                  <RequiredSymbol />
                </FormLabel>
                <CalendarDatePicker
                  className="w-full"
                  id="dateOfBirth"
                  value={field.value}
                  onSelectDate={handleSelectDate}
                />
                <div className="text-xs text-text-tertiary">
                  The US date format is mm-dd-yyyy
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={LAUNCH_KC_KYC_FIELD_NAMES.SOCIAL_SECURITY_NUMBER}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-6">
                <FormLabel className="text-text-secondary">
                  SSN/ITIN
                  <RequiredSymbol />
                </FormLabel>
                <FormControl>
                  <MaskInput
                    className="text-base"
                    pattern={SSN_PATTERN}
                    placeholder="i.e: 123-45-6789"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectInput
            required
            className="col-span-12 flex items-center"
            control={form.control}
            label="Are you a founder or co-founder of the company applying: "
            name={LAUNCH_KC_KYC_FIELD_NAMES.ARE_FOUNDER_OR_CO_FOUNDER}
            options={YES_NO_OPTIONS}
            placeholder="Please Select"
            subtitle="LaunchKC defines a founder or co-founder as an individual involved with the business since its inception, holding equity, and making strategic decisions."
            subtitleClassName="text-sm font-normal text-text-secondary"
          />
          <SelectInput
            required
            className="col-span-5"
            control={form.control}
            inputClassName="xl:ml-0 xl:max-w-80"
            label="Are you a full-time founder?"
            name={LAUNCH_KC_KYC_FIELD_NAMES.ARE_FULL_TIME_FOUNDER}
            options={YES_NO_OPTIONS}
          />
          <FormField
            control={form.control}
            name={LAUNCH_KC_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE}
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-7">
                <FormLabel className="text-text-secondary">
                  What percent of the business do you own?
                  <RequiredSymbol />
                </FormLabel>
                <FormControl>
                  <Input
                    className="input-number-remove-arrow text-base"
                    max={100}
                    min={0}
                    placeholder="i.e: 70"
                    suffixIcon={<span className="text-text-tertiary">%</span>}
                    type="businessOwnershipPercentage"
                    {...field}
                    onChange={(e) => {
                      if (
                        Number(e.target.value) >= 0 &&
                        Number(e.target.value) <= 100
                      )
                        field.onChange(e)
                    }}
                  />
                </FormControl>
                <div className="text-xs text-text-tertiary">
                  Please enter a number between 0 - 100
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div />
        </form>

        {!isReviewApplicationStep(step) && (
          <FormSubmitButton
            isDisabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        )}
      </Form>
    </FormLayout>
  )
}

function getOrDefault(
  ownerInformationForm: IOwnerFormValue
): LaunchKCOwnerFormValue {
  return {
    ...ownerInformationForm,
    // just temporary, to make fullName pass validation, but actually we use this field
    fullName: `${ownerInformationForm?.firstName} ${ownerInformationForm?.lastName}`
  } as unknown as LaunchKCOwnerFormValue
}
