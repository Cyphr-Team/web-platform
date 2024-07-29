import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { useMemo } from "react"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { DateHeader } from "./DateHeader"
import {
  BusinessNameDetail,
  SourceStatus,
  TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { Dot } from "@/components/ui/dot"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"

export const BusinessName = () => {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const businessNames = loanKybDetail?.businessNames

  const getBusinessNameNote = (businessName: BusinessNameDetail) => {
    return businessName.status?.toUpperCase() === TaskFieldStatus.SUCCESS &&
      businessName.source.status?.toUpperCase() === SourceStatus.ACTIVE ? (
      <div className="flex items-center text-base flex-wrap">
        IRS <Dot className="mx-1 w-2" /> Tax ID Associated Name
      </div>
    ) : (
      ""
    )
  }

  const data: MiddeskTableContentReport[] = useMemo(
    () =>
      businessNames?.data?.map((businessName) => ({
        name: businessName.name,
        submitted: businessName.submitted,
        sources: [businessName.source],
        status: businessName.status,
        renderNote: getBusinessNameNote(businessName)
      })) ?? [],
    [businessNames]
  )

  const badge = (
    <MiddeskBadge
      status={loanKybDetail?.insights.businessName?.status}
      label={businessNames?.subLabel}
    />
  )
  const headerTitle = <>Business Name {badge}</>

  const content = (
    <MiddeskTableContent
      nameTitle="Business name"
      data={data}
      isLoading={isLoading}
    />
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.businessName}
      headerTitle={headerTitle}
      headerRight={<DateHeader />}
      content={content}
    />
  )
}
