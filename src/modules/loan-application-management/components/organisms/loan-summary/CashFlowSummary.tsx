import { Separator } from "@/components/ui/separator"
import { InformationRow } from "../../molecules/InformationRow"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"

export const CashFlowSummary = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const cashFlow = loanSummary?.cashFlowDocumentation

  return cashFlow?.map((document, index) => (
    <>
      <InformationRow
        key={document?.value ?? index}
        label={document?.value}
        status={document?.verification}
      />

      {index != cashFlow.length - 1 && <Separator />}
    </>
  ))
}
