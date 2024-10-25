import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { FoundersInput } from "@/modules/loan-application/components/organisms/loan-application-form/execution/FoundersInput.tsx"
import { FundingSourceInput } from "@/modules/loan-application/components/organisms/loan-application-form/execution/FundingSourceInput.tsx"
import {
  executionFormSchema,
  type ExecutionFormValue
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
import { useForm } from "react-hook-form"
import {
  getOptionsByField,
  LAUNCH_KC_EXECUTION_FIELD_NAMES,
  monthlyExpenseRangeOptions,
  questions
} from "./constants"
import { useMemo } from "react"
import { FormSubmitButton } from "../../../atoms/FormSubmitButton"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"

export function ExecutionForm() {
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

  return (
    <FormLayout>
      <Form {...form}>
        <h5 className="text-lg font-semibold">Execution</h5>
        <Separator />
        <form className="flex flex-col gap-4xl">
          <SelectInput
            key={LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE}
            className="flex items-center"
            control={form.control}
            inputClassName="!max-w-52"
            label="How much cash does your company go through each month?"
            labelClassName="leading-relaxed mt-2 pt-2"
            name={LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE}
            options={monthlyExpenseRangeOptions}
          />
          {questions.map((q) => (
            <TextAreaInput
              key={q.field}
              control={form.control}
              label={q.question}
              name={q.field as keyof ExecutionFormValue}
            />
          ))}
          <OptionInput
            key="businessStage"
            control={form.control}
            label="Which best describes the current stage of your product or service?"
            name="businessStage"
            options={getOptionsByField(
              LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_STAGE
            )}
          />
          <MultiCheckboxesInput
            key={LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL}
            control={form.control}
            label={
              <span>
                What areas do you need the most support?
                <span className="font-normal italic">
                  &nbsp;(You can select more than 1)
                </span>
              </span>
            }
            name={LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL}
            options={getOptionsByField(
              LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL
            )}
          />
          <MultiCheckboxesInput
            key={LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE}
            control={form.control}
            label={
              <span>
                What alliances or partnerships have you entered?
                <span className="font-normal italic">
                  &nbsp;(You can select more than 1)
                </span>
              </span>
            }
            name={LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE}
            options={getOptionsByField(
              LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE
            )}
          />
          <FundingSourceInput />
          <FoundersInput />
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
