import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MM_YYYY_PATTERN } from "@/constants"
import { cn } from "@/lib/utils"
import {
  RHFCurrencyInput,
  RHFMaskInput,
  RHFTextInput
} from "@/modules/form-template/components/molecules"
import { getArrayFieldName } from "@/modules/form-template/components/utils"
import { RHFProvider } from "@/modules/form-template/providers"
import {
  DIRECT_COSTS_DEFAULT_VALUE,
  DirectCostsField,
  directCostsFormSchema,
  DirectCostsFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"

import { useAutoCompleteStepEffect } from "@/modules/loan-application/hooks/useAutoCompleteStepEffect"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import {
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, X } from "lucide-react"
import {
  FieldArrayWithId,
  FieldPath,
  useFieldArray,
  useForm,
  useFormContext
} from "react-hook-form"

export const DirectCostsForm = () => {
  const { directCosts, dispatchFormAction } = useLoanApplicationFormContext()

  const form = useForm<DirectCostsFormValue>({
    resolver: zodResolver(directCostsFormSchema),
    mode: "onBlur",
    defaultValues: directCosts ?? DIRECT_COSTS_DEFAULT_VALUE
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: DirectCostsField.directCosts
  })

  const { finishCurrentStep, step } = useLoanApplicationProgressContext()

  const onSubmit = form.handleSubmit((data) => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.DIRECT_COSTS,
      state: data
    })
    finishCurrentStep()
  })

  const handleAddFounder = () => {
    append({
      directCostName: "",
      directCostDescription: "",
      startDate: "",
      overallRevenue: 0
    })
    onAutoSave()
  }

  const onRemove = (index: number) => () => {
    remove(index)
    onAutoSave()
  }

  const onAutoSave = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.DIRECT_COSTS,
      state: form.getValues()
    })
  }

  useAutoCompleteStepEffect(form, LOAN_APPLICATION_STEPS.DIRECT_COSTS)

  return (
    <Card
      className={cn(
        "flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto col-span-8 mx-6 shadow-none text-sm",
        "md:col-span-6 md:col-start-2 md:mx-0"
      )}
    >
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-semibold">
          Direct Costs (Costs of sales/COGS)
        </h5>
        <p className="text-sm">
          Direct Costs are expenses directly related to creating or delivering a
          product or service. Common direct costs are raw materials to make a
          product, manufacturing supplies, shipping costs, and costs of
          employees or third-party providers who directly contribute to
          production.
        </p>
        <p className="text-sm">
          This section shouldn’t include costs essential to keeping the business
          running, like rent for your office, salaries for your marketing team,
          or the electricity bill. Those are Operating Expenses; we’ll ask for
          those in the next section.
        </p>
      </div>

      <Separator />
      <div className="grid grid-cols-6 w-full gap-5 items-center text-xs font-medium">
        <p className="row-start-1 col-start-1 col-end-3 text-[#252828]">
          Direct cost name
        </p>
        <p className="row-start-1 col-start-3 col-end-5 text-[#252828]">
          Cost start date
        </p>
        <p className="row-start-1 col-start-5 col-end-7 text-[#252828]">
          Estimated % of overall revenue
        </p>
      </div>
      <RHFProvider methods={form} onSubmit={onSubmit}>
        <div className="flex flex-col gap-6 mb-5">
          {fields.map((founder, index) => (
            <DirectCosts
              key={founder.id}
              index={index}
              value={founder}
              onRemove={onRemove(index)}
            />
          ))}
        </div>

        <div className="flex">
          <Button
            type="button"
            variant="outline"
            className="w-min ml-auto border-black gap-2"
            onClick={handleAddFounder}
          >
            <Plus className="w-4" />
            Add direct cost
          </Button>
        </div>

        {!isReviewApplicationStep(step) && (
          <div className="flex flex-col gap-2xl mt-4">
            <Button disabled={!form.formState.isValid}>Next</Button>
          </div>
        )}
      </RHFProvider>
    </Card>
  )
}

interface DirectCostsProps {
  index: number
  value: FieldArrayWithId<DirectCostsFormValue["directCosts"][number]>
  onRemove: VoidFunction
}

const DirectCosts = (props: DirectCostsProps) => {
  const { index, value, onRemove } = props
  const form = useFormContext<DirectCostsFormValue>()

  // Apply the requirement, we can remove only when the items > 1
  const isRemovable = form.getValues(DirectCostsField.directCosts).length > 1

  return (
    <div className="flex gap-3" key={value.id}>
      <div className="grid grid-cols-6 w-full gap-5 items-center">
        <div className="row-start-1 col-start-1 col-end-3 flex gap-1 flex-col">
          <RHFTextInput
            label=""
            className="font-medium text-sm"
            placeholder="Direct cost name "
            styleProps={{
              inputClassName: "h-6 text-sm max-w-52 -mt-1.5"
            }}
            name={getArrayFieldName<
              DirectCostsField,
              FieldPath<DirectCostsFormValue>
            >(DirectCostsField.directCostsName, index)}
            isToggleView
            isHideErrorMessage
            autoFocus
          />
          <RHFTextInput
            label=""
            className="mt-auto text-xs text-text-secondary"
            styleProps={{ inputClassName: "h-6 text-xs max-w-32 -mb-1.5" }}
            placeholder="Add description"
            name={getArrayFieldName<
              DirectCostsField,
              FieldPath<DirectCostsFormValue>
            >(DirectCostsField.directCostsDescription, index)}
            isToggleView
            isHideErrorMessage
          />
        </div>
        <RHFMaskInput
          label=""
          pattern={MM_YYYY_PATTERN}
          className="row-start-1 col-start-3 col-end-5 mt-0"
          styleProps={{ inputClassName: "text-sm" }}
          placeholder="MM/YYYY"
          name={getArrayFieldName<
            DirectCostsField,
            FieldPath<DirectCostsFormValue>
          >(DirectCostsField.directCostsStartDate, index)}
          isHideErrorMessage
        />
        <RHFCurrencyInput
          label=""
          placeholder="Overall revenue"
          className="row-start-1 col-start-5 col-end-7 mt-0"
          styleProps={{ inputClassName: "text-sm" }}
          suffixIcon={<span>%</span>}
          name={getArrayFieldName<
            DirectCostsField,
            FieldPath<DirectCostsFormValue>
          >(DirectCostsField.directCostsOverallRevenue, index)}
          isHideErrorMessage
        />
      </div>

      {isRemovable && (
        <div className="flex justify-between items-center">
          <Button
            tabIndex={-1}
            type="button"
            variant="ghost"
            className="p-0 py-0 h-auto"
            onClick={onRemove}
          >
            <X className="w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
