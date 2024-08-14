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

export interface RHFMaskInputProps<T extends FieldValues>
  extends Partial<MaskInputProps> {
  name: FieldPath<T>
  label: string
  pattern: string

  control?: Control<T>
  placeholder?: string
  required?: boolean
  className?: string
  hideMessage?: boolean
  styleProps?: {
    inputClassName?: string
    labelClassName?: string
  }
}

/**
 * RHFMaskInput: React Hook Form MaskInput
 * A wrapper for MaskInput to quick setup and reduce complexity.
 *
 * MUST USE THIS INSIDE A FORM OR ELSE IT WILL CRASH
 * */
const RHFMaskInput = <T extends FieldValues>(props: RHFMaskInputProps<T>) => {
  const { control: defaultControl } = useFormContext()
  const {
    name,
    label,
    placeholder,
    pattern,
    className,
    styleProps = {},
    required,
    control,
    hideMessage = false
  } = props

  const { inputClassName, labelClassName } = styleProps

  return (
    <FormField
      control={(control as Control) ?? defaultControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelClassName}>
            {label}
            {required && <RequiredSymbol />}
          </FormLabel>
          <FormControl>
            <MaskInput
              pattern={pattern}
              placeholder={placeholder}
              className={inputClassName}
              required
              {...field}
            />
          </FormControl>
          {!hideMessage && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFMaskInput)
