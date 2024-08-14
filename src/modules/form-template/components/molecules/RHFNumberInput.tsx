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
import { memo } from "react"
import { NUMBER_PATTERN } from "@/constants"

export interface RHFNumberInputProps<T extends FieldValues>
  extends Partial<MaskInputProps> {
  name: FieldPath<T>
  label: string

  control?: Control<T>
  placeholder?: string
  required?: boolean
  className?: string
  styleProps?: {
    inputClassName?: string
    labelClassName?: string
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
    ...other
  } = props

  const { inputClassName, labelClassName } = styleProps

  return (
    <FormField
      control={(control as Control<T>) ?? defaultControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelClassName}>
            {label}
            {required && <RequiredSymbol />}
          </FormLabel>
          <FormControl>
            <MaskInput
              pattern={NUMBER_PATTERN}
              placeholder={placeholder}
              className={inputClassName}
              required
              {...field}
              {...other}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default memo(RHFNumberInput)
