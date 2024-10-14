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
  isPdf?: boolean
}

export const FinancialApplicationFormDetail = (
  props: FinancialApplicationFormDetailProps
) => {
  const {
    title,
    subTitle,
    financialApplicationFormData,
    subChildren,
    isSubChildren,
    isLoading,
    isPdf
  } = props

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
      isPdf={isPdf}
      title={title}
      subTitle={subTitle}
      isSubChildren={isSubChildren}
    >
      {render}
      {subRender}
    </FinancialDetailCard>
  )
}
