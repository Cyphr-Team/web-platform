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
import { MaskInput, MaskInputProps } from "@/components/ui/mask-input.tsx"
import { memo, ReactNode } from "react"
import { NUMBER_PATTERN } from "@/constants"

export interface RHFNumberInputProps<T extends FieldValues>
  extends Partial<MaskInputProps> {
  name: FieldPath<T>
  label: string

  control?: Control<T>
  placeholder?: string
  required?: boolean
  className?: string
  suffixIcon?: ReactNode
  direction?: "row" | "column"
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
  const { control: defaultControl } = useFormContext()
  const {
    name,
    label,
    placeholder,
    className,
    styleProps = {},
    required,
    control,
    direction,
    ...other
  } = props

  const { inputClassName, labelClassName, messageClassName } = styleProps

  return (
    <FormField
      control={(control as Control<T>) ?? defaultControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelClassName}>
            {label}
            {required && <RequiredSymbol />}
            {direction === "row" && (
              <FormMessage className={messageClassName} />
            )}
          </FormLabel>
          <FormControl>
            <MaskInput
              pattern={NUMBER_PATTERN}
              placeholder={placeholder}
              className={inputClassName}
              required
              {...field}
              {...other}
              value={`${field.value}`}
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

export default memo(RHFNumberInput)
