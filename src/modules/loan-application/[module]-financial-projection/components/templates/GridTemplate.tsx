import { Card } from "@/components/ui/card.tsx"
import { formatDate } from "@/utils/date.utils.ts"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants.ts"
import { DataRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DataRow.tsx"
import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"

/**
 * TODO: this component is only for testing to demonstrate how we will use these component
 * */
export const GridTemplate = () => {
  const years = Array.from({ length: 60 }, (_, index) => 2024 + index)
  const dates = years.map(() =>
    formatDate(new Date(Date.now()).toISOString(), FORMAT_DATE_MM_DD_YYYY)
  )
  return (
    <Card className="shadow-primary border-none">
      <div className="overflow-x-auto rounded-xl">
        <div className="min-w-max bg-white">
          <SectionRow title="Income statement" />
          <DateRow title="Year" data={years} />
          <DateRow
            title="Month Counter"
            data={years.map((val) => val + 1 - 2024)}
          />
          <DateRow title="Date" data={dates} />

          <SectionRow title="Revenue" />
          <DataRow title="Recurring charges" data={years} layout="item" />
          <DataRow title="Unit sales" data={years} collision layout="item" />

          <DataRow title="Total Revenue" data={years} />
          <DataRow title="COGS" data={years} collision />

          <SectionRow title="Gross Profit" />
          <DataRow title="Percentage" data={years} layout="percentage" />
          <DataRow title="Percentage" data={years} layout="percentage" />
          <DataRow title="COGS" data={years} collision />
        </div>
      </div>
    </Card>
  )
}
