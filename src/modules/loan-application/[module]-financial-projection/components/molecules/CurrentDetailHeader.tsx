import { SectionRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/SectionRow.tsx"
import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"
import { type FC } from "react"
import { formatDate } from "@/utils/date.utils.ts"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants.ts"
import { type HeaderProps } from "@/modules/loan-application/[module]-financial-projection/constants"

export const CurrentDetailHeader: FC<HeaderProps> = ({ title, data }) => {
  const currentDate = formatDate(data[0]?.toISOString(), FORMAT_DATE_MM_DD_YYYY)

  return (
    <>
      <SectionRow className="border-t-0" title={title} />
      <DateRow data={[currentDate]} title="Date" />
    </>
  )
}
