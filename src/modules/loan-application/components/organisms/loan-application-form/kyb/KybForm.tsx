import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Separator } from "@/components/ui/separator"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../../../../providers"
import {
  businessFormSchema,
  type BusinessFormValue
} from "../../../../constants/form.kyb"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { useEffect, useMemo } from "react"
import { AutoCompleteStates } from "../../../molecules/AutoCompleteStates"
import { AutoCompleteCities } from "../../../molecules/AutoCompleteCities"
import { revertPattern, toPattern } from "@/components/ui/mask-input"
import { FORM_ACTION } from "../../../../providers/LoanApplicationFormProvider"
import { EIN_PATTERN } from "@/constants"
import { LOAN_APPLICATION_STEPS } from "../../../../models/LoanApplicationStep/type"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { RHFMaskInput } from "@/modules/form-template/components/molecules"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout.tsx"
import { useSelectCities } from "@/modules/loan-application/hooks/utils/useSelectCities.ts"

interface BusinessInformationFormProps {
  wrapperClassName?: string
}

export function BusinessInformationForm({
  wrapperClassName
}: BusinessInformationFormProps) {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const { businessInformation, dispatchFormAction } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () => ({
      id: businessInformation?.id ?? "",
      businessLegalName: businessInformation?.businessLegalName ?? "",
      addressLine1: businessInformation?.addressLine1 ?? "",
      addressLine2: businessInformation?.addressLine2 ?? "",
      state: businessInformation?.state ?? "",
      city: businessInformation?.city ?? "",
      postalCode: businessInformation?.postalCode ?? "",
      businessWebsite: businessInformation?.businessWebsite ?? "",
      businessTin: businessInformation?.businessTin
        ? toPattern(businessInformation?.businessTin)
        : ""
    }),
    [businessInformation]
  )

  const form = useForm<BusinessFormValue>({
    resolver: zodResolver(businessFormSchema),
    values: defaultValues,
    mode: "onBlur"
  })

  const { handleChangeState, handleChangeCity, STATE_DATA, state, city } =
    useSelectCities()

  const onSubmit = (data: BusinessFormValue) => {
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
      form.setValue("city", city, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [city, form])

  useEffect(() => {
    if (state) {
      form.setValue("state", state, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      })
      form.setValue("city", "", {
        shouldDirty: true,
        shouldTouch: true
      })
    }
  }, [form, state])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION)

  return (
    <FormLayout
      id={LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION}
      title="Business Information"
      wrapperClassName={wrapperClassName}
    >
      <h5 className="text-lg font-semibold">Business Information</h5>
      <Separator />
      <Form {...form}>
        <form className="grid grid-cols-3 gap-x-4xl gap-y-2xl">
          <TextInput
            required
            className="col-span-3"
            control={form.control}
            label="Business legal name"
            name="businessLegalName"
            placeholder="i.e: Larry's Latte"
          />
          <TextInput
            required
            className="col-span-3"
            control={form.control}
            label="Business street address line #1"
            name="addressLine1"
            placeholder="i.e: 123 Coffee Lane"
          />{" "}
          <TextInput
            className="col-span-3"
            control={form.control}
            label="Business Street Address Line #2 (Optional)"
            name="addressLine2"
            placeholder="i.e: Suite 321"
          />
          <AutoCompleteStates
            required
            className="col-span-3 lg:col-span-1"
            control={form.control}
            emptyText="No results found"
            label="Business state"
            name="state"
            options={STATE_DATA}
            value={form.getValues("state")}
            onChange={handleChangeState}
          />
          <AutoCompleteCities
            required
            className="col-span-3 lg:col-span-1"
            control={form.control}
            emptyText="No results found"
            label="Business city"
            name="city"
            options={
              STATE_DATA.find((s) => s.name === form.getValues("state"))
                ?.cities ?? []
            }
            value={form.getValues("city")}
            onChange={handleChangeCity}
          />
          <TextInput
            required
            className="col-span-3 lg:col-span-1"
            control={form.control}
            label="Business zip code"
            name="postalCode"
            placeholder="i.e: 97531"
          />
          <RHFMaskInput
            required
            className="col-span-3"
            label="EIN"
            name="businessTin"
            pattern={EIN_PATTERN}
            placeholder="i.e: 12-3456789"
          />
          <TextInput
            className="col-span-3"
            control={form.control}
            inputClassName="pl-16"
            label="Business website"
            name="businessWebsite"
            placeholder="www.larryslatte.com"
            prefix="https://"
            prefixIcon={<p className="text-text-secondary">https://</p>}
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
