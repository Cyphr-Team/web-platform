import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
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

export const DateRangeFilter = () => {
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
        setFromDate(dateRange.from.toISOString())
        setToDate(dateRange.to.toISOString())
        onChangeTimeRangeFilter(
          dateRange.from.toISOString(),
          dateRange.to.toISOString()
        )
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
    setFromDate(date?.toISOString())
  }
  const handleChangeToDate = (date?: Date) => {
    setToDate(date?.toISOString())
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
        <div className="py-2 px-4 border rounded-md font-medium flex items-center cursor-pointer">
          <span className="w-32">
            {TIME_PERIODS.find((v) => v.value === selectedValue)?.label ??
              "All Times"}
          </span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 pt-2 w-52">
        {TIME_PERIODS.map((option, id: number) => (
          <Button
            data-selected={selectedValue === option.value}
            key={`${option.value}-${id}`}
            variant="ghost"
            className="relative justify-start flex w-full cursor-pointer select-none items-center rounded-sm px-4 py-1.5 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[selected=true]:bg-accent"
            onClick={() => handleChange(option.value)}
          >
            <span>{option.label}</span>
          </Button>
        ))}
        <Separator />
        <div className="mt-2 text-xs p-2 gap-1 flex flex-col">
          <span>From</span>
          <CalendarDatePicker
            value={fromDate}
            onSelectDate={handleChangeFromDate}
          />
          <span>To</span>
          <CalendarDatePicker
            onSelectDate={handleChangeToDate}
            value={toDate}
          />

          {selectedValue === TIME_PERIOD.CUSTOM && (
            <div className="flex p-2 w-full justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={handleReset}
              >
                RESET
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="ml-2 text-xs"
                onClick={handleApplyCustomDateRange}
              >
                APPLY
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
