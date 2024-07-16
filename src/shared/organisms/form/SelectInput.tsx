import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { ChangeEventHandler, FocusEventHandler } from "react"
import { Control, FieldPath, FieldValues } from "react-hook-form"

type IOption = {
  value: string
  label: string
}

interface ISelectInputType<T extends FieldValues> {
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
  isRowDirection?: boolean
  options: IOption[]
}

export const SelectInput = <T extends FieldValues>(
  props: ISelectInputType<T>
) => {
  const {
    control,
    name,
    label,
    required,
    subtitle,
    isRowDirection,
    options,
    inputClassName
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <FormLabel
            className={`text-text-secondary ${
              isRowDirection && "lg:-mt-2 font-semibold"
            }`}
          >
            <label>
              {label}
              {required && <RequiredSymbol />}
            </label>
            {subtitle && (
              <p className="mt-2 text-text-tertiary font-medium">{subtitle}</p>
            )}
          </FormLabel>

          <FormControl className={`${isRowDirection && "xl:-mt-4"}`}>
            <Select
              onValueChange={(value) => {
                field.onBlur()
                field.onChange(value.toString())
              }}
              value={field.value}
            >
              <SelectTrigger
                className={cn(
                  "text-sm col-span-6 xl:col-span-2 xl:max-w-40 xl:col-end-7 xl:ml-auto",
                  inputClassName
                )}
              >
                <SelectValue placeholder="Please select" />
              </SelectTrigger>
              <SelectContent className="max-w-screen-sm">
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="text-sm">{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {isRowDirection && subtitle ? (
            <FormMessage style={{ marginTop: -1 }} />
          ) : (
            <FormMessage />
          )}
        </FormItem>
      )}
    />
  )
}
