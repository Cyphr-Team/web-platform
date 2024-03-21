import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { TimeRangeFilterSchema } from "@/constants/time-range-filter.constants"
import { CalendarDatePicker } from "@/shared/molecules/date-picker"
import { TimeRangeFilterValue, TimeRangeValue } from "@/types/time-range.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SelectTimeRange } from "./SelectTimeRange"

export const FilterTimeRange = () => {
  const form = useForm<TimeRangeFilterValue>({
    resolver: zodResolver(TimeRangeFilterSchema),
    defaultValues: {
      timeRange: {
        from: new Date().toISOString(),
        to: new Date().toISOString()
      }
    }
  })

  const handleSelectFromDate = (date: Date | undefined) => {
    form.setValue("timeRange.from", date?.toISOString() ?? "")
    form.setValue("timeRange.selectedTimeRange", TimeRangeValue.CUSTOM)
  }

  const handleSelectToDate = (date: Date | undefined) => {
    form.setValue("timeRange.to", date?.toISOString() ?? "")
    form.setValue("timeRange.selectedTimeRange", TimeRangeValue.CUSTOM)
  }

  return (
    <div className="border p-4 rounded-lg bg-zinc-300 bg-opacity-10 w-full">
      <Form {...form}>
        <form>
          <div className="flex items-end gap-4">
            <SelectTimeRange />

            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="timeRange.from"
                render={({ field }) => (
                  <FormItem className="flex items-end space-y-0 gap-1">
                    <FormLabel className="self-center">From: </FormLabel>
                    <CalendarDatePicker
                      value={field.value}
                      onSelectDate={handleSelectFromDate}
                      className="w-full mt-0"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeRange.to"
                render={({ field }) => (
                  <FormItem className="flex items-end space-y-0 gap-1">
                    <FormLabel className="self-center">To:</FormLabel>
                    <CalendarDatePicker
                      value={field.value}
                      onSelectDate={handleSelectToDate}
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
