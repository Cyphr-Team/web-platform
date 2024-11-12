import { useEffect, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../../../providers"
import {
  type KansasCityOwnerFormValue,
  kansasCityOwnerFormSchema
} from "../../../../../constants/form"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { useAutoCompleteStepEffect } from "../../../../../hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "../../../../../models/LoanApplicationStep/type"
import { cn } from "../../../../../../../lib/utils"
import { Card } from "../../../../../../../components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FORM_ACTION } from "../../../../../providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "../../../../../services"
import { TextInput } from "../../../../../../../shared/organisms/form/TextInput"
import { KANSAS_CITY_KYC_FIELD_NAMES, getKycOptionsByField } from "./const"
import PhoneInput from "react-phone-number-input"
import {
  CountrySelect,
  CustomPhoneInput
} from "../../../../../../../components/ui/phone-input"
import { SelectInput } from "../../../../../../../shared/organisms/form/SelectInput"
import { RHFPercentageInput } from "@/modules/form-template/components/molecules"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"

export function KansasCityOwnerInformationForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { dispatchFormAction, ownerInformationForm } =
    useLoanApplicationFormContext()

  const kansasCityOwnerInformationForm = useMemo(
    () => ownerInformationForm as KansasCityOwnerFormValue,
    [ownerInformationForm]
  )
  // set default value
  const defaultValues = useMemo(
    () => ({
      id: kansasCityOwnerInformationForm?.id ?? "",
      fullName: kansasCityOwnerInformationForm?.fullName ?? "",
      businessRole: kansasCityOwnerInformationForm?.businessRole ?? "",
      residentStreetAddress:
        kansasCityOwnerInformationForm?.residentStreetAddress ?? "",
      email: kansasCityOwnerInformationForm?.email ?? "",
      phoneNumber: kansasCityOwnerInformationForm?.phoneNumber ?? "",
      title: kansasCityOwnerInformationForm?.title ?? "",
      genderIdentity: kansasCityOwnerInformationForm?.genderIdentity ?? "",
      racialIdentification:
        kansasCityOwnerInformationForm?.racialIdentification ?? "",
      ethnicIdentification:
        kansasCityOwnerInformationForm?.ethnicIdentification ?? "",
      personalCreditScore:
        kansasCityOwnerInformationForm?.personalCreditScore ?? "",
      businessOwnershipPercentage:
        kansasCityOwnerInformationForm?.businessOwnershipPercentage ?? ""
    }),
    [kansasCityOwnerInformationForm]
  )

  const form = useForm<KansasCityOwnerFormValue>({
    resolver: zodResolver(kansasCityOwnerFormSchema),
    mode: "onBlur",
    defaultValues
  })
  const onSubmit = (data: KansasCityOwnerFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
      state: data
    })
    finishCurrentStep()
  }

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
    form.setValue("addressLine1", "ignore")
    form.setValue("addressLine2", "ignore")
    form.setValue("businessCity", "ignore")
    form.setValue("businessState", "ignore")
    form.setValue("businessZipCode", "ignore")
    form.setValue("dateOfBirth", "01/01/1970")
    form.setValue("socialSecurityNumber", "xxx-xxx-xxx")
    form.setValue("hasOtherSubstantialStackHolders", "ignore")
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
          <Card className="flex h-fit flex-col gap-2xl rounded-lg p-4xl">
            <h5 className="text-lg font-semibold">
              Owner / Guarantor Information
            </h5>
            <Separator />
            <form className="grid grid-cols-12 gap-x-4xl gap-y-2xl">
              <TextInput
                className="col-span-6"
                control={form.control}
                label="Full name"
                name={KANSAS_CITY_KYC_FIELD_NAMES.FULL_NAME}
                placeholder="i.e: Latte Larry"
              />
              <TextInput
                className="col-span-6"
                control={form.control}
                label="Your role"
                name={KANSAS_CITY_KYC_FIELD_NAMES.BUSINESS_ROLE}
                placeholder="i.e Founder and CEO"
              />
              <TextInput
                className="col-span-12"
                control={form.control}
                label="Residental street address"
                name={KANSAS_CITY_KYC_FIELD_NAMES.RESIDENT_STREET_ADDRESS}
                placeholder="Start typing your address"
              />
              <TextInput
                className="col-span-12 lg:col-span-6"
                control={form.control}
                label="Email address"
                name={KANSAS_CITY_KYC_FIELD_NAMES.EMAIL}
                placeholder="i.e: larry@latte.com"
              />
              <FormField
                name={KANSAS_CITY_KYC_FIELD_NAMES.PHONE_NUMBER}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormLabel className="text-text-secondary">
                      Phone number
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
              <SelectInput
                className="col-span-6"
                control={form.control}
                inputClassName="xl:ml-0 xl:max-w-80"
                label="Title"
                name={KANSAS_CITY_KYC_FIELD_NAMES.TITLE}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.TITLE
                )}
                placeholder="Please Select"
              />
              <SelectInput
                className="col-span-6"
                control={form.control}
                inputClassName="xl:ml-0 xl:max-w-80"
                label="Gender"
                name={KANSAS_CITY_KYC_FIELD_NAMES.GENDER_IDENTITY}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.GENDER_IDENTITY
                )}
                placeholder="Please Select"
              />
              <SelectInput
                className="col-span-6"
                control={form.control}
                inputClassName="xl:ml-0 xl:max-w-80"
                label="Racial identification"
                name={KANSAS_CITY_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION
                )}
                placeholder="Please Select"
              />
              <SelectInput
                className="col-span-6"
                control={form.control}
                inputClassName="xl:ml-0 xl:max-w-80"
                label="Ethnic identification"
                name={KANSAS_CITY_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION
                )}
                placeholder="Please Select"
              />
              <SelectInput
                className="col-span-4"
                control={form.control}
                inputClassName="xl:ml-0 xl:max-w-80"
                label="Personal credit score"
                name={KANSAS_CITY_KYC_FIELD_NAMES.PERSONAL_CREDIT_SCORE}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.PERSONAL_CREDIT_SCORE
                )}
                placeholder="Please Select"
              />
              <RHFPercentageInput
                isString
                className="col-span-8 lg:col-span-7"
                direction="column"
                label="What percent of the business do you own?"
                max={100}
                min={0}
                name={KANSAS_CITY_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE}
                placeholder="Enter percentage"
                styleProps={{
                  labelClassName: "text-text-secondary",
                  subtitleClassName: "text-xs text-text-tertiary"
                }}
                subtitle="Please enter a number between 0 - 100"
                suffix="%"
              />
              <div />
            </form>
            {!isReviewApplicationStep(step) && (
              <FormSubmitButton
                isDisabled={!form.formState.isValid}
                onSubmit={form.handleSubmit(onSubmit)}
              />
            )}
          </Card>
        </Form>
      </div>
    </div>
  )
}
