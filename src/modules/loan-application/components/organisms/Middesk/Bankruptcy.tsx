import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { MiddeskBadge } from "../../molecules/middesk/MiddeskBadge"
import { MiddeskCard } from "../../molecules/middesk/MiddeskCard"
import { NotFoundAlert } from "../../molecules/NotFoundAlert"
import { BankruptcyFound } from "./BankruptcyFound"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"

export function Bankruptcy() {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const bankruptcy = loanKybDetail?.businessBankruptcies
  const status = loanKybDetail?.insights.bankruptcies?.status

  const badge = <MiddeskBadge label={bankruptcy?.subLabel} status={status} />
  const headerTitle = <>Bankruptcies {badge}</>

  const content = (
    <>
      <BankruptcyFound />

      {!isLoading && (
        <div className="mt-4">
          <NotFoundAlert label="No bankruptcies found" status={status} />
        </div>
      )}
    </>
  )

  return (
    <MiddeskCard
      content={content}
      headerRight={<DateHeader />}
      headerTitle={headerTitle}
      id={INSIGHT_TOC.bankruptcies}
    />
  )
}
