import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { Label } from "@/components/ui/label.tsx"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx"

import { cn } from "@/lib/utils.ts"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import React, { memo, useCallback } from "react"
import {
  Controller,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
  useFormContext
} from "react-hook-form"

type IOption = {
  value: string
  label: string
}

export interface RHFOptionInputProps<T extends FieldValues> {
  name: FieldPath<T>
  label: string
  options: IOption[]

  subtitle?: string
  required?: boolean
  className?: string

  styleProps?: {
    labelClassName?: string
    messageClassName?: string
    radioGroupClassName?: string
    radioGroupItemClassName?: string
    radioItemWrapperClassName?: string
    radioGroupItemLabelClassName?: string
  }

  hasOtherOption?: boolean
  otherText?: string
}

// GUARD_DATA is a dummy value for handle checked or unchecked other button. Detail is below
const GUARD_DATA = "cyphr_other"

const RHFOptionInput = <T extends FieldValues>(
  props: RHFOptionInputProps<T>
) => {
  const { control } = useFormContext()
  const {
    name,
    label,
    required,
    subtitle,
    options,
    className,
    hasOtherOption = false,
    otherText = "Other:",
    styleProps = {}
  } = props

  const {
    labelClassName,
    messageClassName,
    radioGroupClassName,
    radioGroupItemClassName,
    radioItemWrapperClassName,
    radioGroupItemLabelClassName
  } = styleProps

  const existedInOptions = useCallback(
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
            field.value === "" || existedInOptions(field.value)
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
            field.value === GUARD_DATA || existedInOptions(field.value)
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
    [existedInOptions, name, otherText]
  )

  const renderOption = useCallback(
    (option: IOption, index: number) => {
      return (
        <div
          className={cn("flex items-center w-full", radioItemWrapperClassName)}
          key={index}
        >
          <RadioGroupItem
            id={`${name}-${option.value}-${index}`}
            value={option.value}
            className={cn(
              "w-4 h-4 mr-2 text-rich-black border-rich-black",
              radioGroupItemClassName
            )}
          />
          <Label
            htmlFor={`${name}-${option.value}-${index}`}
            className={cn(
              "w-full text-sm text-text-secondary font-normal cursor-pointer",
              radioGroupItemLabelClassName
            )}
          >
            {option.label}
          </Label>
        </div>
      )
    },
    [
      name,
      radioGroupItemClassName,
      radioGroupItemLabelClassName,
      radioItemWrapperClassName
    ]
  )

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel
            className={cn(
              "text-sm text-text-secondary font-medium",
              labelClassName
            )}
          >
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
              className={cn("flex flex-col gap-3 mt-3", radioGroupClassName)}
              value={field.value}
              onValueChange={(value) => {
                field.onBlur()
                field.onChange(value)
              }}
              onChange={field.onBlur}
            >
              {options.map((option, index) => renderOption(option, index))}
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                hasOtherOption && renderOtherOption(field)
              }
            </RadioGroup>
          </FormControl>
          <FormMessage className={messageClassName} />
        </FormItem>
      )}
    />
  )
}

export default memo(RHFOptionInput)
