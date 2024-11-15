import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { cn } from "@/lib/utils.ts"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import React, {
  type ChangeEventHandler,
  type FocusEventHandler,
  memo,
  type ReactNode,
  type SyntheticEvent
} from "react"
import {
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type Path,
  useFormContext
} from "react-hook-form"
import { Input } from "@/components/ui/input.tsx"
import currency from "currency.js"
import { get } from "lodash"

export const USDFormatter = (value: number | string) =>
  currency(value, { symbol: "", precision: 0, separator: ",", decimal: "." })

// Props Types
export interface RHFCurrencyInputProps<T extends FieldValues> {
  label: ReactNode
  name: FieldPath<T>

  placeholder?: string
  subtitle?: string
  className?: string
  isAllowDisplayZero?: boolean

  styleProps?: {
    wrapperClassName?: string
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
    suffixClassName?: string
    subtitleClassName?: string
  }
  isRowDirection?: boolean
  prefix?: string
  suffix?: string
  description?: string
  required?: boolean
  prefixIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>

  isHideErrorMessage?: boolean
  isDetail?: boolean
}

function RHFCurrencyInput<T extends FieldValues>(
  props: RHFCurrencyInputProps<T>
) {
  const { control } = useFormContext()
  const {
    name,
    label,
    required,
    subtitle,
    styleProps = {},
    isRowDirection,
    className,
    isHideErrorMessage = false,
    isDetail,
    isAllowDisplayZero = false,
    ...inputProps
  } = props

  const {
    wrapperClassName,
    inputClassName,
    labelClassName,
    messageClassName,
    suffixClassName,
    subtitleClassName
  } = styleProps

  const handleChangeValue =
    (field: ControllerRenderProps<FieldValues, Path<T>>) =>
    (event: SyntheticEvent) => {
      const valueAsNumber = USDFormatter(get(event.target, "value", 0)).value
      const value =
        valueAsNumber !== 0 && !isNaN(valueAsNumber) ? valueAsNumber : undefined

      field.onChange(value)
      field.onBlur()
    }

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
          if (
            !fieldState.isTouched &&
            field.value === 0 &&
            !isAllowDisplayZero
          ) {
            return ""
          }

          // Format the currency value
          return currency.format()
        })()

        return (
          <FormItem
            className={cn(
              "text-sm",
              isRowDirection
                ? "flex items-center justify-between gap-1.5"
                : null,
              className
            )}
          >
            {!!label && (
              <FormLabel className={cn("text-text-secondary", labelClassName)}>
                <div className="flex flex-col">
                  <label className={cn(isRowDirection ? "!mt-0" : null)}>
                    {label}
                    {required ? <RequiredSymbol /> : null}
                    {subtitle ? (
                      <p
                        className={cn(
                          "mt-2 font-medium text-text-tertiary",
                          subtitleClassName
                        )}
                      >
                        {subtitle}
                      </p>
                    ) : null}
                  </label>
                  {isRowDirection && !isHideErrorMessage ? (
                    <FormMessage />
                  ) : null}
                </div>
              </FormLabel>
            )}
            {isDetail ? (
              <div className="break-words">
                {inputProps.prefixIcon}
                {fieldValue || "-"}
                {inputProps.suffixIcon}
              </div>
            ) : (
              <FormControl>
                <Input
                  wrapperClassName={cn(
                    wrapperClassName,
                    isRowDirection ? "!mt-0" : null
                  )}
                  {...field}
                  {...inputProps}
                  className={cn("no-arrows text-sm", inputClassName)}
                  suffixClassName={suffixClassName}
                  value={fieldValue}
                  onBlur={handleChangeValue(field)}
                  onChange={handleChangeValue(field)}
                />
              </FormControl>
            )}
            {!isRowDirection && !isHideErrorMessage && (
              <FormMessage className={messageClassName} />
            )}
          </FormItem>
        )
      }}
    />
  )
}

export default memo(RHFCurrencyInput)
