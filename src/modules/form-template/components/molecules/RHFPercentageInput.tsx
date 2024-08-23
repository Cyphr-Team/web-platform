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

const PercentageFormatter = (value: number | string) =>
  currency(value, { symbol: "", precision: 1, decimal: "." })

export interface RHFPercentageInputProps<T extends FieldValues> {
  label: string
  name: FieldPath<T>

  placeholder?: string
  subtitle?: string
  className?: string
  min?: number
  max?: number

  styleProps?: {
    wrapperClassName?: string
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
    subtitleClassName?: string
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

const RHFPercentageInput = <T extends FieldValues>(
  props: RHFPercentageInputProps<T>
) => {
  const { control } = useFormContext()
  const {
    name,
    label,
    required,
    subtitle,
    styleProps = {},
    direction = "row",
    min = 0,
    max = 100,
    ...inputProps
  } = props

  const {
    wrapperClassName,
    inputClassName,
    labelClassName,
    messageClassName,
    subtitleClassName
  } = styleProps

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <FormLabel className={cn("text-text-secondary", labelClassName)}>
            <div className="flex flex-col">
              <label>
                {label}
                {required && <RequiredSymbol />}
              </label>
              {direction === "row" && <FormMessage />}
            </div>
          </FormLabel>

          <FormControl>
            <Input
              wrapperClassName={wrapperClassName}
              {...field}
              {...inputProps}
              suffixIcon="%"
              value={field.value}
              onChange={(e) => {
                field.onBlur()
                const value = parseFloat(e.target.value)
                if (value >= min && value <= max) {
                  field.onChange(e.target.value)
                }
              }}
              onBlur={(e) => {
                field.onBlur()
                const value = PercentageFormatter(e.target.value)
                field.onChange(
                  Number.isNaN(value.value) ? undefined : value.value
                )
              }}
              className={cn("text-base", inputClassName)}
            />
          </FormControl>
          {direction === "column" && (
            <FormMessage className={messageClassName} />
          )}
          {subtitle && (
            <p
              className={cn(
                "mt-2 text-text-tertiary font-medium",
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          )}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFPercentageInput)
