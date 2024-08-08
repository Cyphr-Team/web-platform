import { Checkbox } from "@/components/ui/checkbox"
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Label } from "@/components/ui/label.tsx"
import { cn } from "@/lib/utils.ts"
import { BUSINESS_MODEL_OTHER_OPTION } from "@/modules/loan-application/components/organisms/loan-application-form/execution/constants"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { IOptionWithOther } from "@/types/common.type"
import React, { ChangeEventHandler, FocusEventHandler, ReactNode } from "react"
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  useFormContext
} from "react-hook-form"

interface IOptionInputType<
  OptionType extends IOptionWithOther = IOptionWithOther,
  T extends FieldValues = FieldValues
> {
  prefix?: string
  suffix?: string
  required?: boolean
  prefixIcon?: React.ReactNode
  label: ReactNode
  placeholder?: string
  control: Control<T>
  name: FieldPath<T>
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  className?: string
  inputClassName?: string
  subtitle?: string
  options: OptionType[]
  hasOtherOption?: boolean
}

export const MultiCheckboxesInput = <
  OptionType extends IOptionWithOther = IOptionWithOther,
  T extends FieldValues = FieldValues
>(
  props: IOptionInputType<OptionType, T>
) => {
  const { control, name, label, required, subtitle, options } = props
  const { register, setValue } = useFormContext()

  return (
    <Controller
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

          {options.map((option) => (
            <div
              key={option.value}
              className="flex flex-row items-center space-x-lg space-y-0 "
            >
              <Checkbox
                id={option.value}
                className="w-5 h-5 text-rich-black border-rich-black"
                checked={field.value?.includes(option.value)}
                onCheckedChange={(checked) => {
                  if (!checked && !!option.otherFieldName) {
                    setValue(option.otherFieldName, "")
                  }

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
              <Label
                htmlFor={option.value}
                className="text-sm text-text-secondary font-normal cursor-pointer ml-3"
              >
                {option.label}
              </Label>
              {!!option?.otherFieldName && (
                <input
                  {...register(option.otherFieldName)}
                  // TODO: we've won... but at what cost?
                  onChange={(e) => {
                    if (e.currentTarget.value.length) {
                      if (!field.value.includes(BUSINESS_MODEL_OTHER_OPTION)) {
                        field.onChange([...field.value, option.value])
                      }
                    }
                    setValue(option.otherFieldName!, e.currentTarget.value)
                  }}
                  className={cn(
                    "w-[70%] max-w-full cursor-pointer focus:outline-none",
                    "text-sm text-text-secondary font-normal",
                    "border border-input border-l-0 border-r-0 border-t-0"
                  )}
                />
              )}
            </div>
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
