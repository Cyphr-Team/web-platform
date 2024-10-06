import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"
import { DataRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"

type IncomeStatementTablePdfProps = {
  data: number[]
}

export const IncomeStatementTablePdf = ({
  data
}: IncomeStatementTablePdfProps) => {
  return (
    <div className="bg-white min-w-max rounded-xl border">
      <DateRow
        title="Income Statement"
        data={data}
        className="border-t-0"
        labelClassName="border-t-0"
        itemClassName="border-t-0 border-r-0"
      />
      <SectionRow title="Revenue" />
      <DataRow title="Recurring Charges" data={data} layout="item" />
      <DataRow title="Contract Revenue" data={data} layout="item" />
      <DataRow title="Unit Sales" data={data} layout="item" />
      <DataRow title="Billable Hours" data={data} layout="item" />

      <DataRow title="Total Revenue" data={data} layout="total" />
      <DataRow title="COGS" data={data} layout="total" />
      <DataRow title="Gross Profit" data={data} layout="total" collision />
      <DataRow title="Gross Profit Margin" data={data} layout="percentage" />

      <SectionRow title="Operating Expenses" />
      <DataRow title="Salaries & Benefits" data={data} layout="item" />
      <DataRow title="Operating Expenses" data={data} layout="item" />
      <DataRow title="Total Operating Expenses" data={data} layout="total" />
      <DataRow title="EBITDA" data={data} layout="total" collision />
      <DataRow title="Depreciation" data={data} layout="item" />

      <DataRow title="EBIT" data={data} layout="total" collision />
      <DataRow title="Interest Expense" data={data} layout="item" />
      <DataRow title="Taxes" data={data} layout="item" />

      <DataRow title="Net Income" data={data} layout="total" collision />
      <DataRow title="Net Profit Margin" data={data} layout="item" />
    </div>
  )
}
