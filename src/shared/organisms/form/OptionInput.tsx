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
  type ChangeEventHandler,
  type FocusEventHandler,
  useCallback
} from "react"
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type Path
} from "react-hook-form"

interface IOption {
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

export function OptionInput<T extends FieldValues>(props: IOptionInputType<T>) {
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
      <div className="flex w-full items-center">
        <RadioGroupItem
          // 1. value here must not equal to "" because "" will make this radio button always be mark as checked
          // 2. if user input their own value, this field must set to the new value to make sure the radio button is checked
          // 3. if the value contain in available options, this field set to "other" to assure that the radio button is not checked
          className="text-rich-black border-rich-black mr-2 size-4"
          id={`${name}-other`}
          value={
            field.value === "" || existsInOptions(field.value)
              ? GUARD_DATA
              : field.value
          }
        />
        <Label
          className="cursor-pointer text-sm font-normal text-text-secondary"
          htmlFor={`${name}-other`}
        >
          {otherText}
        </Label>
        <input
          // The value here will be visible to user
          // 1. If user input their own value, this field will show for user
          // 2. If user choose the provided option, this field is set to "" to hide the value
          // 3. When user first click to the Other radio button, the GUARD_DATA value should not be show to user
          // 4. the GUARD_DATA here must be consistent with the value on the RadioGroupItem above
          className={cn(
            "w-1/2 ml-2.5 cursor-pointer focus:outline-none",
            "text-sm text-text-secondary font-normal",
            "border border-input border-l-0 border-r-0 border-t-0"
          )}
          type="text"
          value={
            field.value === GUARD_DATA || existsInOptions(field.value)
              ? ""
              : field.value
          }
          onBlur={() => {
            // onBlur will set the value to the original state
            field.onBlur()
            field.onChange(field.value)
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            field.onBlur()
            field.onChange(event.target.value)
          }}
        />
      </div>
    ),
    [existsInOptions, name, otherText]
  )

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="text-sm font-medium text-text-secondary">
            <label>
              {label}
              {required ? <RequiredSymbol /> : null}
            </label>
            {subtitle ? (
              <p className="mt-2 font-medium text-text-tertiary">{subtitle}</p>
            ) : null}
          </FormLabel>
          <FormControl>
            <RadioGroup
              className="mt-3 flex flex-col gap-3"
              value={field.value}
              onChange={field.onBlur}
              onValueChange={(value) => {
                field.onBlur()
                field.onChange(value)
              }}
            >
              {options.map((option, index) => (
                <div key={option.value} className="flex w-full items-center">
                  <RadioGroupItem
                    className="text-rich-black border-rich-black mr-2 size-4"
                    id={`${name}-${option.value}-${index}`}
                    value={option.value}
                  />
                  <Label
                    className={cn(
                      "w-full text-sm text-text-secondary font-normal cursor-pointer"
                    )}
                    htmlFor={`${name}-${option.value}-${index}`}
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
              {hasOtherOption ? renderOtherOption(field) : null}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
