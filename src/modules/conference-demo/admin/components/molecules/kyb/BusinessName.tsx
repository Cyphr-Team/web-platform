import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { type MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useMemo } from "react"

import {
  type BusinessNameDetail,
  SourceStatus,
  TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { Dot } from "@/components/ui/dot"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"

export function BusinessName() {
  const businessNames = MOCK_KYB_DETAIL?.businessNames

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
      status={MOCK_KYB_DETAIL.insights.businessName?.status}
    />
  )
  const headerTitle = <>Business Name {badge}</>

  const content = <MiddeskTableContent data={data} nameTitle="Business name" />

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.businessName}
    />
  )
}
