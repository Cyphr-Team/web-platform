import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { format } from "date-fns"
import { ChevronDown } from "lucide-react"

import { useState } from "react"

enum TIME_PERIOD {
  ALL_TIMES = "ALL_TIMES",
  PAST_1_MONTH = "PAST_1_MONTH",
  PAST_3_MONTHS = "PAST_3_MONTHS",
  PAST_6_MONTHS = "PAST_6_MONTHS",
  PAST_12_MONTHS = "PAST_12_MONTHS",
  CUSTOM = "CUSTOM"
}

const TIME_PERIODS = [
  {
    label: "All Times",
    value: TIME_PERIOD.ALL_TIMES
  },
  {
    label: "Past 1 Month",
    value: TIME_PERIOD.PAST_1_MONTH
  },
  {
    label: "Past 3 Months",
    value: TIME_PERIOD.PAST_3_MONTHS
  },
  {
    label: "Past 6 Months",
    value: TIME_PERIOD.PAST_6_MONTHS
  },
  {
    label: "Past 12 Months",
    value: TIME_PERIOD.PAST_12_MONTHS
  },
  {
    label: "Custom",
    value: TIME_PERIOD.CUSTOM
  }
]

export function DateRangeFilter() {
  const [selectedValue, setSelectedValue] = useState<string>(
    TIME_PERIOD.ALL_TIMES
  )
  const [open, setOpen] = useState(false)

  const [fromDate, setFromDate] = useState<string | undefined>(undefined)
  const [toDate, setToDate] = useState<string | undefined>(undefined)

  const { onChangeTimeRangeFilter } = useLoanApplicationDetailContext()

  const handleChange = (value: string) => {
    setSelectedValue(value)
    if (value !== TIME_PERIOD.CUSTOM) {
      if (value === TIME_PERIOD.ALL_TIMES) {
        onChangeTimeRangeFilter(null, null)
        setFromDate(undefined)
        setToDate(undefined)
      } else {
        const dateRange = extractDateRange(value)
        const fromDate = format(dateRange.from, "yyyy-MM-dd")
        const toDate = format(dateRange.to, "yyyy-MM-dd")

        setFromDate(fromDate)
        setToDate(toDate)
        onChangeTimeRangeFilter(fromDate, toDate)
      }

      setOpen(false)
    }
  }

  const handleReset = () => {
    setSelectedValue(TIME_PERIODS[0].value)
  }

  const handleApplyCustomDateRange = () => {
    onChangeTimeRangeFilter(fromDate || null, toDate || null)
    setOpen(false)
  }

  const handleChangeFromDate = (date?: Date) => {
    setFromDate(date ? format(date, "yyyy-MM-dd") : undefined)
  }

  const handleChangeToDate = (date?: Date) => {
    setToDate(date ? format(date, "yyyy-MM-dd") : undefined)
  }

  const extractDateRange = (timePeriod: string) => {
    switch (timePeriod) {
      case TIME_PERIOD.PAST_1_MONTH:
        return {
          from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          to: new Date()
        }
      case TIME_PERIOD.PAST_3_MONTHS:
        return {
          from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
          to: new Date()
        }
      case TIME_PERIOD.PAST_6_MONTHS:
        return {
          from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
          to: new Date()
        }
      case TIME_PERIOD.PAST_12_MONTHS:
        return {
          from: new Date(new Date().setMonth(new Date().getMonth() - 12)),
          to: new Date()
        }
      default:
        return {
          from: new Date(),
          to: new Date()
        }
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex cursor-pointer items-center rounded-md border px-4 py-2 font-medium">
          <span className="w-32">
            {TIME_PERIODS.find((v) => v.value === selectedValue)?.label ??
              "All Times"}
          </span>
          <ChevronDown className="ml-2 size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0 pt-2">
        {TIME_PERIODS.map((option, id: number) => (
          <Button
            key={`${option.value}-${id}`}
            className="relative flex w-full cursor-pointer select-none items-center justify-start rounded-sm px-4 py-1.5 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-accent"
            data-selected={selectedValue === option.value}
            variant="ghost"
            onClick={() => handleChange(option.value)}
          >
            <span>{option.label}</span>
          </Button>
        ))}
        <Separator />
        {selectedValue === TIME_PERIOD.CUSTOM && (
          <div className="mt-2 flex flex-col gap-1 p-2 text-xs">
            <span>From</span>
            <CalendarDatePicker
              toDate={toDate ? new Date(toDate) : undefined}
              value={fromDate}
              onSelectDate={handleChangeFromDate}
            />
            <span>To</span>
            <CalendarDatePicker
              fromDate={fromDate ? new Date(fromDate) : undefined}
              value={toDate}
              onSelectDate={handleChangeToDate}
            />
            <div className="flex w-full justify-end p-2">
              <Button
                className="text-xs"
                size="sm"
                variant="outline"
                onClick={handleReset}
              >
                RESET
              </Button>
              <Button
                className="ml-2 text-xs"
                size="sm"
                variant="outline"
                onClick={handleApplyCustomDateRange}
              >
                APPLY
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
