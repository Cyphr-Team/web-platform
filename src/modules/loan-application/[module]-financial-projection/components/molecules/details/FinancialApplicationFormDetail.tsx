import { cn } from "@/lib/utils"
import {
  FinancialDetailCard,
  FinancialDetailItem
} from "@/modules/loan-application/[module]-financial-projection/components/atoms/details"
import { type FinancialApplicationFormDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  EXPORT_CLASS,
  EXPORT_CONFIG
} from "@/modules/loan-application/services/pdf-v2.service"
import { type ReactNode } from "react"
import { checkIsLoanApplicant } from "@/utils/check-roles.ts"

interface FinancialApplicationFormDetailProps {
  title?: ReactNode
  subTitle?: ReactNode
  financialApplicationFormData: FinancialApplicationFormDetailData[]
  subChildren?: ReactNode
  isSubChildren?: boolean
  isLoading?: boolean
  isPdf?: boolean
  isLastItem?: boolean
}

const NON_APPLICANT_HIDDEN_FIELDS = ["residentAddress", "dateOfBirth"]

const maskSSN = (content?: string) => {
  if (!content) return

  return (
    <>
      <span className="font-mono">***-**-</span>
      {content.slice(-4)}
    </>
  )
}

export function FinancialApplicationFormDetail(
  props: FinancialApplicationFormDetailProps
) {
  const {
    title,
    subTitle,
    financialApplicationFormData,
    subChildren,
    isSubChildren,
    isLoading,
    isPdf,
    isLastItem
  } = props

  const render = financialApplicationFormData.length > 0 && (
    <div className={cn("mt-4 flex flex-col gap-8", isSubChildren && "gap-4")}>
      {financialApplicationFormData
        .filter(
          ({ id }) =>
            checkIsLoanApplicant() || !NON_APPLICANT_HIDDEN_FIELDS.includes(id)
        )
        .map(({ id, title, content }) => {
          const displayedContent =
            id === "ssn" && !checkIsLoanApplicant()
              ? maskSSN(content as string)
              : content

          return (
            <FinancialDetailItem
              key={id}
              content={displayedContent}
              isLoading={isLoading}
              title={title}
            />
          )
        })}
    </div>
  )

  return (
    <div
      className={cn(
        "overflow-hidden bg-white",
        !isSubChildren && "rounded-lg border",
        isSubChildren && "mt-2 p-4 py-0 last:pb-4 md:p-8 md:py-0 last:md:pb-8"
      )}
    >
      <FinancialDetailCard
        hasSubChildren={!!subChildren}
        isPdf={isPdf}
        isSubChildren={isSubChildren}
        subTitle={subTitle}
        title={title}
      >
        {render}
      </FinancialDetailCard>

      <div
        className={cn(isPdf && EXPORT_CLASS.FINANCIAL)}
        data-pdf-end-of-page-type={
          isLastItem ? EXPORT_CONFIG.END_OF_PAGE.NEW_PAGE : null
        }
      >
        {subChildren}
      </div>
    </div>
  )
}
