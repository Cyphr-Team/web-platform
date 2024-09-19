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
import { FooterProps } from "react-day-picker"

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
  dateFormat
}: CalendarDatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            onClick={onCustomClick}
            id={`${id}-button`}
            disabled={disabled}
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal flex justify-between gap-2 text-base",
              !value && "text-muted-foreground",
              triggerClassName
            )}
          >
            {prefixLabel && (
              <span className="text-slate-700">{prefixLabel}</span>
            )}
            {value ? (
              <span id={`${id}-value`}>
                {format(value, dateFormat ?? "MM - dd - y")}
              </span>
            ) : (
              <span className="text-text-tertiary">{placeholder}</span>
            )}
            <CalendarPlus className="h-5 w-5 text-text-tertiary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto p-0", contentClassName)}
          align={align}
        >
          <Calendar
            id={`${id}-calendar`}
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              if (onSelectDate) {
                onSelectDate(date)
              }
            }}
            disabled={(date) =>
              (fromDate && date < fromDate) ||
              (toDate && date > toDate) ||
              date > new Date() ||
              date < new Date(1900, 0, 1)
            }
            customFooter={customFooter}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
