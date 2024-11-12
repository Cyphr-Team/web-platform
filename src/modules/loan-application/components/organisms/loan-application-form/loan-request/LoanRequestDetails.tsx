import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../../atoms/TextInputDisplay"
import { capitalizeWords, toCurrency } from "@/utils"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"

export function LoanRequestDetails() {
  const { loanApplicationDetails } = useBRLoanApplicationDetailsContext()

  return (
    <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-xl p-4xl">
      <h5 className="text-lg font-semibold">
        {loanApplicationDetails?.loanProgram.name ?? "Loan Program"}
      </h5>
      <TextInputDisplay
        label="Loan Amount"
        value={toCurrency(loanApplicationDetails?.loanAmount ?? 0)}
      />
      <TextInputDisplay
        label="Proposed Use of Loan"
        value={capitalizeWords(
          loanApplicationDetails?.proposeUseOfLoan.replace(/_/g, " ") ?? "N/A"
        )}
      />
    </Card>
  )
}
