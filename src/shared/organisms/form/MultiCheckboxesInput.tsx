import { Checkbox } from "@/components/ui/checkbox"
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { Label } from "@/components/ui/label.tsx"
import { cn } from "@/lib/utils.ts"
import { BUSINESS_MODEL_OTHER_OPTION } from "@/modules/loan-application/components/organisms/loan-application-form/execution/constants"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { type IOptionWithOther } from "@/types/common.type"
import React, {
  type ChangeEventHandler,
  type FocusEventHandler,
  type ReactNode
} from "react"
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
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

export function MultiCheckboxesInput<
  OptionType extends IOptionWithOther = IOptionWithOther,
  T extends FieldValues = FieldValues
>(props: IOptionInputType<OptionType, T>) {
  const { control, name, label, required, subtitle, options } = props
  const { register, setValue } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-text-secondary">
            <label>
              {label}
              {required ? <RequiredSymbol /> : null}
            </label>
            {subtitle ? (
              <p className="mt-2 font-medium text-text-tertiary">{subtitle}</p>
            ) : null}
          </FormLabel>

          {options.map((option) => (
            <div
              key={option.value}
              className="flex flex-row items-center space-x-lg space-y-0 "
            >
              <Checkbox
                checked={field.value?.includes(option.value)}
                className="text-rich-black border-rich-black size-5"
                id={option.value}
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
                className="ml-3 cursor-pointer text-sm font-normal text-text-secondary"
                htmlFor={option.value}
              >
                {option.label}
              </Label>
              {!!option?.otherFieldName && (
                <input
                  {...register(option.otherFieldName)}
                  // TODO: we've won... but at what cost?
                  className={cn(
                    "w-[70%] max-w-full cursor-pointer focus:outline-none",
                    "text-sm font-normal text-text-secondary",
                    "border border-x-0 border-t-0 border-input"
                  )}
                  onChange={(e) => {
                    if (e.currentTarget.value.length) {
                      if (!field.value.includes(BUSINESS_MODEL_OTHER_OPTION)) {
                        field.onChange([...field.value, option.value])
                      }
                    }
                    setValue(option.otherFieldName!, e.currentTarget.value)
                  }}
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
