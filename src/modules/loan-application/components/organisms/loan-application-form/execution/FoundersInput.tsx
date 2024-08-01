import {
  FieldArrayWithId,
  useFieldArray,
  useForm,
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
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

interface Founder {
  id: string
  name: string
  jobType: string
  background: string
  skill: string
}

export const FoundersInput = () => {
  const { control, getValues } = useFormContext<ExecutionFormValue>()
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "founders"
  })
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const handleAddFounder = () => {
    append({ id: "", name: "", jobType: "", background: "", skill: "" })
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
          onUpdate={update}
          onRemove={onRemove(index)}
          onBlur={onBlur}
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

const EditFounderFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "This field is required" }),
  jobType: z.string().min(1, { message: "This field is required" }),
  background: z.string().min(1, { message: "This field is required" }),
  skill: z.string().min(1, { message: "This field is required" })
})

interface EditFounderProps {
  index: number
  value: FieldArrayWithId<ExecutionFormValue, "founders", "id">
  onUpdate: (index: number, values: Founder) => void
  onRemove: VoidFunction
  onBlur: VoidFunction
}

const EditFounder = (props: EditFounderProps) => {
  const { onUpdate, index, value, onRemove, onBlur } = props
  const outerForm = useFormContext<ExecutionFormValue>()
  const { control, getValues } = useForm<z.infer<typeof EditFounderFormSchema>>(
    {
      resolver: zodResolver(EditFounderFormSchema),
      mode: "onBlur",
      defaultValues: value
    }
  )

  const handleOnblur = () => {
    onUpdate(index, getValues())
    onBlur()
  }

  return (
    <div className="flex flex-col gap-2" key={value.id}>
      <div className="flex justify-between items-center">
        <h5 className="font-semibold text-sm">FOUNDER #{index + 1}</h5>
        {outerForm.getValues("founders").length > 1 && (
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
        inputClassName="w-56 md:max-w-40 xl:max-w-56 xl:w-56"
        label="First and last name"
        name="name"
        control={control}
        onBlur={handleOnblur}
      />
      <SelectInput
        className="flex items-center justify-between !text-sm"
        label="Full time or part time"
        inputClassName="w-56 md:max-w-40 xl:max-w-56 xl:w-56"
        control={control}
        name="jobType"
        options={jobTypes}
        onBlur={handleOnblur}
      />
      <TextAreaInput
        label="What relevant business experience, education, or industry knowledge do they have?"
        control={control}
        name="background"
        onBlur={handleOnblur}
      />
      <TextAreaInput
        label="What skills do they have to ensure the success of your company?"
        control={control}
        name="skill"
        onBlur={handleOnblur}
      />
    </div>
  )
}
