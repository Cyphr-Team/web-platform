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
import { ChangeEventHandler, FocusEventHandler } from "react"
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
    ...inputProps
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <FormLabel className="text-text-secondary">
            {label}
            {required && <RequiredSymbol />}
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              {...inputProps}
              placeholder={placeholder}
              prefix={prefix}
              prefixIcon={prefixIcon}
              className={cn("text-base", inputClassName)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
