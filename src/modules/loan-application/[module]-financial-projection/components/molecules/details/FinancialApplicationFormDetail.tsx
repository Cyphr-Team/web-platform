import {
  FinancialDetailCard,
  FinancialDetailItem
} from "@/modules/loan-application/[module]-financial-projection/components/atoms/details"
import { FinancialApplicationFormDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { ReactNode } from "react"

interface FinancialApplicationFormDetailProps {
  title?: ReactNode
  subTitle?: ReactNode
  financialApplicationFormData: FinancialApplicationFormDetailData[]
  subChildren?: ReactNode
  isSubChildren?: boolean
  isLoading?: boolean
}
export const FinancialApplicationFormDetail = ({
  title,
  subTitle,
  financialApplicationFormData,
  subChildren,
  isSubChildren,
  isLoading
}: FinancialApplicationFormDetailProps) => {
  const render = financialApplicationFormData.map(({ id, title, content }) => (
    <FinancialDetailItem
      key={id}
      title={title}
      content={content}
      isSubChildren={isSubChildren}
      isLoading={isLoading}
    />
  ))

  const subRender = subChildren ? (
    <div className="mt-5 pt-0.5">{subChildren}</div>
  ) : null

  return (
    <FinancialDetailCard
      title={title}
      subTitle={subTitle}
      isSubChildren={isSubChildren}
    >
      {render}
      {subRender}
    </FinancialDetailCard>
  )
}
