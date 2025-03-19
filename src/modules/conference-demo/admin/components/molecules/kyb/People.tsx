import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { type MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useMemo } from "react"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"

export function People() {
  const peoples = MOCK_KYB_DETAIL.businessPeople

  const getPeopleNote = () => {
    return ""
  }

  const data: MiddeskTableContentReport[] = useMemo(
    () =>
      peoples?.data?.map((people) => ({
        name: people.name,
        submitted: people.submitted,
        notes: getPeopleNote(),
        sources: [people.source]
      })) ?? [],
    [peoples]
  )

  const badge = (
    <MiddeskBadge
      label={peoples?.subLabel}
      status={MOCK_KYB_DETAIL.insights.people?.status}
    />
  )
  const headerTitle = <>People {badge}</>

  const content = <MiddeskTableContent data={data} nameTitle="Name" />

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.people}
    />
  )
}
