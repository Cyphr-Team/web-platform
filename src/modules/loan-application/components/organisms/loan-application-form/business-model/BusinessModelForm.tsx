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
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { SelectInput } from "@/shared/organisms/form/SelectInput"

import { questions, strategies } from "./constants"

export const BusinessModelForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { businessModelForm, dispatchFormAction } =
    useLoanApplicationFormContext()

  const defaultValues = {
    id: businessModelForm?.id ?? "",
    howDoYouMakeMoney: businessModelForm?.howDoYouMakeMoney ?? "",
    nearTermGrowthStrategy: businessModelForm?.nearTermGrowthStrategy ?? "",
    revenueToDate: businessModelForm?.revenueToDate ?? "",
    revenueLastMonth: businessModelForm?.revenueLastMonth ?? "",
    revenueLastYear: businessModelForm?.revenueLastYear ?? ""
  }

  const form = useForm<BusinessModelFormValue>({
    resolver: zodResolver(businessModelFormSchema),
    mode: "onChange",
    defaultValues
  })

  const onSubmit = (data: BusinessModelFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.BUSINESS_MODEL,
      state: data
    })
    finishCurrentStep()
  }

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.BUSINESS_MODEL,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.BUSINESS_MODEL)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm md:w-full"
      )}
      id={LOAN_APPLICATION_STEPS.BUSINESS_MODEL}
    >
      <h5 className="text-lg font-semibold">Business Model</h5>
      <Separator />
      <Form {...form}>
        <form className="flex flex-col gap-4xl">
          {questions.map((q) => (
            <SelectInput
              className="flex items-center"
              key={q.field}
              label={q.question}
              control={form.control}
              name={q.field as keyof BusinessModelFormValue}
              options={q.options}
            />
          ))}
          <SelectInput
            label="What are your business’ near-term plans to scale?"
            control={form.control}
            name="nearTermGrowthStrategy"
            options={strategies}
            inputClassName="!max-w-full"
          />
          <TextAreaInput
            key="howDoYouMakeMoney"
            label="How do you, or will you make money?"
            control={form.control}
            name="howDoYouMakeMoney"
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
