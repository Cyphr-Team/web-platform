import { FormControl, FormField, FormItem } from "@/components/ui/form.tsx"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { type CheckboxProps, type CheckedState } from "@radix-ui/react-checkbox"
import { memo } from "react"
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useFormContext
} from "react-hook-form"
import { cn } from "@/lib/utils.ts"

export interface RHFCheckboxProps<T extends FieldValues> {
  name: FieldPath<T>
  label: string
  control?: Control<T>
  className?: string
  checkboxProps?: CheckboxProps
  styleProps?: {
    checkboxClassName?: string
    labelClassName?: string
  }
}

function RHFCheckbox<T extends FieldValues>(props: RHFCheckboxProps<T>) {
  const { control: defaultControl } = useFormContext<T>()
  const {
    name,
    label,
    checkboxProps,
    className,
    control,
    styleProps = {}
  } = props
  const { checkboxClassName, labelClassName } = styleProps

  return (
    <FormField
      control={control ?? defaultControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div
              className={cn(
                "mt-1 flex items-center gap-2 space-x-2 space-y-0",
                className
              )}
            >
              <Checkbox
                checked={field.value as CheckedState}
                onCheckedChange={field.onChange}
                {...checkboxProps}
                className={checkboxClassName}
                id={name}
              />
              <label
                className={cn(
                  "cursor-pointer select-none text-sm font-normal text-text-secondary",
                  labelClassName
                )}
                htmlFor={name}
              >
                {label}
              </label>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default memo(RHFCheckbox)
