import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

export const OptionInput = <T extends FieldValues>(
  props: IOptionInputType<T>
) => {
  const { control, name, label, required, subtitle, options } = props

  return (
    <Controller
      key="scalePlan"
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
            <RadioGroup
              className="flex flex-col gap-3 mt-3"
              value={field.value}
              onValueChange={(value) => {
                field.onBlur()
                field.onChange(value)
              }}
            >
              {options.map((option) => (
                <div className="flex items-center w-full" key={option.value}>
                  <RadioGroupItem
                    id={option.value}
                    value={option.value}
                    className="w-4 h-4 mr-2 text-rich-black border-rich-black"
                  ></RadioGroupItem>
                  <Label
                    htmlFor={option.value}
                    className={cn(
                      "w-full text-sm text-text-secondary font-normal cursor-pointer"
                    )}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
