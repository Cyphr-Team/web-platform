import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { cn } from "@/lib/utils.ts"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import React, { ChangeEventHandler, FocusEventHandler, memo } from "react"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea.tsx"

export interface RHFTextInputProps<T extends FieldValues> {
  label: string
  name: FieldPath<T>

  placeholder?: string
  subtitle?: string
  multiline?: boolean
  className?: string

  styleProps?: {
    wrapperClassName?: string
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
  }

  isRowDirection?: boolean
  prefix?: string
  suffix?: string
  description?: string
  required?: boolean
  prefixIcon?: React.ReactNode
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const RHFTextInput = <T extends FieldValues>(props: RHFTextInputProps<T>) => {
  const { control } = useFormContext()
  const {
    name,
    label,
    required,
    subtitle,
    isRowDirection = false,
    multiline = false,
    styleProps = {},
    ...inputProps
  } = props

  const { wrapperClassName, inputClassName, labelClassName, messageClassName } =
    styleProps

  const InputComponent = multiline ? Textarea : Input

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            isRowDirection && "flex items-center justify-between",
            props.className
          )}
        >
          <FormLabel className={cn("text-text-secondary", labelClassName)}>
            {label}
            {required && <RequiredSymbol />}
            {subtitle && (
              <p className="mt-2 text-text-tertiary font-medium">{subtitle}</p>
            )}
            {isRowDirection && <FormMessage className={messageClassName} />}
          </FormLabel>

          <FormControl>
            <InputComponent
              wrapperClassName={wrapperClassName}
              {...field}
              {...inputProps}
              className={cn("text-base", inputClassName)}
            />
          </FormControl>
          {!isRowDirection && <FormMessage className={messageClassName} />}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFTextInput)
