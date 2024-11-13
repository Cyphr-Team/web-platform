import { Card } from "@/components/ui/card"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { toCurrency } from "@/utils"
import { InformationRow } from "../../../atoms/InformationRow"
import { formatPhoneNumberIntl } from "react-phone-number-input"
import { formatBusinessStreetAddress } from "@/modules/loan-application/constants"
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import { getUseOfLoan } from "@/modules/loan-application-management/services"
import { type UseOfLoan } from "@/types/loan-application.type.ts"

export function BaseApplicationOverview() {
  const { loanSummary, loanApplicationDetails } =
    useLoanApplicationDetailContext()

  const businessInfo = loanSummary?.businessInfo
  const personalInfo = loanSummary?.personalInfo
  const loanAmount = isEnableFormV2()
    ? loanSummary?.loanRequestForm?.amount
    : loanApplicationDetails?.loanAmount

  const proposeUseOfLoan =
    ((isEnableFormV2()
      ? loanSummary?.loanRequestForm?.proposeUseOfLoan
      : loanSummary?.proposeUseOfLoan) as UseOfLoan) ?? "N/A"

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
    <Card className="border-b-0 border-r-0 bg-white shadow-none">
      <div className="grid grid-cols-2">
        <InformationRow
          className="rounded-tl-md"
          label="Business name"
          value={getBusinessName()}
        />
        <InformationRow
          className="rounded-tr-md"
          label="Business owner"
          value={personalInfo?.name ?? "N/A"}
        />
        <InformationRow
          label="Loan program"
          value={loanApplicationDetails?.loanProgram?.name ?? "N/A"}
        />
        <InformationRow
          label="Email address"
          value={personalInfo?.email ?? "N/A"}
        />
        <InformationRow
          label="Amount requested"
          value={toCurrency(loanAmount, 0) ?? "$-"}
        />
        <InformationRow
          label="Phone number"
          value={
            formatPhoneNumberIntl(personalInfo?.phoneNumber ?? "") || "N/A"
          }
        />
        <InformationRow
          className="rounded-bl-md"
          label="Proposed use of loan"
          value={getUseOfLoan(proposeUseOfLoan)}
        />
        <InformationRow
          className="rounded-br-md"
          label="Office address"
          value={getBusinessAddress()}
        />
      </div>
    </Card>
  )
}
