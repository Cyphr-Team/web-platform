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
  ownerFormSchema,
  OwnerFormValue
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
import { useSelectCities } from "../../../../hooks/useSelectCities"
import { AutoCompleteCities } from "../../../molecules/AutoCompleteCities"
import { AutoCompleteStates } from "../../../molecules/AutoCompleteStates"

import { LOAN_APPLICATION_STEPS } from "../../../../models/LoanApplicationStep/type"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { useUpdateEffect } from "react-use"

export function OwnerInformationForm() {
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
      governmentFile: ownerInformationForm?.governmentFile ?? []
    }),
    [ownerInformationForm]
  )

  const form = useForm<OwnerFormValue>({
    resolver: zodResolver(ownerFormSchema),
    values: defaultValues,
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

  // Update form values when ownerInformationForm changes
  useUpdateEffect(() => {
    form.reset(defaultValues)
  }, [ownerInformationForm])

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
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
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
              <TextInput
                control={form.control}
                name="fullName"
                label="Full Name"
                placeholder="i.e: Larry Latte"
                className="col-span-3"
                required
              />
              <TextInput
                control={form.control}
                name="businessRole"
                label="Your Role"
                placeholder="Founder and CEO"
                className="col-span-3"
                required
              />
              <TextInput
                placeholder="i.e: 456 Bean Ave."
                label="Resident address line #1"
                name="addressLine1"
                control={form.control}
                className="col-span-6"
                required
              />{" "}
              <TextInput
                placeholder="i.e: Suite 789"
                label="Resident address line #2 (optional)"
                name="addressLine2"
                control={form.control}
                className="col-span-6"
              />
              <AutoCompleteStates
                options={STATE_DATA}
                label="Business state"
                emptyText="No results found"
                name="businessState"
                control={form.control}
                onChange={handleChangeState}
                value={form.getValues("businessState")}
                className="col-span-6 lg:col-span-2"
                required
              />
              <AutoCompleteCities
                options={
                  STATE_DATA.find(
                    (s) => s.name === form.getValues("businessState")
                  )?.cities ?? []
                }
                label="Business city"
                emptyText="No results found"
                name="businessCity"
                control={form.control}
                onChange={handleChangeCity}
                value={form.getValues("businessCity")}
                className="col-span-6 lg:col-span-2"
                required
              />
              <TextInput
                placeholder="i.e: 98765"
                label="Zip code"
                name="businessZipCode"
                control={form.control}
                className="col-span-6 lg:col-span-2"
                required
              />
              <TextInput
                control={form.control}
                name="email"
                label="Email address"
                placeholder="i.e: larry@latte.com"
                prefixIcon={<Mail className="h-5 w-5 text-muted-foreground" />}
                className="col-span-6 lg:col-span-3"
                required
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-3">
                    <FormLabel className="text-text-secondary">
                      Date of birth
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
                name={"socialSecurityNumber"}
                render={({ field }) => (
                  <FormItem className="col-span-6 lg:col-span-3">
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
