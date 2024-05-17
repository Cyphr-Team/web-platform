import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multi-select"
import { REQUEST_LIMIT_PARAM_FOR_SELECT } from "@/constants"
import { Option } from "@/types/common.type"
import { TimeRangeValue } from "@/types/time-range.type"
import { checkIsLenderAdmin } from "@/utils/check-roles"
import { zodResolver } from "@hookform/resolvers/zod"
import { startOfMonth, subMonths } from "date-fns"
import debounce from "lodash.debounce"
import { ClipboardCheck } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { DateRange } from "react-day-picker"
import { DeepPartial, useForm } from "react-hook-form"
import * as z from "zod"
import { useQuerySelectLoanProgramList } from "../../../hooks/useQuerySelectList/useQuerySelectLoanProgramList"
import { useDashboard } from "../providers/dashboard-provider"
import { DashboardActionType } from "../types/stats.types"
import { SelectTimeRange } from "./atoms/SelectTimeRange"
import { isEnableLenderDashboardV2DummyData } from "@/utils/feature-flag.utils"
import { loanProgramsDummyData } from "@/constants/data/dashboard/loanPrograms"

const FilterSchema = z.object({
  loanProgramIds: z.array(z.object({ label: z.string(), value: z.string() })),
  timeRange: z.object({
    selectedTimeRange: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional()
  })
})

type FilterValues = z.infer<typeof FilterSchema>

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

  const loanPrograms = isEnableLenderDashboardV2DummyData()
    ? loanProgramsDummyData
    : data?.data

  const loanProgramOptions: Option[] =
    loanPrograms?.map((loanProgram) => ({
      label: loanProgram.name,
      value: loanProgram.id
    })) ?? []

  // 3 months before now
  const threeMonthsBefore = startOfMonth(subMonths(new Date(), 2))

  // TODO: Support officer
  const isLenderAdmin = checkIsLenderAdmin()

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
            {isLenderAdmin && (
              <FormField
                control={form.control}
                name="loanProgramIds"
                render={({ field }) => (
                  <MultiSelect
                    prefixIcon={
                      <ClipboardCheck className="w-5 h-5 text-muted-foreground mr-2" />
                    }
                    name="loanProgramIds"
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
