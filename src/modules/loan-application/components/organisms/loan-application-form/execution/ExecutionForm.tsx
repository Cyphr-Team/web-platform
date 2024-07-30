import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Control, useForm } from "react-hook-form"
import { TextInput } from "@/shared/organisms/form/TextInput"
import { OptionInput } from "@/shared/organisms/form/OptionInput"
import { SelectInput } from "@/shared/organisms/form/SelectInput"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput"
import {
  getOptionsByField,
  jobTypes,
  LAUNCH_KC_EXECUTION_FIELD_NAMES,
  questions
} from "./constants"
import { MultiCheckboxesInput } from "@/shared/organisms/form/MultiCheckboxesInput"

type FundingSource = {
  sourceType: string
  amount: string
}

interface Founder {
  name: string
  jobType: string
  background: string
  skill: string
}

type FundingSourcesProps = {
  control: Control<ExecutionFormValue>
}
const FundingSources: React.FC<FundingSourcesProps> = ({ control }) => {
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([
    {
      sourceType: "",
      amount: ""
    }
  ])

  const handleAddFundingSource = () => {
    setFundingSources((prev) => [
      ...prev,
      {
        sourceType: "",
        amount: ""
      }
    ])
  }

  const removeFundingSource = (index: number) => () => {
    setFundingSources((prev) => prev.filter((_, ind) => ind !== index))
  }

  return (
    <Card className="flex flex-col gap-2xl p-xl rounded-lg h-fit">
      <h5 className="text-sm font-semibold">
        Select all funding sources that apply and add the amount you have
        received{" "}
      </h5>
      {fundingSources.map((_, ind) => (
        <div className="flex flex-col" key={ind}>
          <div className="flex justify-between">
            <h5 className="font-semibold text-sm">FUNDING SOURCE #{ind + 1}</h5>
            {ind > 0 && (
              <Button
                type="button"
                variant="ghost"
                className="p-4"
                onClick={removeFundingSource(ind)}
              >
                <X className="w-4" />
              </Button>
            )}
          </div>
          <SelectInput
            inputClassName="w-40"
            className="flex items-center justify-between !text-sm"
            options={getOptionsByField(
              LAUNCH_KC_EXECUTION_FIELD_NAMES.FUNDING_SOURCES
            )}
            label="Funding source"
            name={`fundingSources.${ind}.sourceType`}
            control={control}
          />
          <TextInput
            prefixIcon="$"
            className="flex items-center justify-between"
            inputClassName="w-40"
            label="Funding "
            name={`fundingSources.${ind}.amount`}
            control={control}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-min ml-auto border-black gap-2"
        onClick={handleAddFundingSource}
      >
        <Plus className="w-4" />
        Add funding source
      </Button>
    </Card>
  )
}

type FounderProps = {
  control: Control<ExecutionFormValue>
}

const Founders: React.FC<FounderProps> = ({ control }) => {
  const [founders, setFounders] = useState<Founder[]>([
    {
      name: "",
      jobType: "",
      background: "",
      skill: ""
    }
  ])

  const handleAddFounder = () => {
    setFounders((prev) => [
      ...prev,
      {
        name: "",
        jobType: "",
        background: "",
        skill: ""
      }
    ])
  }

  const removeFounder = (index: number) => () => {
    setFounders((prev) => prev.filter((_, ind) => ind !== index))
  }

  return (
    <Card className="flex flex-col gap-2xl p-xl rounded-lg h-fit">
      <h5 className="text-sm font-semibold">
        For each founder, describe the following:
      </h5>
      {founders.map((_, ind) => (
        <div className="flex flex-col gap-2" key={ind}>
          <div className="flex justify-between">
            <h5 className="font-semibold text-sm">FOUNDER #{ind + 1}</h5>
            {ind > 0 && (
              <Button
                type="button"
                variant="ghost"
                className="p-4"
                onClick={removeFounder(ind)}
              >
                <X className="w-4" />
              </Button>
            )}
          </div>
          <TextInput
            className="flex items-center justify-between"
            inputClassName="w-40"
            label="First and last name"
            name={`founders.${ind}.name`}
            control={control}
          />
          <SelectInput
            className="flex items-center justify-between !text-sm"
            label="Full time or part time"
            control={control}
            name={`founders.${ind}.jobType`}
            options={jobTypes}
          />
          <TextAreaInput
            label="What relevant business experience, education, or industry knowledge do they have?"
            control={control}
            name={`founders.${ind}.background`}
          />
          <TextAreaInput
            label="What skills do they have to ensure the success of your company?"
            control={control}
            name={`founders.${ind}.skill`}
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="w-min ml-auto border-black gap-2"
        onClick={handleAddFounder}
      >
        <Plus className="w-4" />
        Add founder
      </Button>
    </Card>
  )
}

export const ExecutionForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { executionForm, dispatchFormAction, loanRequest } =
    useLoanApplicationFormContext()

  const defaultValues = {
    id: executionForm?.id ?? "",
    loanApplicationId:
      executionForm?.loanApplicationId ?? loanRequest?.applicationId ?? "",
    monthlyExpenseRange: executionForm?.monthlyExpenseRange ?? "",
    growthMetric: executionForm?.growthMetric ?? "",
    recentMilestone: executionForm?.recentMilestone ?? "",
    nextMilestone: executionForm?.nextMilestone ?? "",
    greatestChallenge: executionForm?.greatestChallenge ?? "",
    businessModels: executionForm?.businessModels ?? [],
    partnershipTypes: executionForm?.partnershipTypes ?? [],
    businessStage: executionForm?.businessStage ?? "",
    fundingSources: executionForm?.fundingSources ?? [],
    founders: executionForm?.founders ?? []
  }

  const form = useForm<ExecutionFormValue>({
    resolver: zodResolver(executionFormSchema),
    mode: "onBlur",
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

  useEffect(() => {
    if (form.formState.isValidating) {
      const data = form.getValues()
      dispatchFormAction({
        action: FORM_ACTION.SET_DATA,
        key: LOAN_APPLICATION_STEPS.EXECUTION,
        state: data
      })
    }
  }, [form.formState.isValidating, form, dispatchFormAction])

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.EXECUTION)

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
            <h5 className="text-lg font-semibold">Execution</h5>
            <Separator />
            <form className="flex flex-col gap-4xl">
              <SelectInput
                className="flex items-center"
                inputClassName="!max-w-52"
                labelClassName="leading-relaxed mt-2"
                key={LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE}
                label="How much cash does your company go through each month?"
                control={form.control}
                name={LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE}
                options={getOptionsByField(
                  LAUNCH_KC_EXECUTION_FIELD_NAMES.MONTHLY_EXPENSE_RANGE
                )}
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
                label="What areas do you need the most support? (You can select more than 1)"
                control={form.control}
                name={LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL}
                options={getOptionsByField(
                  LAUNCH_KC_EXECUTION_FIELD_NAMES.BUSINESS_MODEL
                )}
              />
              <MultiCheckboxesInput
                key={LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE}
                label="What alliances or partnerships have you entered? (You can select more than 1)"
                control={form.control}
                name={LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE}
                options={getOptionsByField(
                  LAUNCH_KC_EXECUTION_FIELD_NAMES.PARTNERSHIP_TYPE
                )}
              />
              <FundingSources control={form.control} />
              <Founders control={form.control} />
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
