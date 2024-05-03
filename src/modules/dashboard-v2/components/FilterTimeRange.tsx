import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import { REQUEST_LIMIT_PARAM_FOR_SELECT } from "@/constants"
import { TimeRangeFilterSchema } from "@/constants/time-range-filter.constants"
import { Option } from "@/types/common.type"
import { TimeRangeFilterValue, TimeRangeValue } from "@/types/time-range.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { startOfMonth, subMonths } from "date-fns"
import debounce from "lodash.debounce"
import { ClipboardCheck } from "lucide-react"
import { useCallback, useState } from "react"
import { DateRange } from "react-day-picker"
import { useForm } from "react-hook-form"
import { useQuerySelectLoanProgramList } from "../../../hooks/useQuerySelectList/useQuerySelectLoanProgramList"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardActionType } from "../types/stats.types"
import { SelectTimeRange } from "./atoms/SelectTimeRange"
import { checkIsLenderAdmin } from "@/utils/check-roles"

export const FilterTimeRange = () => {
  const { dashboardState, dashboardDispatch } = useDashboard()
  const [showDatePicker, setShowDatePicker] = useState(
    dashboardState.filter.timeRange.selectedTimeRange !==
      TimeRangeValue.ALL_TIME
  )

  const { data } = useQuerySelectLoanProgramList({
    limit: REQUEST_LIMIT_PARAM_FOR_SELECT,
    offset: 0
  })

  const loanProgramOptions: Option[] =
    data?.data?.map((el) => ({
      label: el.name,
      value: el.name.toLowerCase()
    })) ?? []

  // 3 months before now
  const threeMonthsBefore = startOfMonth(subMonths(new Date(), 2))

  // TODO: Support officer
  const isLenderAdmin = checkIsLenderAdmin()

  const form = useForm<
    TimeRangeFilterValue & {
      programNames: string[]
    }
  >({
    resolver: zodResolver(TimeRangeFilterSchema),
    defaultValues: {
      timeRange: dashboardState.filter.timeRange,
      programNames: []
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
    <div>
      <Form {...form}>
        <form>
          <div className="flex flex-wrap gap-4">
            {isLenderAdmin && (
              <FormField
                control={form.control}
                name="programNames"
                render={({ field }) => (
                  <MultiSelect
                    prefixIcon={
                      <ClipboardCheck className="w-5 h-5 text-muted-foreground mr-2" />
                    }
                    name="programNames"
                    field={field}
                    options={loanProgramOptions}
                  />
                )}
              />
            )}

            <div className="group date-select-coupling flex items-end">
              <SelectTimeRange customOnChange={customSelectTimeRangeOnChange} />

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
                          className="w-full mt-0 rounded-l-none"
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
          </div>
        </form>
      </Form>
    </div>
  )
}
