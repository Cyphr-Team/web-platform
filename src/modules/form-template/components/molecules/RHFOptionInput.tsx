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
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type Path,
  useFormContext
} from "react-hook-form"

interface IOption {
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

function RHFOptionInput<T extends FieldValues>(props: RHFOptionInputProps<T>) {
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
      <div className="flex w-full items-center">
        <RadioGroupItem
          id={`${name}-other`}
          // 1. value here must not equal to "" because "" will make this radio button always be mark as checked
          // 2. if user input their own value, this field must set to the new value to make sure the radio button is checked
          // 3. if the value contain in available options, this field set to "other" to assure that the radio button is not checked
          className="w-4 h-4 mr-2 text-rich-black border-rich-black"
          value={
            field.value === "" || existedInOptions(field.value)
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
          type="text"
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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            field.onBlur()
            field.onChange(event.target.value)
          }}
          // onBlur will set the value to the original state
          value={
            field.value === GUARD_DATA || existedInOptions(field.value)
              ? ""
              : field.value
          }
          onBlur={() => {
            field.onBlur()
            field.onChange(field.value)
          }}
        />
      </div>
    ),
    [existedInOptions, name, otherText]
  )

  const renderOption = useCallback(
    (option: IOption, index: number) => {
      return (
        <div
          key={index}
          className={cn("flex w-full items-center", radioItemWrapperClassName)}
        >
          <RadioGroupItem
            className={cn(
              "text-rich-black border-rich-black mr-2 size-4",
              radioGroupItemClassName
            )}
            id={`${name}-${option.value}-${index}`}
            value={option.value}
          />
          <Label
            className={cn(
              "w-full cursor-pointer text-sm font-normal text-text-secondary",
              radioGroupItemLabelClassName
            )}
            htmlFor={`${name}-${option.value}-${index}`}
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
              "text-sm font-medium text-text-secondary",
              labelClassName
            )}
          >
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
              className={cn("mt-3 flex flex-col gap-3", radioGroupClassName)}
              value={field.value}
              onChange={field.onBlur}
              onValueChange={(value) => {
                field.onBlur()
                field.onChange(value)
              }}
            >
              {options.map((option, index) => renderOption(option, index))}
              {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                hasOtherOption ? renderOtherOption(field) : null
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
