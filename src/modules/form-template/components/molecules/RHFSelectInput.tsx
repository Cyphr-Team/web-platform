import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select.tsx"
import { cn } from "@/lib/utils.ts"

import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import { FieldPath, FieldValues, useFormContext } from "react-hook-form"
import {
  SelectContentProps,
  SelectProps,
  SelectTriggerProps
} from "@radix-ui/react-select"
import { memo, ReactNode } from "react"
import { DescriptionTooltip } from "../atoms/DescriptionTooltip"

type IOption = {
  label: ReactNode
  /**
   * TODO: check the implementation of Primitive Select because currently, it doesn't work well with type difference from string
   * */
  value: string
}

export interface RHFSelectInputProps<T extends FieldValues> {
  name: FieldPath<T>
  options: IOption[]
  label: string

  placeholder?: string
  subtitle?: string
  description?: string

  selectProps?: SelectProps
  selectTriggerProps?: SelectTriggerProps
  selectContentProps?: SelectContentProps

  className?: string
  styleProps?: {
    inputClassName?: string
    labelClassName?: string
    subtitleClassName?: string
    itemWrapperClassName?: string
    itemTextClassName?: string
  }

  isRowDirection?: boolean
  required?: boolean
  disabled?: boolean
}

const RHFSelectInput = <T extends FieldValues>(
  props: RHFSelectInputProps<T>
) => {
  const {
    name,
    label,
    required,
    subtitle,
    description,
    options,
    styleProps = {},
    disabled,
    selectProps,
    selectTriggerProps,
    selectContentProps,
    className,
    isRowDirection
  } = props

  const { control } = useFormContext()
  const {
    inputClassName,
    labelClassName,
    subtitleClassName,
    itemWrapperClassName,
    itemTextClassName
  } = styleProps

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            isRowDirection && "flex items-center justify-between",
            className
          )}
        >
          <FormLabel className={cn("text-text-secondary", labelClassName)}>
            <label className="items-center inline-flex">
              <span>
                {label}
                {required && <RequiredSymbol />}
                {description && (
                  <span className="ml-1">
                    <DescriptionTooltip description={description} />
                  </span>
                )}
              </span>
            </label>
            {subtitle && (
              <p
                className={cn(
                  "mt-2 text-text-tertiary font-medium",
                  subtitleClassName
                )}
              >
                {subtitle}
              </p>
            )}
            {isRowDirection && <FormMessage />}
          </FormLabel>

          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onBlur()
                field.onChange(value.toString())
              }}
              value={field.value}
              disabled={disabled}
              {...selectProps}
            >
              <SelectTrigger
                className={cn(
                  "text-sm [&>span]:break-all",
                  isRowDirection && "!mt-0",
                  inputClassName
                )}
                {...selectTriggerProps}
              >
                <SelectValue
                  placeholder={
                    <p className="text-sm text-text-placeholder opacity-50">
                      Please select
                    </p>
                  }
                />
              </SelectTrigger>
              <SelectContent
                className={cn(
                  "max-w-screen-sm xl:!max-w-full",
                  itemWrapperClassName
                )}
                {...selectContentProps}
              >
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className={cn("text-sm", itemTextClassName)}>
                      {option.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {/*TODO: handle multiple direction form message*/}

          {!isRowDirection && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFSelectInput)
