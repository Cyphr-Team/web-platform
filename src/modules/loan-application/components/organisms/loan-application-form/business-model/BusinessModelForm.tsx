import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  businessModelFormSchema,
  BusinessModelFormValue
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
import { ArrowRight } from "lucide-react"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { SelectInput } from "@/shared/organisms/form/SelectInput"

import { questions, strategies } from "./constants"
import { TextInput } from "@/shared/organisms/form/TextInput.tsx"

export const BusinessModelForm = () => {
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
      annualPayroll: businessModelForm?.annualPayroll ?? "",
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
      state: data
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
              inputClassName="!max-w-52"
              className="flex items-center justify-between"
              key={q.field}
              label={q.question}
              control={form.control}
              name={q.field as keyof BusinessModelFormValue}
              options={q.options}
            />
          ))}
          <TextInput
            prefixIcon="$"
            key="annualPayroll"
            name="annualPayroll"
            control={form.control}
            inputClassName="!max-w-52"
            className="flex flex-row items-center w-full justify-between"
            label="What is your annual payroll?"
            placeholder="i.e: 55.00"
            formMessageClassName="hidden"
          />
          <SelectInput
            key="scalePlan"
            label="What are your business’ near-term plans to scale?"
            control={form.control}
            name="scalePlan"
            options={strategies}
            inputClassName="!max-w-full"
          />
          <TextAreaInput
            key="description"
            label="How do you, or will you make money?"
            control={form.control}
            name="description"
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
