import {
  FinancialDetailCard,
  FinancialDetailItem
} from "@/modules/loan-application/[module]-financial-projection/components/atoms/details"
import { FinancialApplicationFormDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { ReactNode } from "react"

interface FinancialApplicationFormDetailProps {
  title: ReactNode
  subTitle?: ReactNode
  financialApplicationFormData: FinancialApplicationFormDetailData[]
}
export const FinancialApplicationFormDetail = ({
  title,
  subTitle,
  financialApplicationFormData
}: FinancialApplicationFormDetailProps) => {
  const render = financialApplicationFormData.map(({ id, title, content }) => (
    <FinancialDetailItem key={id} title={title} content={content} />
  ))

  return (
    <FinancialDetailCard title={title} subTitle={subTitle}>
      {render}
    </FinancialDetailCard>
  )
}
