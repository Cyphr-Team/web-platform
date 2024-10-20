import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { RequiredSymbol } from "@/shared/atoms/RequiredSymbol.tsx"
import { CalendarDatePicker } from "@/shared/molecules/date-picker.tsx"
import {
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type Path,
  useFormContext
} from "react-hook-form"
import { cn } from "@/lib/utils.ts"
import { memo } from "react"

export interface RHFCalendarPickerInputProps<T extends FieldValues> {
  name: FieldPath<T>
  label: string
  subtitle?: string
  required?: boolean
  className?: string
  placeholder?: string
  styleProps?: {
    itemClassName?: string
    labelClassName?: string
    calendarClassName?: string
    subtitleClassName?: string
    messageClassName?: string
  }
  isRowDirection?: boolean
  dateFormat?: string
  isEnableFutureDate?: boolean
}

function RHFCalendarPickerInput<T extends FieldValues>(
  props: RHFCalendarPickerInputProps<T>
) {
  const { control } = useFormContext()
  const {
    name,
    label,
    required = false,
    subtitle = "The US date format is mm-dd-yyyy",
    placeholder,
    styleProps = {},
    isRowDirection = false,
    dateFormat,
    isEnableFutureDate = false
  } = props

  const {
    labelClassName,
    calendarClassName,
    subtitleClassName,
    messageClassName
  } = styleProps

  const handleSelectDate =
    (field: ControllerRenderProps<FieldValues, Path<T>>) =>
    (date: Date | undefined) => {
      field.onChange(date?.toISOString())
    }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full col-span-12", props.className)}>
          <FormLabel className={cn("text-text-secondary", labelClassName)}>
            {label}
            {required ? <RequiredSymbol /> : null}
            {isRowDirection ? <FormMessage /> : null}
          </FormLabel>
          <FormControl>
            <CalendarDatePicker
              className={cn("w-full", calendarClassName)}
              contentClassName="w-full"
              dateFormat={dateFormat}
              id={name}
              isEnableFutureDate={isEnableFutureDate}
              placeholder={placeholder}
              triggerClassName="w-full text-sm"
              value={field.value}
              onSelectDate={handleSelectDate(field)}
            />
          </FormControl>

          <div className={cn("text-xs text-text-tertiary", subtitleClassName)}>
            {subtitle}
          </div>
          {!isRowDirection && <FormMessage className={messageClassName} />}
        </FormItem>
      )}
    />
  )
}

export default memo(RHFCalendarPickerInput)
