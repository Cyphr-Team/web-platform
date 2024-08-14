import { cn } from "@/lib/utils.ts"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover.tsx"
import { Button, ButtonProps } from "@/components/ui/button.tsx"
import { format } from "date-fns"
import { CalendarPlus } from "lucide-react"
import { Calendar, CalendarProps } from "@/components/ui/calendar.tsx"
import React, { memo, ReactNode, useId } from "react"

interface Props {
  value: string
  onTrigger: React.MouseEventHandler<HTMLButtonElement> | undefined
  onChange: (date: Date | undefined) => void
  prefixLabel?: ReactNode
  placeholder?: ReactNode
  styleProps?: Partial<{
    className: string
    triggerClassName: string
    contentClassName: string
  }>

  CalendarProps?: CalendarProps
  TriggerProps?: ButtonProps
}

const CalendarPickerPopover = (props: Props) => {
  const {
    value,
    styleProps = {},
    prefixLabel,
    placeholder,
    onTrigger,
    onChange,
    TriggerProps,
    CalendarProps
  } = props

  const { className, triggerClassName, contentClassName } = styleProps
  const id = useId()
  // TODO: refactor these className for re-usable
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            onClick={onTrigger}
            id={`${id}-button`}
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal flex justify-between gap-2 text-base",
              !value && "text-muted-foreground",
              triggerClassName
            )}
            {...TriggerProps}
          >
            {prefixLabel && (
              <span className="text-slate-700">{prefixLabel}</span>
            )}
            {value ? (
              <span id={`${id}-value`}>{format(value, "MM - dd - y")}</span>
            ) : (
              <span className="text-text-tertiary">{placeholder}</span>
            )}
            <CalendarPlus className="h-5 w-5 text-text-tertiary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", contentClassName)}>
          <Calendar
            {...CalendarProps}
            id={`${id}-calendar`}
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (onChange) {
                onChange(date)
              }
            }}
            disabled={(date) =>
              (CalendarProps?.fromDate && date < CalendarProps.fromDate) ||
              (CalendarProps?.toDate && date > CalendarProps.toDate) ||
              date > new Date() ||
              date < new Date(1900, 0, 1)
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default memo(CalendarPickerPopover)
