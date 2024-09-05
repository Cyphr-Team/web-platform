import { Checkbox } from "@/components/ui/checkbox.tsx"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import { memo, useCallback } from "react"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"

type IOption = {
  value: string
  label: string
}

export interface RHFMultiSelectInputProps<T extends FieldValues> {
  name: FieldPath<T>
  label: string
  options: IOption[]

  required?: boolean
  className?: string

  // TODO: support styling for child components
  styleProps?: object
  subtitle?: string
  subLabel?: string
}

const RHFMultiSelectInput = <T extends FieldValues>(
  props: RHFMultiSelectInputProps<T>
) => {
  const { control } = useFormContext()
  const { name, label, required, subtitle, options, className, subLabel } =
    props

  const renderOption = useCallback(
    (option: IOption, index: number) => (
      <FormField
        key={`${option.value}_${index}`}
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <FormItem
              key={option.value}
              className="flex flex-row items-center space-x-lg space-y-0"
            >
              <FormControl>
                <Checkbox
                  className="w-5 h-5 text-rich-black border-rich-black"
                  checked={field.value?.includes(option.value)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...field.value, option.value])
                      : field.onChange(
                          field.value?.filter(
                            (value: string) => value !== option.value
                          )
                        )
                  }}
                  {...field}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">
                {option.label}
              </FormLabel>
            </FormItem>
          )
        }}
      />
    ),
    [control, name]
  )

  return (
    <FormItem className={className}>
      <FormLabel className="text-sm text-text-secondary font-medium">
        <p>
          {label}
          {subLabel && (
            <span className="text-text-tertiary italic font-light">
              {subLabel}
            </span>
          )}
          {required && <RequiredSymbol />}
        </p>

        {subtitle && (
          <p className="mt-2 text-text-tertiary font-medium">{subtitle}</p>
        )}
      </FormLabel>
      {options.map((option, index) => renderOption(option, index))}
      <FormMessage />
    </FormItem>
  )
}

export default memo(RHFMultiSelectInput)
