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
import React, { type CSSProperties } from "react"
import { type Control, type FieldPath, type FieldValues } from "react-hook-form"

export interface ITextInputType<T extends FieldValues> {
  label: string
  name: FieldPath<T>
  control: Control<T>
  prefix?: string
  suffix?: string
  required?: boolean
  prefixIcon?: React.ReactNode
  placeholder?: string
  // Not allowed to override this because the field will become uncontrolled
  // onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  // onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  className?: string
  inputClassName?: string
  labelClassName?: string
  formMessageClassName?: string
  subtitle?: string
  isRowDirection?: boolean
  hideMessage?: boolean
  wrapperClassName?: string
  style?: CSSProperties | undefined
}

export function TextInput<T extends FieldValues>(props: ITextInputType<T>) {
  const {
    label,
    name,
    control,
    prefix,
    // suffix,
    required,
    prefixIcon,
    placeholder,
    // onChange,
    // onBlur,
    // className,
    inputClassName,
    labelClassName,
    formMessageClassName,
    subtitle,
    isRowDirection,
    wrapperClassName,
    style,
    hideMessage = false
  } = props

  const renderMessage = !hideMessage ? (
    isRowDirection && subtitle ? (
      <FormMessage className={formMessageClassName} style={{ marginTop: -1 }} />
    ) : (
      <FormMessage className={formMessageClassName} style={style} />
    )
  ) : null

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <FormLabel
            className={cn(
              `text-text-secondary ${
                isRowDirection && "font-semibold lg:-mt-2"
              }`,
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

          <FormControl className={`${isRowDirection && "xl:-mt-4"}`}>
            <Input
              className={cn("text-base", inputClassName)}
              placeholder={placeholder}
              prefix={prefix}
              prefixIcon={prefixIcon}
              wrapperClassName={wrapperClassName}
              {...field}
            />
          </FormControl>
          {renderMessage}
        </FormItem>
      )}
    />
  )
}
