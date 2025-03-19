"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { CalendarPlus } from "lucide-react"
import { type FooterProps } from "react-day-picker"
import { validDateWithinTimeRange } from "@/utils/date.utils"

interface CalendarDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  triggerClassName?: string
  contentClassName?: string
  customFooter?: (props: FooterProps) => JSX.Element | null
  value?: string
  fromDate?: Date
  toDate?: Date
  prefixLabel?: string
  placeholder?: string
  align?: "start" | "end" | "center"
  onSelectDate?: (date: Date | undefined) => void
  disabled?: boolean
  onCustomClick?: VoidFunction
  dateFormat?: string
  isEnableFutureDate?: boolean
}

export function CalendarDatePicker({
  onCustomClick,
  className,
  triggerClassName,
  contentClassName,
  customFooter,
  value,
  onSelectDate,
  disabled,
  toDate,
  prefixLabel,
  placeholder = "i.e: 01/01/1990",
  align = "start",
  fromDate,
  id,
  dateFormat,
  isEnableFutureDate
}: CalendarDatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "flex w-full justify-between gap-2 pl-3 text-left text-base font-normal",
              !value && "text-muted-foreground",
              triggerClassName
            )}
            disabled={disabled}
            id={`${id}-button`}
            variant="outline"
            onClick={onCustomClick}
          >
            {prefixLabel ? (
              <span className="text-slate-700">{prefixLabel}</span>
            ) : null}
            {value ? (
              <span id={`${id}-value`}>
                {format(value, dateFormat ?? "MM - dd - y")}
              </span>
            ) : (
              <span className="text-sm text-text-placeholder">
                {placeholder}
              </span>
            )}
            <CalendarPlus className="size-5 text-text-tertiary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          className={cn("w-auto p-0", contentClassName)}
        >
          <Calendar
            initialFocus
            customFooter={customFooter}
            disabled={(date) =>
              !validDateWithinTimeRange(
                date,
                fromDate,
                toDate,
                isEnableFutureDate
              )
            }
            id={`${id}-calendar`}
            isEnableFutureDate={isEnableFutureDate}
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (onSelectDate) {
                onSelectDate(date)
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
