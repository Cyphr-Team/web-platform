import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"
import { DataRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"

type CashFlowTableProps = {
  data: number[]
}

export const CashFlowTablePdf = ({ data }: CashFlowTableProps) => {
  return (
    <div className="bg-white min-w-max rounded-xl border">
      <DateRow
        title="Cash Flow"
        data={data}
        className="border-t-0"
        labelClassName="border-t-0"
        itemClassName="border-t-0 border-r-0"
      />
      <SectionRow title="Operating Cash Flow" />
      <DataRow title="Net Income" data={data} layout="item" />
      <DataRow title="Depreciation" data={data} collision layout="item" />
      <DataRow
        title="Change in Accounts Receivable"
        data={data}
        collision
        layout="item"
      />
      <DataRow
        title="Change in Accounts Payable"
        data={data}
        collision
        layout="item"
      />
      <DataRow title="Total Operating Cash Flow" data={data} />

      <SectionRow title="Investing Cash Flow" />
      <DataRow
        title="Changes in Fixed Assets"
        data={data}
        collision
        layout="item"
      />
      <DataRow title="Total Investing Cash Flow" data={data} />

      <SectionRow title="Financing Cash Flow" />
      <DataRow title="Long Term Debt" data={data} collision layout="item" />
      <DataRow
        title="Changes in Paid in Capital"
        data={data}
        collision
        layout="item"
      />
      <DataRow title="Total Financing Cash Flow" data={data} />
    </div>
  )
}
