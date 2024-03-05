import { MiddeskTableContent } from "@/modules/loan-application-management/components/table/middesk-table-content"
import { MiddeskTableContentReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { useMemo } from "react"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"

export const People = () => {
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
      status={loanKybDetail?.insights.people?.status}
      label={peoples?.subLabel}
    />
  )
  const headerTitle = <>People {badge}</>

  const content = (
    <MiddeskTableContent nameTitle="Name" data={data} isLoading={isLoading} />
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.people}
      headerTitle={headerTitle}
      headerRight={<DateHeader />}
      content={content}
    />
  )
}
