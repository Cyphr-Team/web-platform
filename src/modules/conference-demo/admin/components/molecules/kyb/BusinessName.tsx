import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useMemo } from "react"

import {
  BusinessNameDetail,
  SourceStatus,
  TaskFieldStatus
} from "@/modules/loan-application-management/constants/types/business.type"
import { Dot } from "@/components/ui/dot"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"

export const BusinessName = () => {
  const businessNames = MOCK_KYB_DETAIL?.businessNames

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
      status={MOCK_KYB_DETAIL.insights.businessName?.status}
      label={businessNames?.subLabel}
    />
  )
  const headerTitle = <>Business Name {badge}</>

  const content = <MiddeskTableContent nameTitle="Business name" data={data} />

  return (
    <MiddeskCard
      id={INSIGHT_TOC.businessName}
      headerTitle={headerTitle}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      content={content}
    />
  )
}
