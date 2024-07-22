import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MaskInput, toPattern } from "@/components/ui/mask-input"
import { CountrySelect, CustomPhoneInput } from "@/components/ui/phone-input"
import { Separator } from "@/components/ui/separator"
import { SSN_PATTERN } from "@/constants"
import { cn } from "@/lib/utils"
import {
  launchKCOwnerFormSchema,
  LaunchKCOwnerFormValue
} from "@/modules/loan-application/constants/form"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Mail } from "lucide-react"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import PhoneInput from "react-phone-number-input"

import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { useSelectCities } from "@/modules/loan-application/hooks/useSelectCities.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates.tsx"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities.tsx"
import { SelectInput } from "@/shared/organisms/form/SelectInput.tsx"
import { OptionInput } from "@/shared/organisms/form/OptionInput.tsx"
import {
  ETHNIC_IDENTIFICATION_OPTIONS,
  GENDER_IDENTITY_OPTIONS,
  PREFERRED_PRONOUN_OPTIONS,
  RACIAL_IDENTIFICATION_OPTIONS,
  TITLE_OPTIONS,
  YES_NO_OPTIONS
} from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/launchkc/const.ts"
import { get, set } from "lodash"

const enum FIELD_NAMES {
  ID = "id",
  ADDRESS_LINE1 = "addressLine1",
  ADDRESS_LINE2 = "addressLine2",
  BUSINESS_CITY = "businessCity",
  BUSINESS_STATE = "businessState",
  BUSINESS_ZIP_CODE = "businessZipCode",
  PHONE_NUMBER = "phoneNumber",
  EMAIL = "email",
  DATE_OF_BIRTH = "dateOfBirth",
  SOCIAL_SECURITY_NUMBER = "socialSecurityNumber",
  BUSINESS_OWNERSHIP_PERCENTAGE = "businessOwnershipPercentage",
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  TITLE = "title",
  GENDER_IDENTITY = "genderIdentity",
  PREFERRED_PRONOUN = "preferredPronoun",
  RACIAL_IDENTIFICATION = "racialIdentification",
  ETHNIC_IDENTIFICATION = "ethnicIdentification",
  ARE_FOUNDER_OR_COFOUNDER = "areFounderOrCoFounder",
  ARE_FULL_TIME_FOUNDER = "areFullTimeFounder"
}

export function LaunchKCOwnerInformationForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { dispatchFormAction, ownerInformationForm } =
    useLoanApplicationFormContext()

  const launchKcOwnerInformationForm = useMemo(
    () => ownerInformationForm as LaunchKCOwnerFormValue,
    [ownerInformationForm]
  )

  // set default values
  const defaultValues: Partial<LaunchKCOwnerFormValue> = {}
  Object.keys(launchKCOwnerFormSchema.shape).forEach((field) => {
    let defaultVal: string | File[] = get(
      launchKcOwnerInformationForm,
      field,
      ""
    )
    if (field === FIELD_NAMES.SOCIAL_SECURITY_NUMBER) {
      defaultVal = launchKcOwnerInformationForm?.[field]
        ? toPattern(launchKcOwnerInformationForm[field], SSN_PATTERN)
        : ""
    }

    set(defaultValues, field, defaultVal)
  })

  const form = useForm<LaunchKCOwnerFormValue>({
    resolver: zodResolver(launchKCOwnerFormSchema),
    mode: "onBlur",
    defaultValues
  })

  const handleSelectDate = (date: Date | undefined) => {
    form.setValue(FIELD_NAMES.DATE_OF_BIRTH, date?.toISOString() ?? "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
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
      form.setValue(FIELD_NAMES.BUSINESS_CITY, city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue(FIELD_NAMES.BUSINESS_STATE, state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue(FIELD_NAMES.BUSINESS_CITY, "", {
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
        state: data
      })
    }
    // setValue to make it dirty, act like we manually input these value
    form.setValue("fullName", "ignore")
    form.setValue("businessRole", "ignore")
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OWNER_INFORMATION)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
      id={LOAN_APPLICATION_STEPS.OWNER_INFORMATION}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
            <h5 className="text-lg font-semibold">
              Owner / Guarantor Information
            </h5>
            <Separator />

            <form className="grid grid-cols-12 gap-y-2xl gap-x-4xl">
              <TextInput
                control={form.control}
                name={FIELD_NAMES.FIRST_NAME}
                label="First Name"
                placeholder="i.e: Larry"
                className="col-span-4"
                required
              />
              <TextInput
                control={form.control}
                name={FIELD_NAMES.LAST_NAME}
                label="Last Name"
                placeholder="i.e: Latte"
                className="col-span-4"
                required
              />
              <SelectInput
                label="Title"
                placeholder="Please Select"
                control={form.control}
                name={FIELD_NAMES.TITLE}
                className="col-span-4"
                inputClassName="xl:ml-0 xl:max-w-80"
                options={TITLE_OPTIONS}
                required
              />
              <OptionInput
                name={FIELD_NAMES.GENDER_IDENTITY}
                label="Which best describes your gender identity?"
                control={form.control}
                className="col-span-12"
                options={GENDER_IDENTITY_OPTIONS}
                hasOtherOption={true}
                otherText="Prefer to self-describe"
                required
              />
              <OptionInput
                label="Which best describes your preferred pronoun?"
                control={form.control}
                name={FIELD_NAMES.PREFERRED_PRONOUN}
                className="col-span-12"
                hasOtherOption={true}
                options={PREFERRED_PRONOUN_OPTIONS}
                required
              />
              <SelectInput
                label="Racial identification"
                placeholder="Please Select"
                control={form.control}
                name={FIELD_NAMES.RACIAL_IDENTIFICATION}
                options={RACIAL_IDENTIFICATION_OPTIONS}
                className="col-span-6"
                inputClassName="xl:ml-0 xl:max-w-80"
                required
              />
              <SelectInput
                label="Ethnic identification"
                placeholder="Please Select"
                control={form.control}
                name={FIELD_NAMES.ETHNIC_IDENTIFICATION}
                options={ETHNIC_IDENTIFICATION_OPTIONS}
                className="col-span-6"
                inputClassName="xl:ml-0 xl:max-w-80"
                required
              />
              <TextInput
                placeholder="i.e: 456 Bean Ave."
                label="Resident Address Line #1"
                name={FIELD_NAMES.ADDRESS_LINE1}
                control={form.control}
                className="col-span-12"
                required
              />
              <TextInput
                placeholder="i.e: Suite 789"
                label="Resident Address Line #2 (Optional)"
                name={FIELD_NAMES.ADDRESS_LINE2}
                control={form.control}
                className="col-span-12"
              />
              <AutoCompleteStates
                options={STATE_DATA}
                label="State"
                emptyText="No results found"
                name={FIELD_NAMES.BUSINESS_STATE}
                control={form.control}
                onChange={handleChangeState}
                value={form.getValues("businessState")}
                className="col-span-12 lg:col-span-4"
                required
              />
              <AutoCompleteCities
                options={
                  STATE_DATA.find(
                    (s) => s.name === form.getValues("businessState")
                  )?.cities ?? []
                }
                label="City"
                emptyText="No results found"
                name={FIELD_NAMES.BUSINESS_CITY}
                control={form.control}
                onChange={handleChangeCity}
                value={form.getValues(FIELD_NAMES.BUSINESS_CITY)}
                className="col-span-12 lg:col-span-4"
                required
              />
              <TextInput
                placeholder="i.e: 98765"
                label="Zip Code"
                name={FIELD_NAMES.BUSINESS_ZIP_CODE}
                control={form.control}
                className="col-span-12 lg:col-span-4"
                required
              />
              <TextInput
                control={form.control}
                name={FIELD_NAMES.EMAIL}
                label="Email Address"
                placeholder="i.e: larry@latte.com"
                prefixIcon={<Mail className="h-5 w-5 text-muted-foreground" />}
                className="col-span-12 lg:col-span-6"
                required
              />
              <FormField
                name={FIELD_NAMES.PHONE_NUMBER}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel className="text-text-secondary">
                      Phone Number
                      <RequiredSymbol />
                    </FormLabel>
                    <PhoneInput
                      international
                      countryCallingCodeEditable={false}
                      countrySelectComponent={CountrySelect}
                      defaultCountry="US"
                      placeholder="+1 (555) 000-0000"
                      inputComponent={CustomPhoneInput}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={FIELD_NAMES.DATE_OF_BIRTH}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel className="text-text-secondary">
                      Date of Birth
                      <RequiredSymbol />
                    </FormLabel>
                    <CalendarDatePicker
                      id="dateOfBirth"
                      value={field.value}
                      onSelectDate={handleSelectDate}
                      className="w-full"
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
                name={FIELD_NAMES.SOCIAL_SECURITY_NUMBER}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel className="text-text-secondary">
                      SSN/ITIN
                      <RequiredSymbol />
                    </FormLabel>
                    <FormControl>
                      <MaskInput
                        placeholder="i.e: 123-45-6789"
                        className="text-base"
                        pattern={SSN_PATTERN}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SelectInput
                label="Are you a founder or co-founder of the company applying: "
                subtitle="LaunchKC defines a founder or co-founder as an individual involved with the business since its inception, holding equity, and making strategic decisions."
                subtitleClassName="text-sm text-text-secondary font-normal"
                placeholder="Please Select"
                control={form.control}
                name={FIELD_NAMES.ARE_FOUNDER_OR_COFOUNDER}
                options={YES_NO_OPTIONS}
                className="flex items-center col-span-12"
                required
              />
              <SelectInput
                label="Are you a full-time founder?"
                control={form.control}
                name={FIELD_NAMES.ARE_FULL_TIME_FOUNDER}
                options={YES_NO_OPTIONS}
                className="col-span-5"
                inputClassName="xl:ml-0 xl:max-w-80"
                required
              />
              <FormField
                control={form.control}
                name={FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-7">
                    <FormLabel className="text-text-secondary">
                      What percent of the business do you own?
                      <RequiredSymbol />
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="businessOwnershipPercentage"
                        placeholder="i.e: 70"
                        min={0}
                        max={100}
                        className="text-base input-number-remove-arrow"
                        suffixIcon={
                          <span className="text-text-tertiary">%</span>
                        }
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
              <Button
                disabled={!form.formState.isValid}
                onClick={form.handleSubmit(onSubmit)}
              >
                Next <ArrowRight className="ml-1 w-4" />
              </Button>
            )}
          </Card>
        </Form>
      </div>
    </div>
  )
}
