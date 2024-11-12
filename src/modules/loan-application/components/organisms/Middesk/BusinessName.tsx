import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { type MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { useMemo } from "react"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { DateHeader } from "./DateHeader"
import {
  type BusinessNameDetail,
  SourceStatus,
  TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { Dot } from "@/components/ui/dot"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"

export function BusinessName() {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const businessNames = loanKybDetail?.businessNames

  const getBusinessNameNote = (businessName: BusinessNameDetail) => {
    return businessName.status?.toUpperCase() === TaskFieldStatus.SUCCESS &&
      businessName.source.status?.toUpperCase() === SourceStatus.ACTIVE ? (
      <div className="flex flex-wrap items-center text-base">
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
      label={businessNames?.subLabel}
      status={loanKybDetail?.insights.businessName?.status}
    />
  )
  const headerTitle = <>Business Name {badge}</>

  const content = (
    <MiddeskTableContent
      data={data}
      isLoading={isLoading}
      nameTitle="Business name"
    />
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.businessName}
    />
  )
}
