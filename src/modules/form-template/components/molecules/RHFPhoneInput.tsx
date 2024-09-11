import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"
import { memo, ReactNode } from "react"
import PhoneInput from "react-phone-number-input"
import { cn } from "@/lib/utils.ts"
import { CountrySelect, CustomPhoneInput } from "@/components/ui/phone-input"

export interface RHFPhoneInputProps<T extends FieldValues> {
  name: FieldPath<T>
  label?: string

  placeholder?: string
  subtitle?: string
  required?: boolean
  className?: string
  suffixIcon?: ReactNode
  isRowDirection?: boolean
  styleProps?: {
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
  }
}

/**
 * RHFPhoneInput: React Hook Form RHFPhoneInput
 * A wrapper for MaskInput to quick setup and reduce complexity.
 *
 * MUST USE THIS INSIDE A FORM OR ELSE IT WILL CRASH
 * */
const RHFPhoneInput = <T extends FieldValues>(props: RHFPhoneInputProps<T>) => {
  const { control } = useFormContext()
  const {
    name,
    label,
    placeholder,
    className,
    styleProps = {},
    required,
    isRowDirection,
    subtitle
  } = props

  const { inputClassName, labelClassName, messageClassName } = styleProps

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            className,
            isRowDirection ? "flex justify-between items-center" : null
          )}
        >
          {!!label && (
            <FormLabel className={cn("text-text-secondary", labelClassName)}>
              {label}
              {required && <RequiredSymbol />}
              {subtitle && (
                <p className="mt-2 text-text-tertiary font-medium">
                  {subtitle}
                </p>
              )}
              {isRowDirection && <FormMessage />}
            </FormLabel>
          )}
          <FormControl>
            <PhoneInput
              className={cn("text-sm", inputClassName)}
              international
              countryCallingCodeEditable={false}
              countrySelectComponent={CountrySelect}
              defaultCountry="US"
              placeholder={placeholder}
              inputComponent={CustomPhoneInput}
              {...field}
            />
          </FormControl>
          {!isRowDirection && <FormMessage className={messageClassName} />}
          {subtitle && (
            <div className="text-xs text-text-tertiary">{subtitle}</div>
          )}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFPhoneInput)
