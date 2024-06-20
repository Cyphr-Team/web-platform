import { Card } from "@/components/ui/card"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { toCurrency } from "@/utils"
import { InformationRow } from "../../../atoms/InformationRow"
import { formatPhoneNumberIntl } from "react-phone-number-input"
import { formatBusinessStreetAddress } from "@/modules/loan-application/constants"

export const ApplicationOverview = () => {
  const { loanSummary, loanApplicationDetails } =
    useLoanApplicationDetailContext()
  const businessInfo = loanSummary?.businessInfo
  const personalInfo = loanSummary?.personalInfo
  const loanAmount = loanApplicationDetails?.loanAmount
    ? toCurrency(loanApplicationDetails?.loanAmount, 0)
    : "$-"
  // Business Name and Address fetched from Middesk (post-verification) or from KYB form (pre-verification).
  // If KYB form has not yet been submitted, return "N/A"
  const getBusinessName = () => {
    if (businessInfo?.businessName?.verification) {
      return businessInfo?.businessName?.value ?? "N/A"
    }
    return loanSummary?.kybForm?.businessLegalName ?? "N/A"
  }
  const getBusinessAddress = () => {
    if (businessInfo?.businessName?.verification) {
      return loanSummary?.businessInfo?.officeAddresses?.value ?? "N/A"
    }
    return loanSummary?.kybForm?.businessStreetAddress
      ? formatBusinessStreetAddress(loanSummary?.kybForm?.businessStreetAddress)
      : "N/A"
  }

  return (
    <Card className="border-r-0 border-b-0 shadow-none bg-white">
      <div className="grid grid-cols-2">
        <InformationRow
          label="Business Name"
          value={getBusinessName()}
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
          value={
            formatPhoneNumberIntl(personalInfo?.phoneNumber ?? "") || "N/A"
          }
        />
        <InformationRow
          label="Proposed Use of Loan"
          value={loanSummary?.proposeUseOfLoan ?? "N/A"}
          className="rounded-bl-md"
        />
        <InformationRow
          label="Office Address"
          value={getBusinessAddress()}
          className="rounded-br-md"
        />
      </div>
    </Card>
  )
}
