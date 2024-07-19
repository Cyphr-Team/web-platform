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
  cashBurnOptions,
  currentStage,
  partnerships,
  questions,
  supportAreas
} from "./constants"
import { MultiCheckboxesInput } from "@/shared/organisms/form/MultiCheckboxesInput"

type FundingSource = {
  source: string
  amount: string
}

interface Founder {
  name: string
  title: string
  background: string
  skills: string
}

const funding_sources_options = [
  {
    label: "Bank Loans",
    value: "bank_loan"
  },
  {
    label: "Friends and family",
    value: "friends_and_family"
  },
  {
    label: "Venture capital",
    value: "venture_capital"
  },
  {
    label: "Angel investors",
    value: "angel_investors"
  },
  {
    label: "Crowdfunding",
    value: "crowdfunding"
  },
  {
    label: "Debt",
    value: "debt"
  },
  {
    label: "Non-dilutive grant",
    value: "non_dilutive_grant"
  },

  {
    label: "Startup/Pitch Competitions",
    value: "startup_pitch_competitions"
  }
]
type FundingSourcesProps = {
  control: Control<ExecutionFormValue>
}
const FundingSources: React.FC<FundingSourcesProps> = ({ control }) => {
  const [fundingSources, setFundingSources] = useState<FundingSource[]>([
    {
      source: "",
      amount: ""
    }
  ])

  const handleAddFundingSource = () => {
    setFundingSources((prev) => [
      ...prev,
      {
        source: "",
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
            options={funding_sources_options}
            label="Funding Source"
            name={`fundingSources.${ind}.source`}
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
        Funding source
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
      title: "",
      background: "",
      skills: ""
    }
  ])

  const handleAddFounder = () => {
    setFounders((prev) => [
      ...prev,
      {
        name: "",
        title: "",
        background: "",
        skills: ""
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
        <div className="flex flex-col" key={ind}>
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
            label="First and Last Name"
            name={`founders.${ind}.name`}
            control={control}
          />
          <TextInput
            className="flex items-center justify-between"
            inputClassName="w-40"
            label="Full time or part time"
            name={`founders.${ind}.title`}
            control={control}
          />
          <TextAreaInput
            label="What relevant business experience, education, or industry knowledge do they have?"
            control={control}
            name={`founders.${ind}.background`}
          />
          <TextAreaInput
            label="What skills do they have to ensure the success of your company?"
            control={control}
            name={`founders.${ind}.skills`}
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
        Founder
      </Button>
    </Card>
  )
}

export const ExecutionForm = () => {
  const { finishCurrentStep, step } = useLoanApplicationProgressContext()
  const { executionForm, dispatchFormAction } = useLoanApplicationFormContext()

  const defaultValues = {
    id: executionForm?.id ?? "",
    loanApplicationId: executionForm?.loanApplicationId ?? "",
    monthlyExpenseRange: executionForm?.monthlyExpenseRange ?? "",
    growthMetric: executionForm?.growthMetric ?? "",
    recentMilestone: executionForm?.recentMilestone ?? "",
    nextMilestone: executionForm?.nextMilestone ?? "",
    greatestChallenge: executionForm?.greatestChallenge ?? "",
    supportAreas: executionForm?.supportAreas ?? [],
    partnerships: executionForm?.partnerships ?? [],
    currentStage: executionForm?.currentStage ?? "",
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
                inputClassName="w-40"
                key="monthlyExpenseRange"
                label="How much cash does your company go through each month?"
                control={form.control}
                name="monthlyExpenseRange"
                options={cashBurnOptions}
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
                key="currentStage"
                label="Which best describes the current stage of your product or service?"
                control={form.control}
                name="currentStage"
                options={currentStage}
              />
              <MultiCheckboxesInput
                key="supportAreas"
                label="What areas do you need the most support? (You can select more than 1)"
                control={form.control}
                name="supportAreas"
                options={supportAreas}
              />
              <MultiCheckboxesInput
                key="partnerships"
                label="What alliances or partnerships have you entered? (You can select more than 1)"
                control={form.control}
                name="partnerships"
                options={partnerships}
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
