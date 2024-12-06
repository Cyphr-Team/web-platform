import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"

import { TextInput } from "@/shared/organisms/form/TextInput"
import { useEffect } from "react"
import { revertPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN, YEAR_PATTERN } from "@/constants"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"

import { useSelectCities } from "@/modules/loan-application/hooks/utils/useSelectCities.ts"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { AutoCompleteCities } from "@/modules/loan-application/components/molecules/AutoCompleteCities.tsx"
import { AutoCompleteStates } from "@/modules/loan-application/components/molecules/AutoCompleteStates.tsx"
import { SelectInput } from "@/shared/organisms/form/SelectInput.tsx"
import _ from "lodash"
import {
  LEGAL_STRUCTURE_OPTIONS,
  PRIMARY_INDUSTRY
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/launchkc/const"
import {
  launchKCBusinessFormSchema,
  type LaunchKCBusinessFormValue
} from "@/modules/loan-application/constants/form.kyb"
import { RHFMaskInput } from "@/modules/form-template/components/molecules"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

const enum FIELD_NAMES {
  ID = "id",
  BUSINESS_LEGAL_NAME = "businessLegalName",
  BUSINESS_WEBSITE = "businessWebsite",
  ADDRESS_LINE1 = "addressLine1",
  ADDRESS_LINE2 = "addressLine2",
  CITY = "city",
  STATE = "state",
  POSTAL_CODE = "postalCode",
  BUSINESS_TIN = "businessTin",
  YEAR_FOUNDED = "yearFounded",
  LEGAL_STRUCTURE = "legalStructure",
  PRIMARY_INDUSTRY = "primaryIndustry",
  PRIMARY_INDUSTRY_OTHER = "primaryIndustryOther",
  COMPANY_DESCRIPTION = "companyDescription"
}

export function LaunchKCBusinessInformationForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { businessInformation, dispatchFormAction } =
    useLoanApplicationFormContext()
  const launchKCBusinessInformation =
    businessInformation as LaunchKCBusinessFormValue

  // set defaultValues using reflection
  const defaultValues: Record<string, string> = {}

  Object.keys(launchKCBusinessFormSchema.shape).forEach((fieldName) => {
    defaultValues[fieldName] = _.get(launchKCBusinessInformation, fieldName, "")
  })

  const form = useForm<LaunchKCBusinessFormValue>({
    resolver: zodResolver(launchKCBusinessFormSchema),
    mode: "onBlur",
    defaultValues
  })

  const { handleChangeState, handleChangeCity, STATE_DATA, state, city } =
    useSelectCities()

  const onSubmit = (data: LaunchKCBusinessFormValue) => {
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

  useEffect(() => {
    if (city) {
      form.setValue(FIELD_NAMES.CITY, city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue(FIELD_NAMES.STATE, state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue(FIELD_NAMES.CITY, "", {
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
      <Form {...form}>
        <form className="grid grid-cols-12 gap-x-4xl gap-y-2xl">
          <TextInput
            required
            className="col-span-12"
            control={form.control}
            label="Business legal name"
            name={FIELD_NAMES.BUSINESS_LEGAL_NAME}
            placeholder="i.e: Larry's Latte"
          />
          <TextInput
            required
            className="col-span-12"
            control={form.control}
            label="Business street address line #1"
            name={FIELD_NAMES.ADDRESS_LINE1}
            placeholder="i.e: 123 Coffee Lane"
          />
          <TextInput
            className="col-span-12"
            control={form.control}
            label="Business street address line #2 (optional)"
            name={FIELD_NAMES.ADDRESS_LINE2}
            placeholder="i.e: Suite 321"
          />
          <AutoCompleteStates
            required
            className="col-span-12 lg:col-span-4"
            control={form.control}
            emptyText="No results found"
            label="Business state"
            name={FIELD_NAMES.STATE}
            options={STATE_DATA}
            value={form.getValues(FIELD_NAMES.STATE)}
            onChange={handleChangeState}
          />
          <AutoCompleteCities
            required
            className="col-span-12 lg:col-span-4"
            control={form.control}
            emptyText="No results found"
            label="Business city"
            name={FIELD_NAMES.CITY}
            options={
              STATE_DATA.find(
                (s) => s.name === form.getValues(FIELD_NAMES.STATE)
              )?.cities ?? []
            }
            value={form.getValues(FIELD_NAMES.CITY)}
            onChange={handleChangeCity}
          />
          <TextInput
            required
            className="col-span-12 lg:col-span-4"
            control={form.control}
            label="Business zip code"
            name={FIELD_NAMES.POSTAL_CODE}
            placeholder="i.e: 97531"
          />
          <RHFMaskInput
            required
            className="col-span-12 lg:col-span-5"
            label="EIN"
            name={FIELD_NAMES.BUSINESS_TIN}
            pattern={EIN_PATTERN}
            placeholder="i.e: 12-3456789"
            styleProps={{
              labelClassName: "text-text-secondary",
              inputClassName: "text-base"
            }}
          />
          <RHFMaskInput
            required
            className="col-span-3"
            label="Year founded"
            name={FIELD_NAMES.YEAR_FOUNDED}
            pattern={YEAR_PATTERN}
            placeholder="YYYY"
            styleProps={{
              labelClassName: "text-text-secondary",
              inputClassName: "text-base"
            }}
          />
          <SelectInput
            required
            className="col-span-4"
            control={form.control}
            inputClassName="xl:ml-0 xl:max-w-80"
            label="Legal structure"
            name={FIELD_NAMES.LEGAL_STRUCTURE}
            options={LEGAL_STRUCTURE_OPTIONS}
            placeholder="Please Select"
          />
          <TextInput
            className="col-span-12"
            control={form.control}
            inputClassName="pl-16"
            label="Business website"
            name={FIELD_NAMES.BUSINESS_WEBSITE}
            placeholder="www.larryslatte.com"
            prefix="https://"
            prefixIcon={<p className="text-text-secondary">https://</p>}
          />
          <SelectInput
            required
            className="col-span-4"
            control={form.control}
            inputClassName="xl:ml-0 xl:max-w-80"
            label="Primary industry"
            name={FIELD_NAMES.PRIMARY_INDUSTRY}
            options={PRIMARY_INDUSTRY}
            placeholder="Please Select"
          />
          <TextInput
            className="col-span-8"
            control={form.control}
            label="Primary industry (other): Please describe"
            name={FIELD_NAMES.PRIMARY_INDUSTRY_OTHER}
          />
          <TextInput
            required
            className="col-span-12"
            control={form.control}
            label="Describe your company in one sentence"
            name={FIELD_NAMES.COMPANY_DESCRIPTION}
          />
        </form>
      </Form>

      {!isReviewApplicationStep(step) && (
        <FormSubmitButton
          isDisabled={!form.formState.isValid}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      )}
    </FormLayout>
  )
}
