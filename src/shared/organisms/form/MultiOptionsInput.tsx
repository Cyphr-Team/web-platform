import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { ChangeEventHandler, FocusEventHandler } from "react"
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"

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

export const MultiOptionsInput = <T extends FieldValues>(
  props: IOptionInputType<T>
) => {
  const { control, name, label, required, subtitle, options } = props

  return (
    <Controller
      key={name}
      control={control}
      name={name}
      render={({ field }) => (
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
          <FormControl>
            <ToggleGroup
              className="flex flex-col gap-md"
              type="multiple"
              value={field.value}
              onValueChange={(value) => {
                field.onBlur()
                field.onChange(value)
              }}
            >
              {options.map((option) => (
                <ToggleGroupItem
                  key={option.value}
                  id={option.value}
                  value={option.value}
                  className={cn(
                    "w-full text-sm text-text-secondary font-normal border rounded-md py-2 px-3 hover:bg-gray-100 cursor-pointer justify-start",
                    field.value?.includes(option.value) && "!bg-gray-300"
                  )}
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
