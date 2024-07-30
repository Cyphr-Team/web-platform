import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { ChangeEventHandler, FocusEventHandler } from "react"
import { Control, FieldPath, FieldValues } from "react-hook-form"

type IOption = {
  value: string
  label: string
}

interface IOptionInputType<T extends FieldValues> {
  prefix?: string
  suffix?: string
  required?: boolean
  prefixIcon?: React.ReactNode
  label: string
  placeholder?: string
  control: Control<T>
  name: FieldPath<T>
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  className?: string
  inputClassName?: string
  subtitle?: string
  options: IOption[]
}

export const MultiCheckboxesInput = <T extends FieldValues>(
  props: IOptionInputType<T>
) => {
  const { control, name, label, required, subtitle, options } = props

  return (
    <FormItem>
      <FormLabel className="text-sm text-text-secondary font-medium">
        <label>
          {label}
          {required && <RequiredSymbol />}
        </label>
        {subtitle && (
          <p className="mt-2 text-text-tertiary font-medium">{subtitle}</p>
        )}
      </FormLabel>

      {options.map((option) => (
        <FormField
          key={option.value}
          control={control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem
                key={option.value}
                className="flex flex-row items-center space-x-lg space-y-0 "
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
      ))}

      <FormMessage />
    </FormItem>
  )
}
