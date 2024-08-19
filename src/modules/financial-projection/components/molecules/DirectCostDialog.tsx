import { useCallback } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx"
import {
  Block,
  ComponentMapper,
  FieldType
} from "@/modules/form-template/components/templates/FormTemplate.tsx"
import * as z from "zod"
import { cn } from "@/lib/utils.ts"
import RHFProvider from "@/modules/form-template/providers/RHFProvider.tsx"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { DirectCost } from "@/modules/financial-projection/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { generateMonthsList } from "@/utils/time-range.utils.ts"

const enum FormField {
  ID = "id",
  NAME = "name",
  STARTING_MONTH = "startingMonth",
  PERCENTAGE_COST = "percentageCost"
}

const schema = z.object({
  [FormField.ID]: z.string().optional(),
  [FormField.NAME]: z.string(),
  [FormField.STARTING_MONTH]: z.string(),
  [FormField.PERCENTAGE_COST]: z.coerce.number().gt(0).lte(100)
})

export interface DirectCostDialogProps {
  open: boolean
  title: string
  confirmText: string
  onOpenChange: (open: boolean) => void
  onConfirm: SubmitHandler<FieldValues>
  onAbort: VoidFunction
  defaultValues?: DirectCost
}

const DirectCostDialog = (props: DirectCostDialogProps) => {
  const {
    open,
    title,
    confirmText,
    onOpenChange,
    onConfirm,
    defaultValues,
    onAbort
  } = props

  const form = useForm<FieldValues>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    values: defaultValues ?? {}
  })

  const handleAbort = useCallback(() => {
    form.reset()
    onAbort()
  }, [form, onAbort])

  const onSubmit = (formValues: FieldValues) => {
    onConfirm(formValues)
    form.reset()
  }

  const blocks: Block[] = [
    {
      type: FieldType.TEXT,
      name: FormField.NAME,
      props: {
        label: "Name for Direct Cost",
        required: true
      }
    },
    {
      type: FieldType.SELECT,
      name: FormField.STARTING_MONTH,
      props: {
        label: "When will this Direct Cost start?",
        className: "col-span-12",
        // TODO: fix the date logic after we have BE
        options: generateMonthsList(2025, 2027),
        required: true,
        defaultValue: defaultValues?.startingMonth
      }
    },
    {
      type: FieldType.NUMBER,
      name: FormField.PERCENTAGE_COST,
      props: {
        label: "What percentage of Overall Revenue would this cost take?",
        className:
          "col-span-12 flex flex-row gap-2xl items-center justify-between",
        styleProps: {
          labelClassName: "w-full"
        },
        suffixIcon: <span className="text-text-tertiary">%</span>,
        direction: "row"
      }
    }
  ]

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-[40rem] max-w-[40rem]">
        <RHFProvider methods={form} onSubmit={form.handleSubmit(onSubmit)}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl mb-2">
              {title}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className={cn("grid grid-cols-12 gap-4")}>
            {blocks.map(({ type, props, name }) => {
              const Component = ComponentMapper[type]
              return (
                <Component
                  key={name}
                  className="col-span-12"
                  name={name}
                  {...props}
                />
              )
            })}
          </div>
          <AlertDialogFooter className="mt-8">
            <AlertDialogCancel type="reset" onClick={handleAbort}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="w-20"
              disabled={!form.formState.isValid}
            >
              {confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </RHFProvider>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DirectCostDialog
