import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"
import { DataRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"

type BalanceSheetTablePdfProps = {
  data: number[]
}

export const BalanceSheetTablePdf = ({ data }: BalanceSheetTablePdfProps) => {
  return (
    <div className="bg-white min-w-max rounded-xl border">
      <DateRow
        title="Balance Sheet"
        data={data}
        className="border-t-0"
        labelClassName="border-t-0"
        itemClassName="border-t-0 border-r-0"
      />
      <SectionRow title="Assets" />
      <DataRow title="Cash" data={data} layout="item" />
      <DataRow
        title="Account Receivables"
        data={data}
        collision
        layout="item"
      />
      <DataRow title="Total Current assets " data={data} layout="total" />
      <DataRow title="Fixed Assets" data={data} collision layout="item" />
      <DataRow title="Accumulated Depreciation" data={data} layout="item" />
      <DataRow title="Total Assets" data={data} layout="item" />

      <SectionRow title="Liabilities & Owner’s Equity" className="border-y" />
      <SectionRow
        title="Liabilities"
        className="border-none h-6 italic font-normal"
      />
      <DataRow title="Long Term Debt" data={data} layout="item" />
      <DataRow title="Accounts Payable" data={data} layout="item" />
      <DataRow
        title="Total Liabilities"
        data={data}
        layout="subTotal"
        className="border-none"
      />
      <SectionRow
        title="Equity"
        className="h-6 italic font-normal border-none"
      />
      <DataRow title="Paid in Capital" data={data} layout="item" />
      <DataRow
        title="Accumulated Retained Earnings"
        data={data}
        layout="item"
      />
      <DataRow title="Total Equity" data={data} layout="total" collision />
      <DataRow
        title="Total Liabilities & Owners Equity"
        data={data}
        layout="total"
        isEnd
      />
    </div>
  )
}
