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
    <>
      <Card className="border-r-0 border-b-0 shadow-none bg-white">
        <div className="grid grid-cols-2">
          <InformationRow
            label="Business name"
            value={getBusinessName()}
            className="rounded-tl-md"
          />
          <InformationRow
            label="Business owner"
            value={personalInfo?.name ?? "N/A"}
            className="rounded-tr-md"
          />
          <InformationRow
            label="Loan program"
            value={loanApplicationDetails?.loanProgram?.name ?? "N/A"}
          />
          <InformationRow
            label="Email address"
            value={personalInfo?.email ?? "N/A"}
          />
          <InformationRow label="Amount requested" value={loanAmount} />
          <InformationRow
            label="Phone number"
            value={
              formatPhoneNumberIntl(personalInfo?.phoneNumber ?? "") || "N/A"
            }
          />
          <InformationRow
            label="Proposed use of loan"
            value={loanSummary?.proposeUseOfLoan ?? "N/A"}
            className="rounded-bl-md"
          />
          <InformationRow
            label="Office address"
            value={getBusinessAddress()}
            className="rounded-br-md"
          />
        </div>
      </Card>
    </>
  )
}
