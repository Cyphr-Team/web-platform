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
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  Path,
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
  styleProps?: {
    itemClassName?: string
    labelClassName?: string
    calendarClassName?: string
    subtitleClassName?: string
    messageClassName?: string
  }
}

const RHFCalendarPickerInput = <T extends FieldValues>(
  props: RHFCalendarPickerInputProps<T>
) => {
  const { control } = useFormContext()
  const {
    name,
    label,
    required = false,
    subtitle = "The US date format is mm-dd-yyyy",
    styleProps = {}
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
            {required && <RequiredSymbol />}
          </FormLabel>
          <FormControl>
            <CalendarDatePicker
              id={name}
              value={field.value}
              onSelectDate={handleSelectDate(field)}
              className={cn("w-full", calendarClassName)}
              triggerClassName="w-full text-sm"
              contentClassName="w-full"
            />
          </FormControl>

          <div className={cn("text-xs text-text-tertiary", subtitleClassName)}>
            {subtitle}
          </div>
          <FormMessage className={messageClassName} />
        </FormItem>
      )}
    />
  )
}

export default memo(RHFCalendarPickerInput)
