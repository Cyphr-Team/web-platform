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

interface VerificationStatusProps {
  isVerified: boolean
  label: string
}

function VerificationStatus({ isVerified, label }: VerificationStatusProps) {
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
    <Card className="border-b-0 border-r-0 bg-white shadow-none">
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
