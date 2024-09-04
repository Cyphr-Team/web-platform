import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useMemo } from "react"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { MOCK_KYB_DETAIL } from "@/modules/conference-demo/admin/constants/data"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "@/modules/loan-application/components/molecules/middesk/MiddeskCard"
import { DateHeader } from "@/modules/conference-demo/admin/components/atoms/DateHeader"

export const People = () => {
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
      status={MOCK_KYB_DETAIL.insights.people?.status}
      label={peoples?.subLabel}
    />
  )
  const headerTitle = <>People {badge}</>

  const content = <MiddeskTableContent nameTitle="Name" data={data} />

  return (
    <MiddeskCard
      id={INSIGHT_TOC.people}
      headerTitle={headerTitle}
      headerRight={<DateHeader updatedAt={MOCK_KYB_DETAIL.updatedAt} />}
      content={content}
    />
  )
}
