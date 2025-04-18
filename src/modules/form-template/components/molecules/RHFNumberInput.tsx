import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import {
  type Control,
  type FieldPath,
  type FieldValues,
  useFormContext
} from "react-hook-form"
import { memo, type ReactNode } from "react"
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
  prefixIcon?: ReactNode
  isRowDirection?: boolean
  isHideErrorMessage?: boolean
  styleProps?: {
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
    suffixClassName?: string
  }
}

function RHFNumberInput<T extends FieldValues>(props: RHFNumberInputProps<T>) {
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
    suffixIcon,
    prefixIcon
  } = props

  const { inputClassName, labelClassName, messageClassName, suffixClassName } =
    styleProps

  return (
    <FormField
      control={control as Control<T>}
      name={name}
      render={({ field }) => {
        const value = !isNaN(parseFloat(field.value))
          ? parseFloat(field.value)
          : field.value

        return (
          <FormItem
            className={cn(
              className,
              isRowDirection
                ? "flex items-center justify-between gap-1.5"
                : null
            )}
          >
            <FormLabel className={cn("text-text-secondary", labelClassName)}>
              <div className="flex flex-col">
                <label>
                  {label}
                  {required ? <RequiredSymbol /> : null}
                  {subtitle ? (
                    <p className="mt-2 font-medium text-text-tertiary">
                      {subtitle}
                    </p>
                  ) : null}
                </label>
                {isRowDirection && !isHideErrorMessage ? <FormMessage /> : null}
              </div>
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                {...field}
                className={cn("no-arrows", inputClassName)}
                placeholder={placeholder}
                prefixIcon={prefixIcon}
                suffixClassName={suffixClassName}
                suffixIcon={suffixIcon}
                value={value}
              />
            </FormControl>
            {!isRowDirection && !isHideErrorMessage && (
              <FormMessage className={messageClassName} />
            )}
          </FormItem>
        )
      }}
    />
  )
}

export default memo(RHFNumberInput)
