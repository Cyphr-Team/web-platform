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
import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback
} from "react"
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path
} from "react-hook-form"

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
  hasOtherOption?: boolean
  otherText?: string
}

// GUARD_DATA is a dummy value for handle checked or unchecked other button. Detail is below
const GUARD_DATA = "cyphr_other"

export const OptionInput = <T extends FieldValues>(
  props: IOptionInputType<T>
) => {
  const {
    control,
    name,
    label,
    required,
    subtitle,
    options,
    className,
    hasOtherOption = false,
    otherText = "Other:"
  } = props

  const existsInOptions = useCallback(
    (value: string) => options.some((option) => option.value === value),
    [options]
  )

  const renderOtherOption = useCallback(
    (field: ControllerRenderProps<T, Path<T>>) => (
      <div className="flex items-center w-full">
        <RadioGroupItem
          id={`${name}-other`}
          // 1. value here must not equal to "" because "" will make this radio button always be mark as checked
          // 2. if user input their own value, this field must set to the new value to make sure the radio button is checked
          // 3. if the value contain in available options, this field set to "other" to assure that the radio button is not checked
          value={
            field.value === "" || existsInOptions(field.value)
              ? GUARD_DATA
              : field.value
          }
          className="w-4 h-4 mr-2 text-rich-black border-rich-black"
        />
        <Label
          htmlFor={`${name}-other`}
          className="text-sm text-text-secondary font-normal cursor-pointer"
        >
          {otherText}
        </Label>
        <input
          type="text"
          // The value here will be visible to user
          // 1. If user input their own value, this field will show for user
          // 2. If user choose the provided option, this field is set to "" to hide the value
          // 3. When user first click to the Other radio button, the GUARD_DATA value should not be show to user
          // 4. the GUARD_DATA here must be consistent with the value on the RadioGroupItem above
          value={
            field.value === GUARD_DATA || existsInOptions(field.value)
              ? ""
              : field.value
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            field.onBlur()
            field.onChange(event.target.value)
          }}
          // onBlur will set the value to the original state
          onBlur={() => {
            field.onBlur()
            field.onChange(field.value)
          }}
          className={cn(
            "w-1/2 ml-2.5 cursor-pointer focus:outline-none",
            "text-sm text-text-secondary font-normal",
            "border border-input border-l-0 border-r-0 border-t-0"
          )}
        />
      </div>
    ),
    [existsInOptions, name, otherText]
  )

  return (
    <Controller
      key="scalePlan"
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
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
              onChange={field.onBlur}
            >
              {options.map((option) => (
                <div className="flex items-center w-full" key={option.value}>
                  <RadioGroupItem
                    id={option.value}
                    value={option.value}
                    className="w-4 h-4 mr-2 text-rich-black border-rich-black"
                  />
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
              {hasOtherOption && renderOtherOption(field)}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
