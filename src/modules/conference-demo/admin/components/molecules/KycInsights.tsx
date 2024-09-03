import { Insights } from "@/modules/conference-demo/admin/components/atoms"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { IdentityVerificationStatus } from "@/modules/loan-application-management/constants/types/smart-kyc"
import InsightItem from "@/modules/loan-application/components/molecules/InsightItem"

const KycInsights = () => {
  const verifiedStatus = IdentityVerificationStatus.VERIFIED

  return (
    <Insights totalStep={2} passedStep={2}>
      <InsightItem
        title="Government ID"
        status={verifiedStatus}
        label={verifiedStatus.toLowerCase()}
        toolTipContent="Government Id Verification uses the ID Card, Driver license, etc"
        href={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
      />
      <InsightItem
        title="Selfie verification"
        status={verifiedStatus}
        label={verifiedStatus.toLowerCase()}
        toolTipContent="Selfie Verification uses the Persona to authenticate"
        href={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
        noBorder
      />
    </Insights>
  )
}

export default KycInsights
