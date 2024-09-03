import { DateHeader } from "@/modules/loan-application/components/organisms/identity-verification/DateHeader"
import { IdentityVerificationCard } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerification"
import { IdentityVerificationBadge } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerificationBadge"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"

const KycSelfieVerification = () => {
  const verifiedStatus = IdentityVerificationStatus.VERIFIED

  const badge = (
    <IdentityVerificationBadge
      status={verifiedStatus}
      label={verifiedStatus.toLowerCase()}
    />
  )

  const headerTitle = <>Selfie verification {badge}</>

  return (
    <IdentityVerificationCard
      isHideSensitiveData={true}
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
      headerTitle={headerTitle}
      headerRight={<DateHeader date={new Date().toUTCString()} />}
      content={null}
    />
  )
}

export default KycSelfieVerification
