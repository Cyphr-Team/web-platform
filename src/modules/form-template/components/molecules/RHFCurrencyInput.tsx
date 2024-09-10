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
  suffixIcon?: React.ReactNode
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>

  isHideErrorMessage?: boolean
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
    isHideErrorMessage = false,
    ...inputProps
  } = props

  const { wrapperClassName, inputClassName, labelClassName, messageClassName } =
    styleProps

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const fieldValue = (() => {
          const currency = USDFormatter(field.value)
          // Check if the value is not a valid number
          if (Number.isNaN(currency.value) || typeof field.value !== "number") {
            return ""
          }
          // Allow empty input when the field is untouched and value is 0
          if (fieldState.isTouched === false && field.value === 0) {
            return ""
          }
          // Format the currency value
          return currency.format()
        })()

        return (
          <FormItem className={cn(className)}>
            {!!label && (
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
                  {direction === "row" && !isHideErrorMessage && (
                    <FormMessage />
                  )}
                </div>
              </FormLabel>
            )}
            <FormControl>
              <Input
                wrapperClassName={wrapperClassName}
                {...field}
                {...inputProps}
                value={fieldValue}
                onChange={(e) => {
                  const value = e.target.value
                    ? USDFormatter(e.target.value).value
                    : e.target.value

                  if (Number.isNaN(value)) return

                  field.onBlur()
                  field.onChange(value)
                }}
                onBlur={(e) => {
                  const value = USDFormatter(e.target.value).value

                  field.onChange(Number.isNaN(value) ? 0 : value)
                  // The onBlur should be place after because validate won't work if we put before onChange
                  field.onBlur()
                }}
                className={cn("text-base", inputClassName)}
              />
            </FormControl>
            {direction === "column" && !isHideErrorMessage && (
              <FormMessage className={messageClassName} />
            )}
          </FormItem>
        )
      }}
    />
  )
}

export default memo(RHFCurrencyInput)
