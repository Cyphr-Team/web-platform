import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { CashFlowCard } from "@/modules/conference-demo/admin/components/atoms"
import { BankAccountReport } from "@/modules/conference-demo/admin/components/molecules"
import { MOCK_CONNECTED_BANK_ACCOUNTS } from "@/modules/conference-demo/admin/constants/data"
import { SectionTitle } from "@/modules/loan-application-management/components/atoms/cashflows/SectionTitle"
import { SelectTimeRange } from "@/modules/loan-application-management/components/atoms/SelectTimeRange"
import { TimeRangeValue } from "@/types/time-range.type"
import { toCurrency } from "@/utils"
import { getTimeRangeDates } from "@/utils/time-range.utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import { useForm } from "react-hook-form"
import * as z from "zod"

const CashFlow = () => {
  const cashFlowCurrency = (value: number) => toCurrency(value, 0)

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

  const handleSetDate = (range?: DateRange) => {
    form.setValue("timeRange", {
      from: range?.from,
      to: range?.to,
      selectedTimeRange: TimeRangeValue.CUSTOM
    })
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="group date-select-coupling flex items-end -mb-4">
        <Form {...form}>
          <form>
            <div className="group date-select-coupling flex items-end">
              <SelectTimeRange
                customOnChange={customSelectTimeRangeOnChange}
                showLabel={false}
                showExtendedTimeRange={true}
              />

              {showDatePicker && (
                <div className="flex items-center flex-wrap">
                  <FormField
                    control={form.control}
                    name="timeRange"
                    render={({ field: { value } }) => (
                      <FormItem className="flex items-end space-y-0 gap-1">
                        <DatePickerWithRange
                          date={value}
                          setDate={handleSetDate}
                          className="w-full mt-0 rounded-l-none"
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

      <div>
        <SectionTitle className="mb-6">Cash Flow at a Glance</SectionTitle>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
          <CashFlowCard
            label="Revenue / Gross Income"
            value={cashFlowCurrency(210_000)}
          />
          <CashFlowCard
            label="Operating Expenses"
            value={cashFlowCurrency(140_000)}
          />
          <CashFlowCard
            label="Net Operating Income (NOI)"
            value={cashFlowCurrency(70_000)}
          />
          <CashFlowCard label="Operating Margin" value="33.4%" />
          <CashFlowCard
            label="Total Debt Service (TDS)"
            value={cashFlowCurrency(35_000)}
          />
          <CashFlowCard label="Debt Service Coverage (DSCR)" value="1.5" />
          <CashFlowCard label="Debt-to-Income (DTI)" value="33.5%" />
          <CashFlowCard label="Cash Flow Assessment" value="Healthy" />
        </div>
      </div>

      <div>
        <SectionTitle className="mb-6">Connected Bank Accounts</SectionTitle>
        {MOCK_CONNECTED_BANK_ACCOUNTS?.map((data, index) => (
          <BankAccountReport key={index} data={data} />
        ))}
      </div>
    </div>
  )
}

export default CashFlow

const FilterSchema = z.object({
  timeRange: z.object({
    selectedTimeRange: z.string().optional(),
    from: z.date().optional(),
    to: z.date().optional()
  })
})

type FilterValues = z.infer<typeof FilterSchema>
