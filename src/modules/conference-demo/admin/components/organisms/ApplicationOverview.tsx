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

const VerificationStatus = ({
  isVerified,
  label
}: {
  isVerified: boolean
  label: string
}) => {
  return (
    <div className="md:grid-cols-2 grid grid-flow-row border border-t-0 border-l-0">
      <div className="pl-xl xl:pl-3xl py-xl xl:py-3xl flex items-center">
        <p className="text-sm text-text-tertiary break-words">{label}</p>
      </div>
      <div className="pb-xl md:pt-xl xl:py-3xl pl-xl xl:pl-3xl flex items-center col-span-1 break-words pr-xl gap-1">
        {isVerified ? <Dot variantColor="green" /> : <Dot variantColor="red" />}
        <p className="font-medium text-sm truncate overflow-ellipsis overflow-visible whitespace-normal break-words max-w-full">
          {isVerified ? "Verified" : "Not Verified"}
        </p>
      </div>
    </div>
  )
}

export const ApplicationOverview = () => {
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
    <>
      <Card className="border-r-0 border-b-0 shadow-none bg-white">
        <div className="grid grid-cols-2">
          <VerificationStatus isVerified={true} label="Business verification" />
          <VerificationStatus isVerified={true} label="Identity verification" />
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
            label="Proposed use of loan"
            value={snakeCaseToText(
              MOCK_LOAN_SUMMARY?.proposeUseOfLoan ?? "N/A"
            )}
            className="rounded-bl-md capitalize"
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
