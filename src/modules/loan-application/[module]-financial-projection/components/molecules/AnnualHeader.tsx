import { DateRow } from "@/modules/loan-application/[module]-financial-projection/components/molecules/DateRow.tsx"
import { FC } from "react"
import { HeaderProps } from "@/modules/loan-application/[module]-financial-projection/constants"

export const AnnualHeader: FC<HeaderProps> = ({ title, data }) => {
  return (
    <DateRow
      title={title}
      labelClassName="border-t-0"
      itemClassName="border-t-0"
      data={data.map((date) => date.getFullYear())}
    />
  )
}
