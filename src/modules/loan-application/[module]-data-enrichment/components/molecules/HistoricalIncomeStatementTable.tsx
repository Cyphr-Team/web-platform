import { cn } from "@/lib/utils.ts"
import { HistoricalMonthlyHeader } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/HistoricalMonthlyHeader.tsx"
import { HistoricalDataRow } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/HistoricalDataRow.tsx"
import { HistoricalIncomeStatementField } from "@/modules/loan-application/[module]-data-enrichment/types/historical-statements.ts"
import { Card } from "@/components/ui/card.tsx"
import type { HistoricalStatementDataRow } from "@/modules/loan-application/[module]-data-enrichment/types"
import type { HeaderProps } from "@/modules/loan-application/[module]-financial-projection/constants"

interface Props {
  data: HistoricalStatementDataRow
  headerProps: HeaderProps
  isPdf?: boolean
}

export function HistoricalIncomeStatementTable(props: Props) {
  const { isPdf, data, headerProps } = props

  return (
    <Card
      className={cn(
        isPdf ? null : "shadow-primary",
        "flex flex-col rounded-xl"
      )}
    >
      <div className="rounded-xl overflow-x-auto overflow-y-visible">
        <div className={cn("bg-white", "min-w-max")}>
          <HistoricalMonthlyHeader {...headerProps} />

          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.REVENUE]}
            layout="total"
            title="Total Revenue"
          />

          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.RECURRING_CHARGE_REVENUE]}
            layout="item"
            title="Recurring Charges"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.CONTRACT_REVENUE]}
            layout="item"
            title="Contract Revenue"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.BILLABLE_HOURS_REVENUE]}
            layout="item"
            title="Billable Hours Revenue"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.UNIT_SALES_REVENUE]}
            layout="item"
            title="Unit Sales Revenue"
          />

          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.COGS]}
            layout="total"
            title="COGS"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.GROSS_PROFIT]}
            layout="total"
            title="Gross Profit"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.GROSS_PROFIT_MARGIN]}
            layout="percentage"
            title="Gross Profit Margin"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.OPERATING_EXPENSES]}
            layout="total"
            title="Operating Expenses"
          />
          <HistoricalDataRow
            data={
              data[HistoricalIncomeStatementField.OPERATING_EXPENSES_ACCOUNTING]
            }
            layout="item"
            title="Accounting Expenses"
          />
          <HistoricalDataRow
            data={
              data[HistoricalIncomeStatementField.OPERATING_EXPENSES_INSURANCE]
            }
            layout="item"
            title="Insurance Expenses"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.OPERATING_EXPENSES_LEGAL]}
            layout="item"
            title="Legal Expenses"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.OPERATING_EXPENSES_RENT]}
            layout="item"
            title="Rent Expenses"
          />
          <HistoricalDataRow
            data={
              data[
                HistoricalIncomeStatementField
                  .OPERATING_EXPENSES_SALARIES_AND_BENEFITS
              ]
            }
            layout="item"
            title="Salaries & Benefits Expenses"
          />
          <HistoricalDataRow
            data={
              data[HistoricalIncomeStatementField.OPERATING_EXPENSES_TRAVEL]
            }
            layout="item"
            title="Travel Expenses"
          />
          <HistoricalDataRow
            data={
              data[HistoricalIncomeStatementField.OPERATING_EXPENSES_UTILITIES]
            }
            layout="item"
            title="Utilities Expenses"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.OPERATING_EXPENSES_OTHER]}
            layout="item"
            title="Other Expenses"
          />

          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.EBITDA]}
            layout="total"
            title="EBITDA"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.EBIT]}
            layout="total"
            title="EBIT"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.INTEREST_INCOME]}
            layout="item"
            title="Interest Income"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.INTEREST_EXPENSE]}
            layout="item"
            title="Interest Expense"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.TAXES]}
            layout="item"
            title="Taxes"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.NET_INCOME]}
            layout="total"
            title="Net Income"
          />
          <HistoricalDataRow
            data={data[HistoricalIncomeStatementField.NET_PROFIT_MARGIN]}
            layout="percentage"
            title="Net Profit Margin"
          />
        </div>
      </div>
    </Card>
  )
}
