import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { InputPassword } from "@/components/ui/input.tsx"
import { cn } from "@/lib/utils.ts"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import { memo, type ReactNode } from "react"
import {
  type FieldPath,
  type FieldValues,
  useController,
  useFormContext
} from "react-hook-form"

export interface RHFPasswordInputProps<T extends FieldValues> {
  label: ReactNode
  name: FieldPath<T>
  placeholder?: string
  className?: string
  styleProps?: {
    wrapperClassName?: string
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
  }
  required?: boolean
  disabled?: boolean
  autoFocus?: boolean
  isHideErrorMessage?: boolean
}

function RHFPasswordInput<T extends FieldValues>(
  props: RHFPasswordInputProps<T>
) {
  const { control } = useFormContext()
  const { name } = props

  return (
    <FormField
      control={control}
      name={name}
      render={() => <RenderPasswordInput {...props} />}
    />
  )
}

function RenderPasswordInput<T extends FieldValues>(
  props: RHFPasswordInputProps<T>
) {
  const { control } = useFormContext()
  const {
    name,
    label,
    required,
    isHideErrorMessage = false,
    styleProps = {},
    ...inputProps
  } = props

  const { field } = useController({
    name,
    control,
    rules: { required: true }
  })

  const { wrapperClassName, inputClassName, labelClassName, messageClassName } =
    styleProps

  return (
    <FormItem className={cn(props.className)}>
      {!!label && (
        <FormLabel className={cn("text-text-secondary", labelClassName)}>
          {label}
          {required ? <RequiredSymbol /> : null}
        </FormLabel>
      )}

      <FormControl>
        <InputPassword
          wrapperClassName={wrapperClassName}
          {...field}
          {...inputProps}
          className={cn("text-sm", inputClassName)}
        />
      </FormControl>

      {!isHideErrorMessage && <FormMessage className={messageClassName} />}
    </FormItem>
  )
}

export default memo(RHFPasswordInput)
