import { Separator } from "@/components/ui/separator"
import { Form } from "@/components/ui/form"
import {
  RHFMaskInput,
  RHFNumberInput
} from "@/modules/form-template/components/molecules"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  type KansasCityBusinessFormValue,
  kansasCityBusinessFormSchema
} from "../../../../../constants/form"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../../../providers"
import lodash from "lodash"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { FORM_ACTION } from "../../../../../providers/LoanApplicationFormProvider"
import { LOAN_APPLICATION_STEPS } from "../../../../../models/LoanApplicationStep/type"
import { revertPattern } from "@/components/ui/mask-input"
import { useAutoCompleteStepEffect } from "../../../../../hooks/useAutoCompleteStepEffect"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { isReviewApplicationStep } from "../../../../../services"
import { EIN_PATTERN, MM_YYYY_PATTERN } from "../../../../../../../constants"
import { SelectInput } from "@/shared/organisms/form/SelectInput"
import { TYPE_OF_BUSINESS_OPTIONS } from "./const"
import { FormSubmitButton } from "@/modules/loan-application/components/atoms/FormSubmitButton"

const enum FIELD_NAMES {
  ID = "id",
  BUSINESS_LEGAL_NAME = "businessLegalName",
  DBA = "dba",
  BUSINESS_WEBSITE = "businessWebsite",
  OTHER_RELATED_BUSINESS = "otherRelatedBusiness",
  ADDRESS_LINE1 = "addressLine1",
  ADDRESS_LINE2 = "addressLine2",
  BUSINESS_TIN = "businessTin",
  YEAR_FOUNDED = "yearFounded",
  ANY_OTHER_OWNER_OVER_20_PERCENTAGE = "anyOtherOwnerOver20Percentage",
  TYPE_OF_BUSINESS = "typeOfBusiness",
  NUMBER_OF_FULL_TIME_EMPLOYEE = "numberOfFullTimeEmployee",
  NUMBER_OF_PART_TIME_EMPLOYEE = "numberOfPartTimeEmployee",
  TEN_NINETY_NINE_CONTRACTOR_OR_OTHER = "tenNinetyNineContractorOrOther"
}

export function KansasCityBusinessInformationForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { businessInformation, dispatchFormAction } =
    useLoanApplicationFormContext()
  const kansasCityBusinessInformation =
    businessInformation as KansasCityBusinessFormValue

  const defaultValues: Record<string, string> = {}

  Object.keys(kansasCityBusinessFormSchema.shape).forEach((fieldName) => {
    defaultValues[fieldName] = lodash.get(
      kansasCityBusinessInformation,
      fieldName,
      ""
    )
  })

  const form = useForm<KansasCityBusinessFormValue>({
    resolver: zodResolver(kansasCityBusinessFormSchema),
    mode: "onBlur",
    defaultValues
  })
  const onSubmit = (data: KansasCityBusinessFormValue) => {
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
    // This form does not required city, state, postalCode
    form.setValue("city", "ignore")
    form.setValue("state", "ignore")
    form.setValue("postalCode", "00000")
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
        <form className="grid grid-cols-12 gap-x-4xl gap-y-2xl">
          <TextInput
            className="col-span-7"
            control={form.control}
            label="Business legal name"
            name={FIELD_NAMES.BUSINESS_LEGAL_NAME}
            placeholder="i.e: Larry's Latte"
          />
          <TextInput
            className="col-span-5"
            control={form.control}
            label="DBA (If applicable)"
            name={FIELD_NAMES.DBA}
            placeholder="i.e: Larry’s Latte LLC"
          />
          <TextInput
            className="col-span-12"
            control={form.control}
            label="Other related business entities (If applicable)"
            name={FIELD_NAMES.OTHER_RELATED_BUSINESS}
            placeholder="i.e: Larry’s Latte LLC"
          />
          <TextInput
            className="col-span-12"
            control={form.control}
            label="Business street address"
            name={FIELD_NAMES.ADDRESS_LINE1}
            placeholder="Start typing your address"
          />
          <TextInput
            className="col-span-12"
            control={form.control}
            label="Business mailing address (If different)"
            name={FIELD_NAMES.ADDRESS_LINE2}
            placeholder="Start typing your address"
          />
          <TextInput
            className="col-span-12"
            control={form.control}
            label="List any individuals/entities who own 20% or more of the business"
            name={FIELD_NAMES.ANY_OTHER_OWNER_OVER_20_PERCENTAGE}
            placeholder=""
          />
          <RHFMaskInput
            className="col-span-12 lg:col-span-12"
            label="EIN"
            name={FIELD_NAMES.BUSINESS_TIN}
            pattern={EIN_PATTERN}
            placeholder="i.e: 12-3456789"
            styleProps={{
              labelClassName: "text-text-secondary",
              inputClassName: "text-base"
            }}
          />
          <SelectInput
            className="col-span-6"
            control={form.control}
            inputClassName="xl:ml-0 xl:max-w-80"
            label="Type of business"
            name={FIELD_NAMES.TYPE_OF_BUSINESS}
            options={TYPE_OF_BUSINESS_OPTIONS}
            placeholder="Please Select"
          />
          <TextInput
            className="col-span-6"
            control={form.control}
            label="Website"
            name={FIELD_NAMES.BUSINESS_WEBSITE}
            placeholder="i.e. larrylatte.com"
          />
          <RHFMaskInput
            className="col-span-6"
            label="Year founded"
            name={FIELD_NAMES.YEAR_FOUNDED}
            pattern={MM_YYYY_PATTERN}
            placeholder="MM/YYYY"
            styleProps={{
              labelClassName: "text-text-secondary",
              inputClassName: "text-base"
            }}
          />

          <RHFNumberInput
            className="col-span-6 lg:col-span-6"
            label="Current number of full-time employees"
            name={FIELD_NAMES.NUMBER_OF_FULL_TIME_EMPLOYEE}
            placeholder="i.e: 3"
            styleProps={{
              labelClassName: "text-text-secondary",
              inputClassName: "text-base input-number-remove-arrow"
            }}
            subtitle="Full time employees who receive a paycheck from the business"
          />

          <TextInput
            className="col-span-6"
            control={form.control}
            label="Current number of part-time employees"
            name={FIELD_NAMES.NUMBER_OF_PART_TIME_EMPLOYEE}
            placeholder="i.e: 2"
          />

          <TextInput
            className="col-span-6"
            control={form.control}
            label="1099 contractors or other (Explain)"
            name={FIELD_NAMES.TEN_NINETY_NINE_CONTRACTOR_OR_OTHER}
            placeholder="i.e: 1"
          />
        </form>
      </Form>

      {!isReviewApplicationStep(step) && (
        <FormSubmitButton
          isDisabled={!form.formState.isValid}
          onSubmit={form.handleSubmit(onSubmit)}
        />
      )}
    </Card>
  )
}
