import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { format } from "date-fns"

export function DateHeader() {
  const { loanKybDetail } = useLoanApplicationDetailContext()

  return loanKybDetail ? (
    <div className="text-xs text-text-tertiary">
      Last updated on{" "}
      {loanKybDetail.updatedAt
        ? format(loanKybDetail.updatedAt, FORMAT_DATE_MM_DD_YYYY)
        : "N/A"}
    </div>
  ) : null
}
