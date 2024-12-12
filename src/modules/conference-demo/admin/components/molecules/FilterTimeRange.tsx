import { MultiSelect } from "@/components/ui/multi-select"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { ClipboardCheck } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { type Option } from "@/types/common.type"
import { SelectTimeRange } from "@/modules/dashboard-v2/components/atoms/SelectTimeRange"
import { DEFAULT_DASHBOARD_STATE } from "@/modules/dashboard-v2/constants/dashboard.constants"
import { MOCK_LOAN_PROGRAMS } from "../../constants/data"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { DateRange } from "react-day-picker"
import { TimeRangeValue } from "@/types/time-range.type"

const FilterSchema = z.object({
  loanProgramIds: z.array(z.object({ label: z.string(), value: z.string() })),
  timeRange: z.object({
    selectedTimeRange: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional()
  })
})

type FilterValues = z.infer<typeof FilterSchema>

export function FilterTimeRange() {
  const form = useForm<FilterValues>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      timeRange: DEFAULT_DASHBOARD_STATE.filter.timeRange,
      loanProgramIds: []
    }
  })
  const loanProgramOptions: Option[] = MOCK_LOAN_PROGRAMS.map(
    (loanProgram) => ({
      label: loanProgram.name,
      value: loanProgram.id
    })
  )

  const handleSetDate = (range?: DateRange) => {
    form.setValue("timeRange", {
      from: range?.from,
      to: range?.to,
      selectedTimeRange: TimeRangeValue.CUSTOM
    })
  }

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-wrap gap-4">
          <FormField
            control={form.control}
            name="loanProgramIds"
            render={({ field }) => (
              <MultiSelect
                customAllText="All programs"
                field={field}
                options={loanProgramOptions}
                name="loanProgramIds"
                prefixIcon={
                  <ClipboardCheck className="mr-2 size-5 text-muted-foreground" />
                }
              />
            )}
          />
          <div className="date-select-coupling group flex items-end">
            <SelectTimeRange />
            <div className="flex flex-wrap items-center gap-2">
              <FormField
                control={form.control}
                name="timeRange"
                render={({ field: { value } }) => (
                  <FormItem className="flex items-end gap-1 space-y-0">
                    <DatePickerWithRange
                      className="mt-0 w-full rounded-l-none"
                      date={value}
                      setDate={handleSetDate}
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
