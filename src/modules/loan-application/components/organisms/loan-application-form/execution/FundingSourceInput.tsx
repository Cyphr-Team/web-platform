import {
  type FieldArrayWithId,
  useFieldArray,
  useFormContext
} from "react-hook-form"
import { type ExecutionFormValue } from "@/modules/loan-application/constants/form.ts"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Plus, X } from "lucide-react"
import { SelectInput } from "@/shared/organisms/form/SelectInput.tsx"
import {
  getOptionsByField,
  LAUNCH_KC_EXECUTION_FIELD_NAMES
} from "@/modules/loan-application/components/organisms/loan-application-form/execution/constants.ts"
import { memo, useCallback } from "react"
import { RHFMaskInput } from "@/modules/form-template/components/molecules"

export function FundingSourceInput() {
  const { control, getValues } = useFormContext<ExecutionFormValue>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fundingSources"
  })
  const { dispatchFormAction } = useLoanApplicationFormContext()
  const handleAddFundingSource = () => {
    append({ sourceType: "", amount: "" })
  }

  const onBlur = useCallback(() => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.EXECUTION,
      state: getValues()
    })
  }, [dispatchFormAction, getValues])

  const onRemove = useCallback(
    (index: number) => () => {
      remove(index)
      onBlur()
    },
    [onBlur, remove]
  )

  return (
    <Card className="flex h-fit flex-col gap-2xl rounded-lg p-xl">
      <h5 className="text-sm font-semibold">
        Select all funding sources that apply and add the amount you have
        received
      </h5>
      {fields.map((source, index) => (
        <EditFundingSource
          key={source.id}
          index={index}
          value={source}
          onRemove={onRemove(index)}
        />
      ))}
      <Button
        className="ml-auto w-min gap-2 border-black"
        type="button"
        variant="outline"
        onClick={handleAddFundingSource}
      >
        <Plus className="w-4" />
        Add funding source
      </Button>
    </Card>
  )
}

interface EditFundingSourceProps {
  index: number
  value: FieldArrayWithId<ExecutionFormValue, "fundingSources">
  onRemove: VoidFunction
}

const EditFundingSource = memo((props: EditFundingSourceProps) => {
  const { index, value, onRemove } = props
  const form = useFormContext<ExecutionFormValue>()

  const handleRemove = useCallback(() => {
    onRemove()
  }, [onRemove])

  return (
    <div key={value.id} className="flex flex-col">
      <div className="flex items-center justify-between">
        <h5 className="text-center align-middle text-sm font-semibold">
          FUNDING SOURCE #{index + 1}
        </h5>
        {form.getValues("fundingSources").length > 1 && (
          <Button
            className="p-4"
            type="button"
            variant="ghost"
            onClick={handleRemove}
          >
            <X className="w-4" />
          </Button>
        )}
      </div>
      <SelectInput
        className="flex flex-row items-center justify-between !text-sm  "
        control={form.control}
        inputClassName="w-56 md:max-w-56 xl:max-w-56"
        label="Funding source"
        options={getOptionsByField(
          LAUNCH_KC_EXECUTION_FIELD_NAMES.FUNDING_SOURCES
        )}
        {...form.register(`fundingSources.${index}.sourceType` as const)}
      />
      <RHFMaskInput
        isRowDirection
        className="mt-4 flex w-full flex-row items-center justify-between"
        label="Funding"
        pattern={NUMBER_PATTERN}
        styleProps={{ inputClassName: "w-56 md:max-w-56 xl:max-w-56 xl:w-56" }}
        {...form.register(`fundingSources.${index}.amount` as const)}
      />
    </div>
  )
})

const NUMBER_PATTERN = "000000000000000000000000000000"
