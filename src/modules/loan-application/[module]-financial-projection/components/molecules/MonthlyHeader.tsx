import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"
import { FC } from "react"
import { formatDate } from "@/utils/date.utils.ts"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants.ts"
import { HeaderProps } from "@/modules/loan-application/[module]-financial-projection/constants"

export const MonthlyHeader: FC<HeaderProps> = ({ title, data }) => {
  const year = data.map((date) => date.getFullYear())
  const month = data.map((_, index) => index + 1)
  const dates = data.map((date) =>
    formatDate(date.toISOString(), FORMAT_DATE_MM_DD_YYYY)
  )

  return (
    <>
      <SectionRow title={title} isFirst />
      <DateRow title="Year" data={year} />
      <DateRow title="Month Counter" data={month} />
      <DateRow title="Date" data={dates} />
    </>
  )
}
