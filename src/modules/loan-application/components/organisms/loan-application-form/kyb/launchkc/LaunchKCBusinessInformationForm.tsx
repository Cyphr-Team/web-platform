import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { TextInput } from "@/shared/organisms/form/TextInput"
import { useEffect } from "react"
import { revertPattern } from "@/components/ui/mask-input"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { EIN_PATTERN, YEAR_PATTERN } from "@/constants"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"

import { useSelectCities } from "@/modules/loan-application/hooks/useSelectCities.ts"
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
  LaunchKCBusinessFormValue
} from "@/modules/loan-application/constants/form.ts"
import { RHFMaskInput } from "@/modules/form-template/components/molecules"

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

export const LaunchKCBusinessInformationForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { businessInformation, dispatchFormAction } =
    useLoanApplicationFormContext()
  const launchKCBusinessInformation =
    businessInformation as LaunchKCBusinessFormValue

  // set defaultValues using reflection
  const defaultValues: { [key: string]: string } = {}
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
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
      id={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <Form {...form}>
        <form className="grid grid-cols-12 gap-y-2xl gap-x-4xl">
          <TextInput
            placeholder="i.e: Larry's Latte"
            label="Business legal name"
            control={form.control}
            name={FIELD_NAMES.BUSINESS_LEGAL_NAME}
            className="col-span-12"
            required
          />
          <TextInput
            placeholder="i.e: 123 Coffee Lane"
            label="Business street address line #1"
            name={FIELD_NAMES.ADDRESS_LINE1}
            control={form.control}
            className="col-span-12"
            required
          />
          <TextInput
            placeholder="i.e: Suite 321"
            label="Business street address line #2 (optional)"
            name={FIELD_NAMES.ADDRESS_LINE2}
            control={form.control}
            className="col-span-12"
          />
          <AutoCompleteStates
            options={STATE_DATA}
            label="Business state"
            emptyText="No results found"
            name={FIELD_NAMES.STATE}
            control={form.control}
            onChange={handleChangeState}
            value={form.getValues(FIELD_NAMES.STATE)}
            className="col-span-12 lg:col-span-4"
            required
          />
          <AutoCompleteCities
            options={
              STATE_DATA.find(
                (s) => s.name === form.getValues(FIELD_NAMES.STATE)
              )?.cities ?? []
            }
            label="Business city"
            emptyText="No results found"
            name={FIELD_NAMES.CITY}
            control={form.control}
            onChange={handleChangeCity}
            value={form.getValues(FIELD_NAMES.CITY)}
            className="col-span-12 lg:col-span-4"
            required
          />
          <TextInput
            placeholder="i.e: 97531"
            label="Business zip code"
            name={FIELD_NAMES.POSTAL_CODE}
            control={form.control}
            className="col-span-12 lg:col-span-4"
            required
          />
          <RHFMaskInput
            label="EIN"
            name={FIELD_NAMES.BUSINESS_TIN}
            pattern={EIN_PATTERN}
            placeholder="i.e: 12-3456789"
            className="col-span-12 lg:col-span-5"
            styleProps={{
              labelClassName: "text-text-secondary",
              inputClassName: "text-base"
            }}
            required
          />
          <RHFMaskInput
            label="Year founded"
            name={FIELD_NAMES.YEAR_FOUNDED}
            pattern={YEAR_PATTERN}
            placeholder="YYYY"
            className="col-span-3"
            styleProps={{
              labelClassName: "text-text-secondary",
              inputClassName: "text-base"
            }}
            required
          />
          <SelectInput
            label="Legal structure"
            placeholder="Please Select"
            control={form.control}
            name={FIELD_NAMES.LEGAL_STRUCTURE}
            className="col-span-4"
            inputClassName="xl:ml-0 xl:max-w-80"
            options={LEGAL_STRUCTURE_OPTIONS}
            required
          />
          <TextInput
            placeholder="www.larryslatte.com"
            label="Business website"
            name={FIELD_NAMES.BUSINESS_WEBSITE}
            control={form.control}
            className="col-span-12"
            inputClassName="pl-16"
            prefix="https://"
            prefixIcon={<p className="text-text-secondary">https://</p>}
          />
          <SelectInput
            label="Primary industry"
            placeholder="Please Select"
            control={form.control}
            name={FIELD_NAMES.PRIMARY_INDUSTRY}
            className="col-span-4"
            inputClassName="xl:ml-0 xl:max-w-80"
            options={PRIMARY_INDUSTRY}
            required
          />
          <TextInput
            label="Primary industry (other): Please describe"
            control={form.control}
            name={FIELD_NAMES.PRIMARY_INDUSTRY_OTHER}
            className="col-span-8"
          />
          <TextInput
            label="Describe your company in one sentence"
            control={form.control}
            name={FIELD_NAMES.COMPANY_DESCRIPTION}
            className="col-span-12"
            required
          />
        </form>
      </Form>

      {!isReviewApplicationStep(step) && (
        <Button
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          Next <ArrowRight className="ml-1 w-4" />
        </Button>
      )}
    </Card>
  )
}
