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
import { cn } from "@/lib/utils"

export interface RHFMaskInputProps<T extends FieldValues>
  extends Partial<MaskInputProps> {
  name: FieldPath<T>
  label: string
  pattern: string
  /**
   * @param direction: use direction to custom the location of error message
   * @constant row => error message will occur below Label
   * @constant column => error message will occur below Input field
   * @constant undefined => error message is hidden
   * */
  direction?: "row" | "column"
  control?: Control<T>
  placeholder?: string
  required?: boolean
  className?: string
  styleProps?: {
    inputClassName?: string
    labelClassName?: string
  }

  isHideErrorMessage?: boolean
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
    isHideErrorMessage = false,
    direction = "column"
  } = props

  const { inputClassName, labelClassName } = styleProps

  return (
    <FormField
      control={(control as Control) ?? defaultControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={cn("text-text-secondary", labelClassName)}>
            {label}
            {required && <RequiredSymbol />}
            {direction === "row" && !isHideErrorMessage && (
              <FormMessage className="mt-1" />
            )}
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
          {direction === "column" && !isHideErrorMessage && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFMaskInput)
