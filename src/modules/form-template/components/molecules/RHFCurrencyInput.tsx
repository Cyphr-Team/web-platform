import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { cn } from "@/lib/utils.ts"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import React, { ChangeEventHandler, FocusEventHandler, memo } from "react"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input.tsx"
import currency from "currency.js"

export const USDFormatter = (value: number | string) =>
  currency(value, { symbol: "", precision: 0, separator: ",", decimal: "." })

export interface RHFCurrencyInputProps<T extends FieldValues> {
  label: string
  name: FieldPath<T>

  placeholder?: string
  subtitle?: string
  className?: string

  styleProps?: {
    wrapperClassName?: string
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
  }
  direction?: "row" | "column"
  prefix?: string
  suffix?: string
  description?: string
  required?: boolean
  prefixIcon?: React.ReactNode
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const RHFCurrencyInput = <T extends FieldValues>(
  props: RHFCurrencyInputProps<T>
) => {
  const { control } = useFormContext()
  const {
    name,
    label,
    required,
    subtitle,
    styleProps = {},
    direction = "row",
    className,
    ...inputProps
  } = props

  const { wrapperClassName, inputClassName, labelClassName, messageClassName } =
    styleProps

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
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
              {direction === "row" && <FormMessage />}
            </div>
          </FormLabel>

          <FormControl>
            <Input
              wrapperClassName={wrapperClassName}
              {...field}
              {...inputProps}
              value={
                field.value ? USDFormatter(field.value).format() : undefined
              }
              onChange={(e) => {
                field.onBlur()
                field.onChange(USDFormatter(e.target.value).value)
              }}
              onBlur={(e) => {
                field.onBlur()
                const currency = USDFormatter(e.target.value)
                field.onChange(
                  Number.isNaN(currency.value) ? undefined : currency.value
                )
              }}
              className={cn("text-base", inputClassName)}
            />
          </FormControl>
          {direction === "column" && (
            <FormMessage className={messageClassName} />
          )}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFCurrencyInput)
