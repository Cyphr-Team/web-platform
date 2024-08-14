import { FormControl, FormField, FormItem } from "@/components/ui/form.tsx"
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { CheckboxProps, CheckedState } from "@radix-ui/react-checkbox"
import { memo } from "react"
import {
  Control,
  FieldPath,
  FieldValues,
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

const RHFCheckbox = <T extends FieldValues>(props: RHFCheckboxProps<T>) => {
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
                "flex gap-2 mt-1 items-center space-x-2 space-y-0",
                className
              )}
            >
              <Checkbox
                checked={field.value as CheckedState}
                onCheckedChange={field.onChange}
                {...checkboxProps}
                className={checkboxClassName}
              />
              <p
                className={cn(
                  "text-sm text-text-secondary font-normal",
                  labelClassName
                )}
              >
                {label}
              </p>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default memo(RHFCheckbox)
