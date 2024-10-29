import { Button } from "@/components/ui/button"
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
import {
  type IOwnerFormValue,
  ownerFormSchema,
  type OwnerFormValue
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
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import PhoneInput from "react-phone-number-input"
import { useSelectCities } from "../../../../hooks/useSelectCities"
import { AutoCompleteCities } from "../../../molecules/AutoCompleteCities"
import { AutoCompleteStates } from "../../../molecules/AutoCompleteStates"

import { LOAN_APPLICATION_STEPS } from "../../../../models/LoanApplicationStep/type"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"

interface OwnerInformationFormProps {
  wrapperClassName?: string
}

export function OwnerInformationForm({
  wrapperClassName
}: OwnerInformationFormProps) {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { dispatchFormAction, ownerInformationForm } =
    useLoanApplicationFormContext()

  const form = useForm<OwnerFormValue>({
    resolver: zodResolver(ownerFormSchema),
    values: getOrDefault(ownerInformationForm),
    mode: "onBlur"
  })

  const handleSelectDate = (date: Date | undefined) => {
    form.setValue("dateOfBirth", date?.toISOString() ?? "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }

  const { handleChangeState, handleChangeCity, STATE_DATA, state, city } =
    useSelectCities()

  const onSubmit = (data: OwnerFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
      state: data
    })
    finishCurrentStep()
  }

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

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.OWNER_INFORMATION)

  return (
    <FormLayout
      id={LOAN_APPLICATION_STEPS.OWNER_INFORMATION}
      title="Owner / Guarantor Information"
      wrapperClassName={wrapperClassName}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <div className="flex flex-col gap-2xl  rounded-lg h-fit shadow-none">
            <h5 className="text-lg font-semibold">
              Owner / Guarantor Information
            </h5>
            <Separator />

            <form className="grid grid-cols-6 gap-y-2xl gap-x-2xl px-1">
              <TextInput
                required
                className="col-span-3"
                control={form.control}
                label="Full Name"
                name="fullName"
                placeholder="i.e: Larry Latte"
              />
              <TextInput
                required
                className="col-span-3"
                control={form.control}
                label="Your Role"
                name="businessRole"
                placeholder="Founder and CEO"
              />
              <TextInput
                required
                className="col-span-6"
                control={form.control}
                label="Resident address line #1"
                name="addressLine1"
                placeholder="i.e: 456 Bean Ave."
              />{" "}
              <TextInput
                className="col-span-6"
                control={form.control}
                label="Resident address line #2 (optional)"
                name="addressLine2"
                placeholder="i.e: Suite 789"
              />
              <AutoCompleteStates
                required
                className="col-span-6 lg:col-span-2"
                control={form.control}
                emptyText="No results found"
                label="Business state"
                name="businessState"
                options={STATE_DATA}
                value={form.getValues("businessState")}
                onChange={handleChangeState}
              />
              <AutoCompleteCities
                required
                className="col-span-6 lg:col-span-2"
                control={form.control}
                emptyText="No results found"
                label="Business city"
                name="businessCity"
                options={
                  STATE_DATA.find(
                    (s) => s.name === form.getValues("businessState")
                  )?.cities ?? []
                }
                value={form.getValues("businessCity")}
                onChange={handleChangeCity}
              />
              <TextInput
                required
                className="col-span-6 lg:col-span-2"
                control={form.control}
                label="Zip code"
                name="businessZipCode"
                placeholder="i.e: 98765"
              />
              <TextInput
                required
                className="col-span-6 lg:col-span-3"
                control={form.control}
                label="Email address"
                name="email"
                placeholder="i.e: larry@latte.com"
                prefixIcon={<Mail className="h-5 w-5 text-muted-foreground" />}
              />
              <FormField
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-3">
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-3">
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
                name="socialSecurityNumber"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-3">
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
              <FormField
                control={form.control}
                name="businessOwnershipPercentage"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-3">
                    <FormLabel className="text-text-secondary">
                      What percent of the business do you own?
                      <RequiredSymbol />
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-base input-number-remove-arrow"
                        max={100}
                        min={0}
                        placeholder="i.e: 70"
                        suffixIcon={
                          <span className="text-text-tertiary">%</span>
                        }
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
              <Button
                disabled={!form.formState.isValid}
                onClick={form.handleSubmit(onSubmit)}
              >
                Next <ArrowRight className="ml-1 w-4" />
              </Button>
            )}
          </div>
        </Form>
      </div>
    </FormLayout>
  )
}

const getOrDefault = (
  ownerInformationForm: IOwnerFormValue
): OwnerFormValue => {
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
    governmentFile: ownerInformationForm?.governmentFile ?? []
  }
}
