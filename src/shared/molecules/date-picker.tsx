"use client"

import * as React from "react"
import { format } from "date-fns"
import {} from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { CalendarPlus } from "lucide-react"

interface CalendarDatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  value?: string
  fromDate?: Date
  toDate?: Date
  onSelectDate?: (date: Date | undefined) => void
  disabled?: boolean
}

export function CalendarDatePicker({
  className,
  value,
  onSelectDate,
  disabled,
  toDate,
  fromDate,
  id
}: CalendarDatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={`${id}-button`}
            disabled={disabled}
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal flex justify-between gap-2 text-base",
              !value && "text-muted-foreground"
            )}
          >
            {value ? (
              format(value, "MM - dd - y")
            ) : (
              <span className="text-text-tertiary">i.e: 01/01/1990</span>
            )}
            <CalendarPlus className="h-5 w-5 text-text-tertiary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
