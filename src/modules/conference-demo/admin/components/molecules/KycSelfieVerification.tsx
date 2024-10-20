import { DateHeader } from "@/modules/loan-application/components/organisms/identity-verification/DateHeader"
import { IdentityVerificationCard } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerification"
import { IdentityVerificationBadge } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerificationBadge"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"

function KycSelfieVerification() {
  const verifiedStatus = IdentityVerificationStatus.VERIFIED

  const badge = (
    <IdentityVerificationBadge
      label={verifiedStatus.toLowerCase()}
      status={verifiedStatus}
    />
  )

  const headerTitle = <>Selfie verification {badge}</>

  return (
    <IdentityVerificationCard
      isHideSensitiveData
      content={null}
      headerRight={<DateHeader date={new Date().toUTCString()} />}
      headerTitle={headerTitle}
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
    />
  )
}

export default KycSelfieVerification
