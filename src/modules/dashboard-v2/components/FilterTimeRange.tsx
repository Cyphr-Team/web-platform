import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import { REQUEST_LIMIT_PARAM_FOR_SELECT } from "@/constants"
import { type Option } from "@/types/common.type"
import { TimeRangeValue } from "@/types/time-range.type"
import { zodResolver } from "@hookform/resolvers/zod"
import debounce from "lodash.debounce"
import { ClipboardCheck } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { type DateRange } from "react-day-picker"
import { type DeepPartial, useForm } from "react-hook-form"
import * as z from "zod"
import { useQuerySelectLoanProgramList } from "@/hooks/useQuerySelectList/useQuerySelectLoanProgramList.ts"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardActionType } from "../types/stats.types"
import { SelectTimeRange } from "./atoms/SelectTimeRange"

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
  const { dashboardState, dashboardDispatch } = useDashboard()
  const [showDatePicker, setShowDatePicker] = useState(
    dashboardState.filter.timeRange.selectedTimeRange !==
      TimeRangeValue.ALL_TIME
  )

  const { data } = useQuerySelectLoanProgramList({
    limit: REQUEST_LIMIT_PARAM_FOR_SELECT,
    offset: 0
  })

  const loanPrograms = data?.data

  const loanProgramOptions: Option[] =
    loanPrograms?.map((loanProgram) => ({
      label: loanProgram.name,
      value: loanProgram.id
    })) ?? []

  const form = useForm<FilterValues>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      timeRange: dashboardState.filter.timeRange,
      loanProgramIds: []
    }
  })

  // Will be created only once initially
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSubmit = useCallback(
    debounce((formValues: DeepPartial<FilterValues>) => {
      if (formValues.timeRange)
        dashboardDispatch({
          type: DashboardActionType.UpdateTimeRange,
          payload: formValues.timeRange
        })

      if (formValues.loanProgramIds)
        dashboardDispatch({
          type: DashboardActionType.UpdateLoanProgramIds,
          payload:
            formValues.loanProgramIds
              ?.map((loanProgram) => loanProgram?.value ?? "")
              .filter(Boolean) ?? []
        })
    }, 400),
    []
  )

  const customSelectTimeRangeOnChange = () => {
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
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      handleSubmit(value)
    })

    return () => subscription.unsubscribe()
  }, [form, handleSubmit])

  return (
    <div>
      <Form {...form}>
        <form>
          <div className="flex flex-wrap gap-4">
            {/* If the Lender only has 1 loan program, we should just hide this field. */}
            {loanProgramOptions.length > 1 && (
              <FormField
                control={form.control}
                name="loanProgramIds"
                render={({ field }) => (
                  <MultiSelect
                    customAllText="All programs"
                    field={field}
                    name="loanProgramIds"
                    options={loanProgramOptions}
                    prefixIcon={
                      <ClipboardCheck className="mr-2 size-5 text-muted-foreground" />
                    }
                  />
                )}
              />
            )}

            <div className="date-select-coupling group flex items-end">
              <SelectTimeRange customOnChange={customSelectTimeRangeOnChange} />

              {showDatePicker ? (
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
              ) : null}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
