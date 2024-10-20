import { Card } from "@/components/ui/card"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { InformationRow } from "../../../atoms/InformationRow"
import { formatBusinessStreetAddress } from "@/modules/loan-application/constants"
import {
  getPassedGovVerification,
  getPassedSelfieVerification
} from "@/modules/loan-application-management/services/identity-verification.service"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { Dot } from "@/components/ui/dot"
import { get } from "lodash"
import { useMemo } from "react"
function VerificationStatus({
  isVerified,
  label
}: {
  isVerified: boolean
  label: string
}) {
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

export function LaunchKCApplicationOverview() {
  const { loanSummary, loanApplicationDetails } =
    useLoanApplicationDetailContext()

  const businessInfo = loanSummary?.businessInfo
  const personalInfo = loanSummary?.personalInfo

  // Business Name and Address fetched from Middesk (post-verification) or from KYB form (pre-verification).
  // If KYB form has not yet been submitted, return "N/A"
  const businessName = useMemo(
    () =>
      get(
        businessInfo,
        "businessName.value",
        get(loanSummary, "kybForm.businessLegalName", "N/A")
      ),
    [businessInfo, loanSummary]
  )
  const businessAddress = useMemo(
    () =>
      get(
        businessInfo,
        "officeAddresses.value",
        formatBusinessStreetAddress(
          get(loanSummary, "kybForm.businessStreetAddress", undefined)
        )
      ),
    [businessInfo, loanSummary]
  )

  const getVerificationStatus = () => {
    const passedGovernment = getPassedGovVerification({
      governmentVerifications:
        loanSummary?.smartKycPersonaDetail?.governmentVerifications
    })
    const passedSelfie = getPassedSelfieVerification({
      selfieVers: loanSummary?.smartKycPersonaDetail?.selfies
    })

    return passedGovernment != null && passedSelfie != null
  }

  const businessVerificationStatus =
    businessInfo?.businessName?.verification?.status?.toUpperCase() ===
    TaskFieldStatus.SUCCESS
  const identityVerificationStatus = getVerificationStatus()

  return (
    <Card className="border-r-0 border-b-0 shadow-none bg-white">
      <div className="grid grid-cols-2">
        <VerificationStatus
          isVerified={businessVerificationStatus}
          label="Business verification"
        />
        <VerificationStatus
          isVerified={identityVerificationStatus}
          label="Identity verification"
        />
        <InformationRow
          className="rounded-tl-md"
          label="Business name"
          value={businessName}
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
          className="rounded-br-md"
          label="Office address"
          value={businessAddress}
        />
      </div>
    </Card>
  )
}
