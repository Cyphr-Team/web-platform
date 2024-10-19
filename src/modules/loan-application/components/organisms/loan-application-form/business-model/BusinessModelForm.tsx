import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  businessModelFormSchema,
  type BusinessModelFormValue
} from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { SelectInput } from "@/shared/organisms/form/SelectInput"

import { questions, strategies } from "./constants"
import RHFCurrencyInput from "@/modules/form-template/components/molecules/RHFCurrencyInput.tsx"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"

export function BusinessModelForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { businessModelForm, loanRequest, dispatchFormAction } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () => ({
      id: businessModelForm?.id ?? "",
      loanApplicationId:
        businessModelForm?.loanApplicationId ??
        loanRequest?.applicationId ??
        "",
      description: businessModelForm?.description ?? "",
      annualPayroll: businessModelForm?.annualPayroll, // don't need to set custom value
      scalePlan: businessModelForm?.scalePlan ?? "",
      totalRevenueRange: businessModelForm?.totalRevenueRange ?? "",
      lastMonthRevenueRange: businessModelForm?.lastMonthRevenueRange ?? "",
      lastYearRevenueRange: businessModelForm?.lastYearRevenueRange ?? ""
    }),
    [businessModelForm, loanRequest]
  )

  const form = useForm<BusinessModelFormValue>({
    resolver: zodResolver(businessModelFormSchema),
    mode: "onChange",
    values: defaultValues
  })

  const onSubmit = (data: BusinessModelFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.BUSINESS_MODEL,
      state: {
        ...data
      }
    })
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.BUSINESS_MODEL)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm md:w-full"
      )}
      id={LOAN_APPLICATION_STEPS.BUSINESS_MODEL}
    >
      <h5 className="text-lg font-semibold">Business Model</h5>
      <p className="text-sm text-text-secondary font-normal">
        This data is being collected for the sole purpose of this application.
        It will remain confidential and not be distributed in any way.
      </p>
      <Separator />
      <Form {...form}>
        <form className="flex flex-col gap-4xl">
          {questions.map((q) => (
            <SelectInput
              key={q.field}
              className="flex items-center justify-between"
              control={form.control}
              inputClassName="!max-w-52"
              label={q.question}
              name={q.field as keyof BusinessModelFormValue}
              options={q.options}
            />
          ))}
          <RHFCurrencyInput
            key="annualPayroll"
            className="flex flex-row items-center w-full justify-between"
            label="What is your annual payroll?"
            name="annualPayroll"
            placeholder="i.e: 55,000"
            prefixIcon="$"
            styleProps={{
              messageClassName: "hidden",
              inputClassName: "!max-w-52"
            }}
          />
          <SelectInput
            key="scalePlan"
            control={form.control}
            inputClassName="!max-w-full"
            label="What are your business’ near-term plans to scale?"
            name="scalePlan"
            options={strategies}
          />
          <TextAreaInput
            key="description"
            control={form.control}
            label="How do you, or will you make money?"
            name="description"
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
