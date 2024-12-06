import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../../atoms/TextInputDisplay"
import { toCurrency } from "@/utils"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import { reverseFormatLoanRequestFormV2 } from "@/modules/loan-application/hooks/form-loan-request/useQueryLoanRequest.ts"
import { getUseOfLoan } from "@/modules/loan-application-management/services"
import { type UseOfLoan } from "@/types/loan-application.type.ts"

export function LoanRequestDetails() {
  const { loanApplicationDetails, loanRequestFormV2Data } =
    useBRLoanApplicationDetailsContext()

  const { loanAmount, proposeUseOfLoan } = isEnableFormV2()
    ? reverseFormatLoanRequestFormV2(loanRequestFormV2Data) ?? {}
    : loanApplicationDetails ?? {}

  return (
    <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-xl p-4xl">
      <h5 className="text-lg font-semibold">
        {loanApplicationDetails?.loanProgram.name ?? "Loan Program"}
      </h5>
      <TextInputDisplay
        label="Loan Amount"
        value={toCurrency(loanAmount ?? 0)}
      />
      <TextInputDisplay
        label="Proposed Use of Loan"
        value={getUseOfLoan(proposeUseOfLoan as UseOfLoan)}
      />
    </Card>
  )
}
