import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import {
  marketOpportunityFormSchema,
  type MarketOpportunityFormValue
} from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/utils/useAutoCompleteStepEffect.ts"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { questions } from "./contants"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export function MarketOpportunityForm() {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { marketOpportunityForm, dispatchFormAction, loanRequest } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () => ({
      id: marketOpportunityForm?.id ?? "",
      loanApplicationId:
        marketOpportunityForm?.loanApplicationId ??
        loanRequest?.applicationId ??
        "",
      marketTarget: marketOpportunityForm?.marketTarget ?? "",
      competitor: marketOpportunityForm?.competitor ?? "",
      potentialCustomer: marketOpportunityForm?.potentialCustomer ?? ""
    }),
    [marketOpportunityForm, loanRequest]
  )

  const form = useForm<MarketOpportunityFormValue>({
    resolver: zodResolver(marketOpportunityFormSchema),
    mode: "onBlur",
    values: defaultValues
  })

  const onSubmit = (data: MarketOpportunityFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY,
      state: data
    })
    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()

      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.MARKET_OPPORTUNITY)

  return (
    <FormLayout title="Market Opportunity">
      <Form {...form}>
        <h5 className="text-lg font-semibold">Market Opportunity</h5>
        <Separator />
        <form className="flex flex-col gap-4xl">
          {questions.map((q) => (
            <TextAreaInput
              key={q.field}
              control={form.control}
              label={q.question}
              name={q.field as keyof MarketOpportunityFormValue}
            />
          ))}
        </form>

        {!isReviewApplicationStep(step) && (
          <FormSubmitButton
            isDisabled={!form.formState.isValid}
            onSubmit={form.handleSubmit(onSubmit)}
          />
        )}
      </Form>
    </FormLayout>
  )
}
