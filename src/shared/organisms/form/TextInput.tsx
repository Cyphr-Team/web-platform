import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import React, {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler
} from "react"
import { Control, FieldPath, FieldValues } from "react-hook-form"

interface ITextInputType<T extends FieldValues> {
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
  labelClassName?: string
  formMessageClassName?: string
  subtitle?: string
  isRowDirection?: boolean
  wrapperClassName?: string
  style?: CSSProperties | undefined
}

export const TextInput = <T extends FieldValues>(props: ITextInputType<T>) => {
  const {
    control,
    name,
    label,
    placeholder,
    prefix,
    prefixIcon,
    inputClassName,
    required,
    subtitle,
    isRowDirection,
    labelClassName,
    formMessageClassName,
    wrapperClassName,
    style,
    ...inputProps
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <FormLabel
            className={cn(
              `text-text-secondary ${
                isRowDirection && "lg:-mt-2 font-semibold"
              }`,
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

          <FormControl className={`${isRowDirection && "xl:-mt-4"}`}>
            <Input
              wrapperClassName={wrapperClassName}
              {...field}
              {...inputProps}
              placeholder={placeholder}
              prefix={prefix}
              prefixIcon={prefixIcon}
              className={cn("text-base", inputClassName)}
            />
          </FormControl>
          {isRowDirection && subtitle ? (
            <FormMessage
              style={{ marginTop: -1 }}
              className={formMessageClassName}
            />
          ) : (
            <FormMessage style={style} className={formMessageClassName} />
          )}
        </FormItem>
      )}
    />
  )
}
