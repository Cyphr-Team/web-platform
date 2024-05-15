import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { TimeRangeFilterSchema } from "@/constants/time-range-filter.constants"
import { TimeRangeFilterValue, TimeRangeValue } from "@/types/time-range.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { DateRange } from "react-day-picker"
import { useForm } from "react-hook-form"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardActionType } from "../types/stats.types"
import { SelectTimeRange } from "./SelectTimeRange"
import { useCallback, useState } from "react"
import debounce from "lodash.debounce"
import { startOfMonth, subMonths } from "date-fns"

export const FilterTimeRange = () => {
  const { dashboardState, dashboardDispatch } = useDashboard()
  const [showDatePicker, setShowDatePicker] = useState(
    dashboardState.filter.timeRange.selectedTimeRange !==
      TimeRangeValue.ALL_TIME
  )

  // 3 months before now
  const threeMonthsBefore = startOfMonth(subMonths(new Date(), 2))

  const form = useForm<TimeRangeFilterValue>({
    resolver: zodResolver(TimeRangeFilterSchema),
    defaultValues: {
      timeRange: dashboardState.filter.timeRange
    }
  })

  // Will be created only once initially
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(
    debounce(
      form.handleSubmit((data) => {
        dashboardDispatch({
          type: DashboardActionType.UpdateTimeRange,
          payload: data.timeRange
        })
      }),
      400
    ),
    []
  )

  const customSelectTimeRangeOnChange = () => {
    handleSubmit()
    setShowDatePicker(
      form.getValues("timeRange").selectedTimeRange !== TimeRangeValue.ALL_TIME
    )
  }

  const handleSetDate = (range?: DateRange) => {
    form.setValue("timeRange", {
      from: range?.from,
      to: range?.to,
      selectedTimeRange: TimeRangeValue.CUSTOM
    })
    if (range?.from && range?.to) handleSubmit()
  }

  return (
    <div className="border p-4 rounded-lg bg-zinc-300 bg-opacity-10 w-full">
      <Form {...form}>
        <form>
          <div className="flex items-end gap-4 flex-wrap">
            <SelectTimeRange
              customOnChange={customSelectTimeRangeOnChange}
              showLabel={false}
            />

            {showDatePicker && (
              <div className="flex items-center gap-2 flex-wrap">
                <FormField
                  control={form.control}
                  name="timeRange"
                  render={({ field: { value } }) => (
                    <FormItem className="flex items-end space-y-0 gap-1">
                      <DatePickerWithRange
                        date={value}
                        setDate={handleSetDate}
                        className="w-full mt-0"
                        disabled={{
                          from: threeMonthsBefore
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
