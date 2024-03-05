import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { MiddeskBadge } from "../../molecules/MiddeskBadge"
import { MiddeskCard } from "../../molecules/MiddeskCard"
import { NotFoundAlert } from "../../molecules/NotFoundAlert"
import { BankruptcyFound } from "./BankruptcyFound"
import { DateHeader } from "./DateHeader"
import { INSIGHT_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"

export const Bankruptcy = () => {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  const bankruptcy = loanKybDetail?.businessBankruptcies
  const status = loanKybDetail?.insights.bankruptcies?.status

  const badge = <MiddeskBadge status={status} label={bankruptcy?.subLabel} />
  const headerTitle = <>Bankruptcies {badge}</>

  const content = (
    <>
      <BankruptcyFound />

      {!isLoading && (
        <div className="mt-4">
          <NotFoundAlert status={status} label="No Bankruptcies Found" />
        </div>
      )}
    </>
  )

  return (
    <MiddeskCard
      id={INSIGHT_TOC.bankruptcies}
      headerTitle={headerTitle}
      headerRight={<DateHeader />}
      content={content}
    />
  )
}
