import {
  FieldArrayWithId,
  useFieldArray,
  useFormContext
} from "react-hook-form"
import { ExecutionFormValue } from "@/modules/loan-application/constants/form.ts"
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

export const FoundersInput = () => {
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
    <Card className="flex flex-col gap-2xl p-xl rounded-lg h-fit">
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

interface EditFounderProps {
  index: number
  value: FieldArrayWithId<ExecutionFormValue, "founders">
  onRemove: VoidFunction
}

const EditFounder = memo((props: EditFounderProps) => {
  const { index, value, onRemove } = props
  const form = useFormContext<ExecutionFormValue>()

  return (
    <div className="flex flex-col gap-2" key={value.id}>
      <div className="flex justify-between items-center">
        <h5 className="font-semibold text-sm">FOUNDER #{index + 1}</h5>
        {form.getValues("founders").length > 1 && (
          <Button
            type="button"
            variant="ghost"
            className="p-4"
            onClick={onRemove}
          >
            <X className="w-4" />
          </Button>
        )}
      </div>
      <TextInput
        className="flex items-center justify-between"
        inputClassName="w-56 md:max-w-56 xl:max-w-56 xl:w-56"
        label="First and last name"
        formMessageClassName="hidden"
        control={form.control}
        {...form.register(`founders.${index}.name` as const)}
      />
      <SelectInput
        className="flex items-center justify-between !text-sm"
        label="Full time or part time"
        inputClassName="w-56 md:max-w-56 xl:max-w-56 xl:w-56"
        control={form.control}
        options={jobTypes}
        {...form.register(`founders.${index}.jobType` as const)}
      />
      <TextAreaInput
        label="What relevant business experience, education, or industry knowledge do they have?"
        control={form.control}
        {...form.register(`founders.${index}.background` as const)}
      />
      <TextAreaInput
        label="What skills do they have to ensure the success of your company?"
        control={form.control}
        {...form.register(`founders.${index}.skill` as const)}
      />
    </div>
  )
})
