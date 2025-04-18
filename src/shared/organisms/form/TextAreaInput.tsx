import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol"
import { type Control, type FieldPath, type FieldValues } from "react-hook-form"

interface ITextAreaInputType<T extends FieldValues> {
  label: string
  name: FieldPath<T>
  control: Control<T>
  prefix?: string
  suffix?: string
  required?: boolean
  placeholder?: string
  // Not allowed to override this because the field will become uncontrolled
  // onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  // onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  className?: string
  inputClassName?: string
  subtitle?: string
  isRowDirection?: boolean
  disable?: boolean
}

export function TextAreaInput<T extends FieldValues>(
  props: ITextAreaInputType<T>
) {
  const {
    label,
    name,
    control,
    prefix,
    placeholder,
    inputClassName,
    required,
    subtitle,
    isRowDirection,
    disable = false
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={props.className}>
          <FormLabel
            className={`text-text-secondary ${
              isRowDirection && "font-semibold lg:-mt-2"
            }`}
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
            <Textarea
              {...field}
              className={cn("text-base", inputClassName)}
              disabled={disable}
              placeholder={placeholder}
              prefix={prefix}
            />
          </FormControl>
          {isRowDirection && subtitle ? (
            <FormMessage style={{ marginTop: -1 }} />
          ) : (
            <FormMessage />
          )}
        </FormItem>
      )}
    />
  )
}
