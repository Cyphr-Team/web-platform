import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext
} from "react-hook-form"
import { memo, ReactNode } from "react"
import { cn } from "@/lib/utils.ts"
import { Input } from "@/components/ui/input.tsx"

export interface RHFNumberInputProps<T extends FieldValues> {
  name: FieldPath<T>
  label: string

  placeholder?: string
  subtitle?: string
  required?: boolean
  className?: string
  suffixIcon?: ReactNode
  isRowDirection?: boolean
  isHideErrorMessage?: boolean
  styleProps?: {
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
  }
}

/**
 * RHFNumberInput: React Hook Form MaskInput
 * A wrapper for MaskInput to quick setup and reduce complexity.
 *
 * MUST USE THIS INSIDE A FORM OR ELSE IT WILL CRASH
 * */
const RHFNumberInput = <T extends FieldValues>(
  props: RHFNumberInputProps<T>
) => {
  const { control } = useFormContext()
  const {
    name,
    label,
    placeholder,
    className,
    styleProps = {},
    required,
    isRowDirection,
    isHideErrorMessage,
    subtitle,
    suffixIcon
  } = props

  const { inputClassName, labelClassName, messageClassName } = styleProps

  return (
    <FormField
      control={control as Control<T>}
      name={name}
      render={({ field }) => {
        const parsedValue = !isNaN(parseFloat(field.value))
          ? parseFloat(field.value)
          : field.value
        const value = parsedValue !== 0 ? parsedValue : undefined

        return (
          <FormItem
            className={cn(
              className,
              isRowDirection ? "flex justify-between items-center" : null
            )}
          >
            <FormLabel className={cn("text-text-secondary", labelClassName)}>
              <div className="flex flex-col">
                <label>
                  {label}
                  {required && <RequiredSymbol />}
                  {subtitle && (
                    <p className="mt-2 text-text-tertiary font-medium">
                      {subtitle}
                    </p>
                  )}
                </label>
                {isRowDirection && !isHideErrorMessage && <FormMessage />}
              </div>
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                {...control}
                suffixIcon={suffixIcon}
                className={cn("no-arrows", inputClassName)}
                placeholder={placeholder}
                value={value}
              />
            </FormControl>
            {!isRowDirection && !isHideErrorMessage && (
              <FormMessage className={messageClassName} />
            )}
            {subtitle && (
              <div className="text-xs text-text-tertiary">{subtitle}</div>
            )}
          </FormItem>
        )
      }}
    />
  )
}

export default memo(RHFNumberInput)
