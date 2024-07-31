import {
  FieldArrayWithId,
  Form,
  useFieldArray,
  useForm,
  useFormContext,
  useFormState
} from "react-hook-form"
import { ExecutionFormValue } from "@/modules/loan-application/constants/form.ts"
import { useLoanApplicationFormContext } from "@/modules/loan-application/providers"
import { FORM_ACTION } from "@/modules/loan-application/providers/LoanApplicationFormProvider.tsx"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { Card } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Plus, X } from "lucide-react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { SelectInput } from "@/shared/organisms/form/SelectInput.tsx"
import {
  getOptionsByField,
  LAUNCH_KC_EXECUTION_FIELD_NAMES
} from "@/modules/loan-application/components/organisms/loan-application-form/execution/constants.ts"
import { memo } from "react"

type FundingSource = {
  id: string
  sourceType: string
  amount: string
}

export const FundingSourceInput = () => {
  const { control, getValues } = useFormContext<ExecutionFormValue>()
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "fundingSources"
  })
  const { dispatchFormAction } = useLoanApplicationFormContext()

  const handleAddFundingSource = () => {
    append({ id: "", sourceType: "", amount: "" })
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
        Select all funding sources that apply and add the amount you have
        received
      </h5>
      {fields.map((source, index) => (
        <EditFundingSource
          key={source.id}
          onUpdate={update}
          index={index}
          value={source}
          onRemove={onRemove(index)}
          onBlur={onBlur}
        />
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

interface EditFundingSourceProps {
  index: number
  value: FieldArrayWithId<ExecutionFormValue, "fundingSources", "id">
  onUpdate: (index: number, values: FundingSource) => void
  onRemove: VoidFunction
  onBlur: VoidFunction
}

const EditFundingSourceFormSchema = z.object({
  id: z.string(),
  sourceType: z.string().min(1, { message: "This field is required" }),
  amount: z
    .string()
    .min(1, { message: "This field is required" })
    .refine((val) => !isNaN(parseInt(val)), { message: "Invalid number" })
})

const EditFundingSource = memo((props: EditFundingSourceProps) => {
  const { onUpdate, index, value, onRemove, onBlur } = props
  const form = useForm<z.infer<typeof EditFundingSourceFormSchema>>({
    resolver: zodResolver(EditFundingSourceFormSchema),
    mode: "onBlur",
    defaultValues: value
  })

  const handleOnBlur = () => {
    onUpdate(index, form.getValues())
    onBlur()
  }

  // use custom hook to enhance performance
  const formState = useFormState({ control: form.control })

  return (
    <div className="flex flex-col" key={value.id}>
      <div className="flex justify-between">
        <h5 className="font-semibold text-sm">FUNDING SOURCE #{index + 1}</h5>
        {index > 0 && (
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
      <Form {...form}>
        <SelectInput
          inputClassName="w-40"
          className="flex items-center justify-between !text-sm"
          options={getOptionsByField(
            LAUNCH_KC_EXECUTION_FIELD_NAMES.FUNDING_SOURCES
          )}
          label="Funding source"
          name="sourceType"
          control={form.control}
          onBlur={handleOnBlur}
        />
        <FormField
          key="amount"
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel className="text-text-secondary">Funding</FormLabel>
              {!formState.isValid && (
                <p className="text-sm font-medium text-destructive">
                  Invalid Funding
                </p>
              )}
              <FormControl>
                <Input
                  {...field}
                  prefixIcon="$"
                  className="text-base w-40 "
                  onBlur={handleOnBlur}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </Form>
    </div>
  )
})
