import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Textarea } from "@/components/ui/textarea.tsx"
import { cn } from "@/lib/utils.ts"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import React, {
  type ChangeEventHandler,
  type FocusEventHandler,
  memo,
  type ReactNode,
  useState
} from "react"
import {
  type FieldPath,
  type FieldValues,
  type Noop,
  useController,
  useFormContext
} from "react-hook-form"

export interface RHFTextInputProps<T extends FieldValues> {
  label: ReactNode
  name: FieldPath<T>

  placeholder?: string
  subtitle?: string
  multiline?: boolean
  className?: string

  styleProps?: {
    wrapperClassName?: string
    inputClassName?: string
    labelClassName?: string
    messageClassName?: string
    subtitleClassName?: string
    suffixIconClassName?: string
  }

  isRowDirection?: boolean
  prefix?: string
  suffix?: string
  suffixIcon?: ReactNode
  description?: string
  required?: boolean
  prefixIcon?: React.ReactNode
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  disabled?: boolean
  autoFocus?: boolean

  isToggleView?: boolean
  isHideErrorMessage?: boolean
  isDetail?: boolean
}

function RHFTextInput<T extends FieldValues>(props: RHFTextInputProps<T>) {
  const { control } = useFormContext()
  const { name } = props

  return (
    <FormField
      control={control}
      name={name}
      render={() => <RenderInput {...props} />}
    />
  )
}

function RenderInput<T extends FieldValues>(props: RHFTextInputProps<T>) {
  const { control } = useFormContext()
  const {
    name,
    label,
    required,
    subtitle,
    isRowDirection = false,
    multiline = false,
    styleProps = {},
    isToggleView = false,
    isHideErrorMessage = false,
    isDetail,
    suffixIcon,
    ...inputProps
  } = props

  const { field } = useController({
    name,
    control,
    rules: { required: true }
  })

  const {
    wrapperClassName,
    inputClassName,
    subtitleClassName,
    suffixIconClassName,
    labelClassName,
    messageClassName
  } = styleProps

  const InputComponent = multiline ? Textarea : Input

  const [isView, setIsView] = useState(isToggleView && !!field?.value?.trim())

  const onShow = (value: boolean) => () => {
    setIsView(value)
  }

  const customOnBlur =
    (fieldOnBlur: Noop): RHFTextInputProps<T>["onBlur"] =>
    (event) => {
      onShow(!!event?.target?.value?.trim())()
      fieldOnBlur()
      props?.onBlur?.(event)
    }

  const inputRender = (() => {
    if (isDetail) return <div className="break-words">{field.value || "-"}</div>

    if (isView && isToggleView) {
      return (
        <div className="break-words" onDoubleClick={onShow(false)}>
          {field.value}
        </div>
      )
    }

    return (
      <FormControl>
        <InputComponent
          wrapperClassName={wrapperClassName}
          {...field}
          {...inputProps}
          className={cn("text-sm", inputClassName)}
          suffixClassName={suffixIconClassName}
          suffixIcon={suffixIcon}
          onBlur={customOnBlur(field.onBlur)}
        />
      </FormControl>
    )
  })()

  return (
    <FormItem
      className={cn(
        isRowDirection && "flex items-center justify-between",
        props.className
      )}
    >
      {!!label && (
        <FormLabel className={cn("text-text-secondary", labelClassName)}>
          {label}
          {required ? <RequiredSymbol /> : null}
          {subtitle ? (
            <p
              className={cn(
                "mt-2 font-medium text-text-tertiary",
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          ) : null}
          {isRowDirection && !isHideErrorMessage ? (
            <FormMessage className={messageClassName} />
          ) : null}
        </FormLabel>
      )}

      {inputRender}

      {!isRowDirection && !isHideErrorMessage && (
        <FormMessage className={messageClassName} />
      )}
    </FormItem>
  )
}

export default memo(RHFTextInput)
