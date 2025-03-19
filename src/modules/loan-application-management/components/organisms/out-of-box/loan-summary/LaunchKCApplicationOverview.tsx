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
import { isEnableFormV2 } from "@/utils/feature-flag.utils.ts"
import { Skeleton } from "@/components/ui/skeleton.tsx"
import {
  adaptFormV2Metadata,
  findSingularFormMetadata,
  preFormatBusinessInformationForm,
  preFormatOwnerInformationForm
} from "@/modules/loan-application/services/formv2.services.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import {
  ownerFormSchema,
  type OwnerFormValue
} from "@/modules/loan-application/constants/form.kyc.ts"
import { type IBusinessFormValue } from "@/modules/loan-application/constants/form.ts"
import { businessFormSchema } from "@/modules/loan-application/constants/form.kyb.ts"

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

function ApplicationOverviewSkeleton() {
  return (
    <div className="flex w-full gap-3xl px-4xl">
      <Skeleton className="h-8 w-96" />
    </div>
  )
}

export function LaunchKCApplicationOverview() {
  const {
    loanSummary,
    applicationSummary,
    isFetchingSummary,
    loanApplicationDetails
  } = useLoanApplicationDetailContext()

  const isEnabledFormV2 = isEnableFormV2()
  const summaryToUse = isEnabledFormV2 ? applicationSummary : loanSummary
  const businessInfo = summaryToUse?.businessInfo

  /*
   * Business Name and Address fetched from Middesk (post-verification) or from KYB form (pre-verification).
   * If KYB form has not yet been submitted, return "N/A"
   */
  const kybFormMetadata = isEnabledFormV2
    ? findSingularFormMetadata(FORM_TYPE.KYB, applicationSummary)
    : undefined

  const kybFormV2 = kybFormMetadata
    ? adaptFormV2Metadata<IBusinessFormValue>({
        schema: businessFormSchema,
        metadata: kybFormMetadata,
        preFormat: () => preFormatBusinessInformationForm(kybFormMetadata),
        additionalFields: {
          id: get(kybFormMetadata, "forms[0].id", "")
        }
      })
    : undefined

  const businessName = useMemo(() => {
    if (!isEnabledFormV2)
      return (
        summaryToUse?.businessInfo?.businessName?.value ??
        get(summaryToUse, "kybForm.businessLegalName", "N/A")
      )

    return (
      summaryToUse?.businessInfo?.businessName?.value ??
      kybFormV2?.businessLegalName
    )
  }, [isEnabledFormV2, summaryToUse, kybFormV2])

  const businessAddress = useMemo(() => {
    if (!isEnabledFormV2)
      return (
        summaryToUse?.businessInfo?.officeAddresses?.value ??
        formatBusinessStreetAddress(
          get(summaryToUse, "kybForm.businessStreetAddress", undefined)
        )
      )

    return (
      summaryToUse?.businessInfo?.officeAddresses?.value ??
      formatBusinessStreetAddress({
        addressLine1: kybFormV2?.addressLine1 ?? "",
        addressLine2: kybFormV2?.addressLine2 ?? "",
        city: kybFormV2?.city ?? "",
        state: kybFormV2?.state ?? "",
        postalCode: kybFormV2?.postalCode ?? ""
      })
    )
  }, [isEnabledFormV2, summaryToUse, kybFormV2])

  const businessOwnerName = useMemo(() => {
    if (!isEnabledFormV2)
      return get(summaryToUse, "personalInfo.name", undefined)

    const kycFormMetadata = findSingularFormMetadata(
      FORM_TYPE.KYC,
      applicationSummary
    )

    const kycFormData = adaptFormV2Metadata<OwnerFormValue>({
      schema: ownerFormSchema,
      metadata: kycFormMetadata,
      preFormat: () => preFormatOwnerInformationForm(kycFormMetadata)
    })

    return kycFormData.fullName
  }, [isEnabledFormV2, summaryToUse, applicationSummary])

  const getVerificationStatus = () => {
    const passedGovernment = getPassedGovVerification({
      governmentVerifications:
        summaryToUse?.smartKycPersonaDetail?.governmentVerifications
    })
    const passedSelfie = getPassedSelfieVerification({
      selfieVers: summaryToUse?.smartKycPersonaDetail?.selfies
    })

    return passedGovernment != null && passedSelfie != null
  }

  const businessVerificationStatus =
    businessInfo?.businessName?.verification?.status?.toUpperCase() ===
    TaskFieldStatus.SUCCESS
  const identityVerificationStatus = getVerificationStatus()

  if (isFetchingSummary) return <ApplicationOverviewSkeleton />

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
          value={businessName ?? "N/A"}
        />
        <InformationRow
          className="rounded-tr-md"
          label="Business owner"
          value={businessOwnerName ?? "N/A"}
        />
        <InformationRow
          label="Loan program"
          value={loanApplicationDetails?.loanProgram?.name ?? "N/A"}
        />
        <InformationRow
          className="rounded-br-md"
          label="Office address"
          value={businessAddress ?? "N/A"}
        />
      </div>
    </Card>
  )
}
