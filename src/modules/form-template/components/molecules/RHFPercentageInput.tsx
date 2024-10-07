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
import currency from "currency.js"
import React, { memo, useCallback } from "react"
import {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  useFormContext
} from "react-hook-form"

const formatPercentage = (value: number | string) =>
  currency(value, { symbol: "", precision: 1, decimal: "." })

interface StyleProps {
  wrapperClassName?: string
  inputClassName?: string
  labelClassName?: string
  messageClassName?: string
  subtitleClassName?: string
  suffixClassName?: string
}

export interface RHFPercentageInputProps<T extends FieldValues> {
  label: string
  name: FieldPath<T>
  placeholder?: string
  subtitle?: string
  className?: string
  min?: number
  max?: number
  isString?: boolean
  styleProps?: StyleProps
  direction?: "row" | "column"
  prefix?: string
  suffix?: string
  description?: string
  required?: boolean
  prefixIcon?: React.ReactNode
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
    direction = "column",
    min = 0,
    max = 100,
    isString = false,
    ...inputProps
  } = props

  const {
    wrapperClassName,
    inputClassName,
    labelClassName,
    messageClassName,
    subtitleClassName,
    suffixClassName
  } = styleProps

  type RHFChangeFunction = {
    fieldChange: ControllerRenderProps<FieldValues, Path<T>>["onChange"]
    fieldBlur: ControllerRenderProps<FieldValues, Path<T>>["onBlur"]
  }

  const handleChange = useCallback(
    ({ fieldChange, fieldBlur }: RHFChangeFunction) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        fieldBlur()
        const fieldValue = e.target.value || "0"
        const parseFloatValue = parseFloat(fieldValue)
        if (parseFloatValue >= min && parseFloatValue <= max) {
          fieldChange(isString ? fieldValue.toString() : fieldValue)
        }
      },
    [min, max, isString]
  )

  const handleBlur = useCallback(
    ({ fieldChange, fieldBlur }: RHFChangeFunction) =>
      (e: React.FocusEvent<HTMLInputElement>) => {
        const fieldValue = e.target.value
        const parseFloatValue = parseFloat(fieldValue)
        const formattedValue = formatPercentage(parseFloatValue)
        const numberPercentage = Number.isNaN(formattedValue.value)
          ? undefined
          : formattedValue.value
        fieldChange(
          isString ? numberPercentage?.toString() ?? "" : numberPercentage
        )
        fieldBlur()
      },
    [isString]
  )

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <FormLabel className={cn("text-text-secondary", labelClassName)}>
            {label}
            {required && <RequiredSymbol />}
            {direction === "row" && <FormMessage />}
          </FormLabel>

          <FormControl>
            <Input
              {...field}
              {...inputProps}
              onChange={handleChange({
                fieldChange: field.onChange,
                fieldBlur: field.onBlur
              })}
              onBlur={handleBlur({
                fieldChange: field.onChange,
                fieldBlur: field.onBlur
              })}
              value={field.value}
              wrapperClassName={wrapperClassName}
              suffixIcon="%"
              className={cn("text-sm", inputClassName)}
              suffixClassName={suffixClassName}
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
