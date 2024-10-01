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
import { cn } from "@/lib/utils"

export interface RHFMaskInputProps<T extends FieldValues>
  extends Partial<MaskInputProps> {
  name: FieldPath<T>
  label: string
  pattern: string
  isRowDirection?: boolean
  control?: Control<T>
  placeholder?: string
  required?: boolean
  className?: string
  prefixIcon?: ReactNode
  suffixIcon?: ReactNode
  styleProps?: {
    inputClassName?: string
    labelClassName?: string
    wrapperClassName?: string
  }

  isHideErrorMessage?: boolean
  isDetail?: boolean
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
    prefixIcon,
    suffixIcon,
    isHideErrorMessage = false,
    isRowDirection = false,
    isDetail
  } = props

  const { inputClassName, labelClassName, wrapperClassName } = styleProps

  return (
    <FormField
      control={(control as Control) ?? defaultControl}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "text-sm",
            className,
            isRowDirection ? "flex items-center justify-between" : null
          )}
        >
          {!!label && (
            <FormLabel
              className={cn(
                "text-text-secondary",
                labelClassName,
                isRowDirection ? "!mt-0" : null
              )}
            >
              {label}
              {required && <RequiredSymbol />}
              {isRowDirection && !isHideErrorMessage && (
                <FormMessage className="mt-1" />
              )}
            </FormLabel>
          )}

          {isDetail ? (
            <div className="break-words">{field.value || "-"}</div>
          ) : (
            <FormControl>
              <MaskInput
                pattern={pattern}
                placeholder={placeholder}
                wrapperClassName={cn(
                  isRowDirection ? "!mt-0" : null,
                  wrapperClassName
                )}
                className={inputClassName}
                prefixIcon={prefixIcon}
                suffixIcon={suffixIcon}
                required
                {...field}
              />
            </FormControl>
          )}
          {!isRowDirection && !isHideErrorMessage && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFMaskInput)
