import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { FoundersInput } from "@/modules/loan-application/components/organisms/loan-application-form/execution/FoundersInput.tsx"
import { FundingSourceInput } from "@/modules/loan-application/components/organisms/loan-application-form/execution/FundingSourceInput.tsx"
import {
  executionFormSchema,
  ExecutionFormValue
} from "@/modules/loan-application/constants/form"
import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { MultiCheckboxesInput } from "@/shared/organisms/form/MultiCheckboxesInput"
import { OptionInput } from "@/shared/organisms/form/OptionInput"
import { SelectInput } from "@/shared/organisms/form/SelectInput"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import {
  getOptionsByField,
  LAUNCH_KC_EXECUTION_FIELD_NAMES,
  LENGTH_OF_NEW_OPTIONS,
  monthlyExpenseRangeOptions,
  questions
} from "./constants"
import { isEnableExecutionFormNewMonthlyExpense } from "@/utils/feature-flag.utils.ts"
import { useMemo } from "react"

export const ExecutionForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { executionForm, dispatchFormAction, loanRequest } =
    useLoanApplicationFormContext()

  const defaultValues = useMemo(
    () => ({
      id: executionForm?.id ?? "",
      loanApplicationId:
        executionForm?.loanApplicationId ?? loanRequest?.applicationId ?? "",
      monthlyExpenseRange: executionForm?.monthlyExpenseRange ?? "",
      growthMetric: executionForm?.growthMetric ?? "",
      recentMilestone: executionForm?.recentMilestone ?? "",
      nextMilestone: executionForm?.nextMilestone ?? "",
      greatestChallenge: executionForm?.greatestChallenge ?? "",
      partnershipTypes: executionForm?.partnershipTypes ?? [],
      businessStage: executionForm?.businessStage ?? "",
      businessModels: executionForm?.businessModels ?? [],
      businessModelsOtherText: executionForm?.businessModelsOtherText ?? "",
      fundingSources: executionForm?.fundingSources ?? [
        {
          sourceType: "",
          amount: ""
        }
      ],
      founders: executionForm?.founders ?? [
        {
          name: "",
          jobType: "",
          background: "",
          skill: ""
        }
      ]
    }),
    [executionForm, loanRequest]
  )

  const form = useForm<ExecutionFormValue>({
    resolver: zodResolver(executionFormSchema),
    mode: "onBlur",
    // values: defaultValues
    defaultValues
  })

  const onSubmit = (data: ExecutionFormValue) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.EXECUTION,
      state: data
    })
    finishCurrentStep()
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.EXECUTION)

  const monthlyExpenseOptions = isEnableExecutionFormNewMonthlyExpense()
    ? monthlyExpenseRangeOptions.slice(0, LENGTH_OF_NEW_OPTIONS)
    : monthlyExpenseRangeOptions.slice(LENGTH_OF_NEW_OPTIONS)

  return (
    <div
      className={cn(
        "flex flex-col gap-3xl overflow-auto col-span-8 mx-6",
        "md:col-span-6 md:col-start-2 md:mx-auto max-w-screen-sm"
      )}
    >
      <div className="flex flex-col gap-3xl overflow-auto">
        <Form {...form}>
          <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit shadow-none">
            <h5 className="text-lg font-semibold">Execution</h5>
            <Separator />
            <form className="flex flex-col gap-4xl">
              <SelectInput
                className="flex items-center"
                inputClassName="!max-w-52"
                labelClassName="leading-relaxed mt-2 pt-2"
                key={LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE}
                label="How much cash does your company go through each month?"
                control={form.control}
                name={LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE}
                options={monthlyExpenseOptions}
              />
              {questions.map((q) => (
                <TextAreaInput
                  key={q.field}
                  label={q.question}
                  control={form.control}
                  name={q.field as keyof ExecutionFormValue}
                />
              ))}
              <OptionInput
                key="businessStage"
                label="Which best describes the current stage of your product or service?"
                control={form.control}
                name="businessStage"
                options={getOptionsByField(
                  LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_STAGE
                )}
              />
              <MultiCheckboxesInput
                key={LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL}
                label={
                  <span>
                    What areas do you need the most support?
                    <span className="font-normal italic">
                      &nbsp;(You can select more than 1)
                    </span>
                  </span>
                }
                control={form.control}
                name={LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL}
                options={getOptionsByField(
                  LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL
                )}
              />
              <MultiCheckboxesInput
                key={LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE}
                label={
                  <span>
                    What alliances or partnerships have you entered?
                    <span className="font-normal italic">
                      &nbsp;(You can select more than 1)
                    </span>
                  </span>
                }
                control={form.control}
                name={LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE}
                options={getOptionsByField(
                  LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE
                )}
              />
              <FundingSourceInput />
              <FoundersInput />
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
