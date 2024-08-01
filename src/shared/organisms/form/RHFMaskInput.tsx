import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext
} from "react-hook-form"
import { MaskInput } from "@/components/ui/mask-input.tsx"

interface IMaskInputProps<T extends FieldValues> {
  name: FieldPath<T>
  label: string
  pattern: string
  control?: Control<T>
  placeholder?: string
  className?: string
  inputClassName?: string
  labelClassName?: string
  required?: boolean
}

/**
 * RHFMaskInput: React Hook Form MaskInput
 * A wrapper for MaskInput to quick setup and reduce complexity.
 *
 * MUST USE THIS INSIDE A FORM OR ELSE IT WILL CRASH
 * */
export const RHFMaskInput = <T extends FieldValues>(
  props: IMaskInputProps<T>
) => {
  const { control: defaultControl } = useFormContext()
  const {
    name,
    label,
    placeholder,
    pattern,
    className,
    inputClassName,
    labelClassName,
    required,
    control
  } = props

  return (
    <FormField
      control={(control as Control<FieldValues>) ?? defaultControl}
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
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
