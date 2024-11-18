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
import { TextInput } from "@/shared/organisms/form/TextInput.tsx"
import { SelectInput } from "@/shared/organisms/form/SelectInput.tsx"
import { jobTypes } from "@/modules/loan-application/components/organisms/loan-application-form/execution/constants.ts"
import { TextAreaInput } from "@/shared/organisms/form/TextAreaInput.tsx"
import { memo } from "react"

export function FoundersInput() {
  const { control, getValues } = useFormContext<ExecutionFormValue>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "founders"
  })
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const handleAddFounder = () => {
    append({ name: "", jobType: "", background: "", skill: "" })
  }

  const onBlur = () => {
    dispatchFormAction({
      action: FORM_ACTION.SET_DATA,
      key: LOAN_APPLICATION_STEPS.EXECUTION,
      state: getValues()
    })
  }

  const onRemove = (index: number) => () => {
    remove(index)
    onBlur()
  }

  return (
    <Card className="flex h-fit flex-col gap-2xl rounded-lg p-xl">
      <h5 className="text-sm font-semibold">
        For each founder, describe the following:
      </h5>
      {fields.map((founder, index) => (
        <EditFounder
          key={founder.id}
          index={index}
          value={founder}
          onRemove={onRemove(index)}
        />
      ))}
      <Button
        className="ml-auto w-min gap-2 border-black"
        type="button"
        variant="outline"
        onClick={handleAddFounder}
      >
        <Plus className="w-4" />
        Add founder
      </Button>
    </Card>
  )
}

interface EditFounderProps {
  index: number
  value: FieldArrayWithId<ExecutionFormValue, "founders">
  onRemove: VoidFunction
}

const EditFounder = memo((props: EditFounderProps) => {
  const { index, value, onRemove } = props
  const form = useFormContext<ExecutionFormValue>()

  return (
    <div key={value.id} className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-semibold">FOUNDER #{index + 1}</h5>
        {form.getValues("founders").length > 1 && (
          <Button
            className="p-4"
            type="button"
            variant="ghost"
            onClick={onRemove}
          >
            <X className="w-4" />
          </Button>
        )}
      </div>
      <TextInput
        className="flex items-center justify-between"
        control={form.control}
        formMessageClassName="hidden"
        inputClassName="w-56 md:max-w-56 xl:w-56 xl:max-w-56"
        label="First and last name"
        {...form.register(`founders.${index}.name` as const)}
      />
      <SelectInput
        className="flex items-center justify-between !text-sm"
        control={form.control}
        inputClassName="w-56 md:max-w-56 xl:w-56 xl:max-w-56"
        label="Full-time or part-time"
        options={jobTypes}
        {...form.register(`founders.${index}.jobType` as const)}
      />
      <TextAreaInput
        control={form.control}
        label="What relevant business experience, education, or industry knowledge do they have?"
        {...form.register(`founders.${index}.background` as const)}
      />
      <TextAreaInput
        control={form.control}
        label="What skills do they have to ensure the success of your company?"
        {...form.register(`founders.${index}.skill` as const)}
      />
    </div>
  )
})
