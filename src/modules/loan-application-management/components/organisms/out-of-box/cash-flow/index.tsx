import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { SelectTimeRange } from "../../../atoms/SelectTimeRange"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { getTimeRangeDates } from "@/utils/time-range.utils"
import { TimeRangeValue } from "@/types/time-range.type"
import { type DateRange } from "react-day-picker"
import { SectionTitle } from "../../../atoms/cashflows/SectionTitle"
import { Separator } from "@/components/ui/separator"
import { NoiAndTotalDebtPaymentsChart } from "./NoiAndTotalDebtPaymentsChart"
import { RevenueAndExpenseChart } from "./RevenueAndExpenseChart"
import { format } from "date-fns"
import { CashflowGlanceReport } from "./CashflowGlance"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { FeatureKey } from "@/hooks/useCanAccess"
import { isCapitalCollab } from "@/utils/domain.utils"

type FilterValues = z.infer<typeof FilterSchema>

const FilterSchema = z.object({
  timeRange: z.object({
    selectedTimeRange: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional()
  })
})

export function Cashflow() {
  const {
    newCashFlowGlance,
    isFetchingNewCashFlow,
    onChangeNewTimeRangeFilter
  } = useLoanApplicationDetailContext()

  const [showDatePicker, setShowDatePicker] = useState(true)

  const form = useForm<FilterValues>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      timeRange: {
        selectedTimeRange: TimeRangeValue.LAST_12_MONTHS,
        ...getTimeRangeDates(TimeRangeValue.LAST_12_MONTHS)
      }
    }
  })

  const customSelectTimeRangeOnChange = () => {
    setShowDatePicker(
      form.getValues("timeRange").selectedTimeRange !== TimeRangeValue.ALL_TIME
    )
    form.setValue(
      "timeRange.selectedTimeRange",
      form.getValues("timeRange").selectedTimeRange
    )
  }

  useEffect(() => {
    const subscription = form.watch(() => {
      const value = form.getValues("timeRange")
        .selectedTimeRange as TimeRangeValue

      if (value !== TimeRangeValue.CUSTOM) {
        const dateRange = getTimeRangeDates(value)
        const fromDate = format(dateRange.from, "yyyy-MM-dd")
        const toDate = format(dateRange.to, "yyyy-MM-dd")

        onChangeNewTimeRangeFilter(fromDate, toDate)
      } else {
        const fromDate = form.getValues("timeRange").from
        const toDate = form.getValues("timeRange").to

        if (!!fromDate && !!toDate) {
          onChangeNewTimeRangeFilter(
            format(fromDate, "yyyy-MM-dd"),
            format(toDate, "yyyy-MM-dd")
          )
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [form, onChangeNewTimeRangeFilter])

  const handleSetDate = (range?: DateRange) => {
    form.setValue("timeRange", {
      from: range?.from,
      to: range?.to,
      selectedTimeRange: TimeRangeValue.CUSTOM
    })
  }

  return (
    <div className="flex flex-col space-y-3xl">
      {isCapitalCollab() && <SectionTitle>Cash Flow at a Glance</SectionTitle>}
      <div className="date-select-coupling group flex items-end">
        <Form {...form}>
          <form>
            <div className="date-select-coupling group flex items-end">
              <SelectTimeRange
                showExtendedTimeRange
                customOnChange={customSelectTimeRangeOnChange}
                showLabel={false}
              />

              {showDatePicker ? (
                <div className="flex flex-wrap items-center">
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
          </form>
        </Form>
      </div>
      <CashflowGlanceReport
        isFetchingNewCashFlow={isFetchingNewCashFlow}
        newCashFlowGlance={newCashFlowGlance}
      />
      {!isCapitalCollab() && (
        <>
          <Separator />
          <SectionTitle>Charts and Trends</SectionTitle>
          <RevenueAndExpenseChart />
          <FeatureRenderer featureKey={FeatureKey.OPERATING_EXPENSE}>
            <NoiAndTotalDebtPaymentsChart />
          </FeatureRenderer>
        </>
      )}
    </div>
  )
}
