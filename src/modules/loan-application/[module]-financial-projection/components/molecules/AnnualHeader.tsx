import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"
import { type FC } from "react"
import { type HeaderProps } from "@/modules/loan-application/[module]-financial-projection/constants"

export const AnnualHeader: FC<HeaderProps> = ({ title, data }) => {
  return (
    <DateRow
      data={data.map((date) => date.getFullYear())}
      itemClassName="border-t-0"
      labelClassName="border-t-0"
      title={title}
    />
  )
}
