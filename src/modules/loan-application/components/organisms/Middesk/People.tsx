import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { type MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { useMemo } from "react"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"

export function People() {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const peoples = loanKybDetail?.businessPeople

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
      status={loanKybDetail?.insights.people?.status}
    />
  )
  const headerTitle = <>People {badge}</>

  const content = (
    <MiddeskTableContent data={data} isLoading={isLoading} nameTitle="Name" />
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.people}
    />
  )
}
