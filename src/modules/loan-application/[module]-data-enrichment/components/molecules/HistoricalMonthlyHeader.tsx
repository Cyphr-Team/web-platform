import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { type FC } from "react"
import { formatDate } from "@/utils/date.utils.ts"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants.ts"
import { type HeaderProps } from "@/modules/loan-application/[module]-financial-projection/constants"
import { HistoricalDateRow } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/HistoricalDateRow.tsx"

export const HistoricalMonthlyHeader: FC<HeaderProps> = ({ title, data }) => {
  const years = data.map((date) => date.getFullYear())
  const months = data.map((_, index) => index + 1)
  const dates = data.map((date) =>
    formatDate(date.toISOString(), FORMAT_DATE_MM_DD_YYYY)
  )

  return (
    <>
      <SectionRow isFirst title={title} />
      <HistoricalDateRow data={years} title="Year" />
      <HistoricalDateRow data={months} title="Month Counter" />
      <HistoricalDateRow data={dates} title="Date" />
    </>
  )
}
