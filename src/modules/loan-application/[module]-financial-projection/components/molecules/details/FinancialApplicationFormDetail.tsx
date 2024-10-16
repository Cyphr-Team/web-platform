import { cn } from "@/lib/utils"
import {
  FinancialDetailCard,
  FinancialDetailItem
} from "@/modules/loan-application/[module]-financial-projection/components/atoms/details"
import { FinancialApplicationFormDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
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

  const render =
    financialApplicationFormData.length > 0 ? (
      <div className={cn("flex flex-col gap-8 mt-4", isSubChildren && "gap-4")}>
        {financialApplicationFormData.map(({ id, title, content }) => (
          <FinancialDetailItem
            key={id}
            title={title}
            content={content}
            isLoading={isLoading}
          />
        ))}
      </div>
    ) : null

  return (
    <div
      className={cn(
        !isSubChildren && "border rounded-lg",
        isSubChildren && [
          "mt-2 p-4 md:p-8 py-0 md:py-0 last:pb-4 last:md:pb-8",
          EXPORT_CLASS.FINANCIAL
        ]
      )}
    >
      <FinancialDetailCard
        isPdf={isPdf}
        title={title}
        subTitle={subTitle}
        hasSubChildren={!!subChildren}
      >
        {render}
      </FinancialDetailCard>

      {subChildren}
    </div>
  )
}
