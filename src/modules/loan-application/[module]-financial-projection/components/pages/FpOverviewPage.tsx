import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper.tsx"
import { cn } from "@/lib/utils.ts"
import { CashFlowGlanceCard } from "@/modules/loan-application/[module]-financial-projection/components/molecules/CashFlowGlanceCard.tsx"
import {type PropsWithChildren, useState} from "react"
import { useParams } from "react-router-dom"
import { valueOrZero } from "@/utils"
import _ from "lodash"
import {SelectTimeRange} from "@/modules/loan-application-management/components/atoms/SelectTimeRange";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {DatePickerWithRange} from "@/components/ui/date-picker-with-range";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TimeRangeValue} from "@/types/time-range.type";
import {getTimeRangeDates} from "@/utils/time-range.utils";
import * as z from "zod";
import {
  useQueryLoanReadyGetCashFlowAnalysis
} from "@/modules/loan-application/[module]-financial-projection/hooks/forecasting-results/useQueryLoanReadyGetCashFlowAnalysis";
import {DateRange} from "react-day-picker";

type FilterValues = z.infer<typeof FilterSchema>

const FilterSchema = z.object({
  timeRange: z.object({
    selectedTimeRange: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional()
  })
})

export function Component() {
  const { id: applicationId } = useParams()

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

  const { data: cashFlow, isLoading } = useQueryLoanReadyGetCashFlowAnalysis({
    applicationId: applicationId!,
    from: form.watch("timeRange").from ?? new Date(),
    to: form.watch("timeRange").to ?? new Date(),
    enabled: !!applicationId
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

  const handleSetDate = (range?: DateRange) => {
    form.setValue("timeRange", {
      from: range?.from,
      to: range?.to,
      selectedTimeRange: TimeRangeValue.CUSTOM
    })
  }

  return (
    <div className="flex flex-col gap-y-6xl">
      <Section>
        <Title>Cash Flow at a Glance</Title>
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
        <Layout isLoading={isLoading}>
          <Grid>
            <CashFlowGlanceCard
              title="Revenue"
              type="currency"
              value={valueOrZero(cashFlow?.revenue)}
            />
            <CashFlowGlanceCard
              title="Operating Expenses"
              type="currency"
              value={valueOrZero(cashFlow?.operatingExpenses)}
            />
            <CashFlowGlanceCard
              title="Net Operating Income (NOI)"
              type="currency"
              value={valueOrZero(cashFlow?.netOperatingIncome)}
            />
            <CashFlowGlanceCard
              title="Operating Margin"
              type="percent"
              value={valueOrZero(cashFlow?.operatingMargin)}
            />
            <CashFlowGlanceCard
              title="Total Debt Service (TDS)"
              type="currency"
              value={valueOrZero(cashFlow?.totalDebtService)}
            />
            <CashFlowGlanceCard
              title="Debt Service Coverage (DSCR)"
              type="default"
              value={valueOrZero(cashFlow?.debtServiceCoverage)}
            />
            <CashFlowGlanceCard
              title="Debt-to-Income (DTI)"
              type="percent"
              value={valueOrZero(cashFlow?.debtToIncome)}
            />
            <CashFlowGlanceCard
              title="Cash Flow Assessment"
              value={_.startCase(cashFlow?.ratingScale.toLowerCase())}
            />
          </Grid>
        </Layout>
      </Section>

      <Section>
        <Title>Charts</Title>
        <div className="relative flex h-[20vh] items-center justify-center rounded border-2 border-dashed">
          <div className="sticky left-1/2 top-1/2 flex w-full flex-col items-center justify-center text-xl opacity-60">
            Coming soon
          </div>
        </div>
      </Section>
    </div>
  )
}

interface Layout extends PropsWithChildren {
  isLoading: boolean
}

function Layout({ isLoading, children }: Layout) {
  return (
    <div className="flex flex-col space-y-3xl">
      <LoadingWrapper
        className={cn(
          isLoading &&
            "flex min-h-40 items-center justify-center gap-4 rounded-lg border bg-white pb-10 shadow-sm"
        )}
        isLoading={isLoading}
      >
        {children}
      </LoadingWrapper>
    </div>
  )
}

function Title({ children }: PropsWithChildren) {
  return <h1 className="text-2xl font-semibold">{children}</h1>
}

function Section({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-y-4xl">{children}</div>
}

function Grid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      {children}
    </div>
  )
}
