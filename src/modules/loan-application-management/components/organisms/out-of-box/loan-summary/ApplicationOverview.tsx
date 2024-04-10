import { Card } from "@/components/ui/card"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { toCurrency } from "@/utils"
import { InformationRow } from "../../../atoms/InformationRow"

export const ApplicationOverview = () => {
  const { loanSummary, loanApplicationDetails } =
    useLoanApplicationDetailContext()
  const businessInfo = loanSummary?.businessInfo
  const personalInfo = loanSummary?.personalInfo
  const loanAmount = loanApplicationDetails?.loanAmount
    ? toCurrency(loanApplicationDetails?.loanAmount, 0)
    : "$-"
  return (
    <Card className="border-r-0 border-b-0">
      <div className="grid grid-cols-2">
        <InformationRow
          label="Business Name"
          value={businessInfo?.businessName?.value ?? "N/A"}
          className="rounded-tl-md"
        />
        <InformationRow
          label="Business Owner"
          value={personalInfo?.name ?? "N/A"}
          className="rounded-tr-md"
        />
        <InformationRow
          label="Loan Program"
          value={loanApplicationDetails?.loanProgram?.name ?? "N/A"}
        />
        <InformationRow
          label="Email Address"
          value={personalInfo?.email ?? "N/A"}
        />
        <InformationRow label="Amount Requested" value={loanAmount} />
        <InformationRow
          label="Phone Number"
          value={personalInfo?.phoneNumber ?? "N/A"}
        />
        <InformationRow
          label="Proposed Use of Loan"
          value={loanSummary?.proposeUseOfLoan ?? "N/A"}
          className="rounded-bl-md"
        />
        <InformationRow
          label="Office Address"
          value={loanSummary?.businessInfo?.officeAddresses?.value ?? "N/A"}
          className="rounded-br-md"
        />
      </div>
    </Card>
  )
}
