import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  marketOpportunityFormSchema,
  MarketOpportunityFormValue
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
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { questions } from "./contants"

export const MarketOpportunityForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { marketOpportunityForm, dispatchFormAction, loanRequest } =
    useLoanApplicationFormContext()

  const defaultValues = {
    id: marketOpportunityForm?.id ?? "",
    loanApplicationId:
      marketOpportunityForm?.loanApplicationId ??
      loanRequest.applicationId ??
      "",
    marketTarget: marketOpportunityForm?.marketTarget ?? "",
    competitor: marketOpportunityForm?.competitor ?? "",
    potentialCustomer: marketOpportunityForm?.potentialCustomer ?? ""
  }
  const form = useForm<MarketOpportunityFormValue>({
    resolver: zodResolver(marketOpportunityFormSchema),
    mode: "onBlur",
    defaultValues
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
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit">
            <h5 className="text-lg font-semibold">Market Opportunity</h5>
            <Separator />
            <form className="flex flex-col gap-4xl">
              {questions.map((q) => (
                <TextAreaInput
                  key={q.field}
                  label={q.question}
                  control={form.control}
                  name={q.field as keyof MarketOpportunityFormValue}
                />
              ))}
            </form>
          </Card>

          {!isReviewApplicationStep(step) && (
            <Button
              disabled={!form.formState.isValid}
              onClick={form.handleSubmit(onSubmit)}
            >
              Next <ArrowRight className="ml-1 w-4" />
            </Button>
          )}
        </Form>
      </div>
    </div>
  )
}
