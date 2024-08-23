import { useEffect, useMemo } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../../../providers"
import {
  KansasCityOwnerFormValue,
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
import { Button } from "../../../../../../../components/ui/button"
import { ArrowRight } from "lucide-react"
import { TextInput } from "../../../../../../../shared/organisms/form/TextInput"
import { KANSAS_CITY_KYC_FIELD_NAMES, getKycOptionsByField } from "./const"
import PhoneInput from "react-phone-number-input"
import {
  CountrySelect,
  CustomPhoneInput
} from "../../../../../../../components/ui/phone-input"
import { SelectInput } from "../../../../../../../shared/organisms/form/SelectInput"
import { RHFPercentageInput } from "@/modules/form-template/components/molecules"

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
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
            <h5 className="text-lg font-semibold">
              Owner / Guarantor Information
            </h5>
            <Separator />
            <form className="grid grid-cols-12 gap-y-2xl gap-x-4xl">
              <TextInput
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.FULL_NAME}
                label="Full name"
                placeholder="i.e: Latte Larry"
                className="col-span-6"
              />
              <TextInput
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.BUSINESS_ROLE}
                label="Your role"
                placeholder="i.e Founder and CEO"
                className="col-span-6"
              />
              <TextInput
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.RESIDENT_STREET_ADDRESS}
                label="Residental street address"
                placeholder="Start typing your address"
                className="col-span-12"
              />
              <TextInput
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.EMAIL}
                label="Email address"
                placeholder="i.e: larry@latte.com"
                className="col-span-12 lg:col-span-6"
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
                      placeholder="+1 (555) 000-0000"
                      inputComponent={CustomPhoneInput}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SelectInput
                label="Title"
                placeholder="Please Select"
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.TITLE}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.TITLE
                )}
                className="col-span-6"
                inputClassName="xl:ml-0 xl:max-w-80"
                required
              />
              <SelectInput
                label="Gender"
                placeholder="Please Select"
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.GENDER_IDENTITY}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.GENDER_IDENTITY
                )}
                className="col-span-6"
                inputClassName="xl:ml-0 xl:max-w-80"
                required
              />
              <SelectInput
                label="Racial identification"
                placeholder="Please Select"
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.RACIAL_IDENTIFICATION
                )}
                className="col-span-6"
                inputClassName="xl:ml-0 xl:max-w-80"
                required
              />
              <SelectInput
                label="Ethnic identification"
                placeholder="Please Select"
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.ETHNIC_IDENTIFICATION
                )}
                className="col-span-6"
                inputClassName="xl:ml-0 xl:max-w-80"
                required
              />
              <SelectInput
                label="Personal credit score"
                placeholder="Please Select"
                control={form.control}
                name={KANSAS_CITY_KYC_FIELD_NAMES.PERSONAL_CREDIT_SCORE}
                options={getKycOptionsByField(
                  KANSAS_CITY_KYC_FIELD_NAMES.PERSONAL_CREDIT_SCORE
                )}
                className="col-span-4"
                inputClassName="xl:ml-0 xl:max-w-80"
                required
              />
              <RHFPercentageInput
                label="What percent of the business do you own?"
                name={KANSAS_CITY_KYC_FIELD_NAMES.BUSINESS_OWNERSHIP_PERCENTAGE}
                placeholder="Enter percentage"
                min={0}
                max={100}
                className="col-span-8 lg:col-span-7"
                styleProps={{
                  labelClassName: "text-text-secondary",
                  subtitleClassName: "text-xs text-text-tertiary"
                }}
                suffix="%"
                subtitle="Please enter a number between 0 - 100"
                direction="column"
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
