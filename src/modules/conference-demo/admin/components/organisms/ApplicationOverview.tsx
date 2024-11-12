import { Card } from "@/components/ui/card"
import { snakeCaseToText, toCurrency } from "@/utils"
import { formatPhoneNumberIntl } from "react-phone-number-input"
import { formatBusinessStreetAddress } from "@/modules/loan-application/constants"
import { InformationRow } from "../../../../loan-application-management/components/atoms/InformationRow"
import {
  MOCK_LOAN_APPLICATION_DETAILS,
  MOCK_LOAN_SUMMARY
} from "../../constants/data"
import { Dot } from "../../../../../components/ui/dot"

function VerificationStatus({
  isVerified,
  label
}: {
  isVerified: boolean
  label: string
}) {
  return (
    <div className="grid grid-flow-row border border-l-0 border-t-0 md:grid-cols-2">
      <div className="flex items-center py-xl pl-xl xl:py-3xl xl:pl-3xl">
        <p className="break-words text-sm text-text-tertiary">{label}</p>
      </div>
      <div className="col-span-1 flex items-center gap-1 break-words px-xl pb-xl md:pt-xl xl:py-3xl xl:pl-3xl">
        {isVerified ? <Dot variantColor="green" /> : <Dot variantColor="red" />}
        <p className="max-w-full overflow-visible truncate whitespace-normal break-words text-sm font-medium">
          {isVerified ? "Verified" : "Not Verified"}
        </p>
      </div>
    </div>
  )
}

export function ApplicationOverview() {
  const businessInfo = MOCK_LOAN_SUMMARY?.businessInfo
  const personalInfo = MOCK_LOAN_SUMMARY?.personalInfo
  const loanAmount = MOCK_LOAN_APPLICATION_DETAILS?.loanAmount
    ? toCurrency(MOCK_LOAN_APPLICATION_DETAILS?.loanAmount, 0)
    : "$-"
  // Business Name and Address fetched from Middesk (post-verification) or from KYB form (pre-verification).
  // If KYB form has not yet been submitted, return "N/A"
  const getBusinessName = () => {
    if (businessInfo?.businessName?.verification) {
      return businessInfo?.businessName?.value ?? "N/A"
    }

    return MOCK_LOAN_SUMMARY?.kybForm?.businessLegalName ?? "N/A"
  }
  const getBusinessAddress = () => {
    if (businessInfo?.businessName?.verification) {
      return MOCK_LOAN_SUMMARY?.businessInfo?.officeAddresses?.value ?? "N/A"
    }

    return MOCK_LOAN_SUMMARY?.kybForm?.businessStreetAddress
      ? formatBusinessStreetAddress(
          MOCK_LOAN_SUMMARY?.kybForm?.businessStreetAddress
        )
      : "N/A"
  }

  return (
    <Card className="border-b-0 border-r-0 bg-white shadow-none">
      <div className="grid grid-cols-2">
        <VerificationStatus isVerified label="Business verification" />
        <VerificationStatus isVerified label="Identity verification" />
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
          value={MOCK_LOAN_APPLICATION_DETAILS?.loanProgram?.name ?? "N/A"}
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
          className="rounded-bl-md capitalize"
          label="Proposed use of loan"
          value={snakeCaseToText(MOCK_LOAN_SUMMARY?.proposeUseOfLoan ?? "N/A")}
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
