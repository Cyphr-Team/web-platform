import { Card } from "@/components/ui/card"
import { getUseOfLoan } from "@/modules/loan-application-management/services"
import { AnswersTextDisplay } from "@/modules/loan-application/components/atoms/AnswersTextDisplay"
import { MOCK_LOAN_REQUEST } from "../../constants/data"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput"

export default function LoanRequestDetails() {
  return (
    <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-xl p-4xl">
      <h5 className="text-lg font-semibold">Loan Program</h5>
      <AnswersTextDisplay
        label="Loan Amount"
        value={`$${USDFormatter(MOCK_LOAN_REQUEST.loanAmount).format()}`}
      />
      <AnswersTextDisplay
        label="Proposed Use of Loan"
        value={getUseOfLoan(MOCK_LOAN_REQUEST.proposedUseOfLoan)}
      />
    </Card>
  )
}
