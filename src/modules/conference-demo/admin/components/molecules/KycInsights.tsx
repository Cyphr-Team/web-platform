import { Insights } from "@/modules/conference-demo/admin/components/atoms"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { IdentityVerificationStatus } from "@/modules/loan-application-management/constants/types/smart-kyc"
import InsightItem from "@/modules/loan-application/components/molecules/InsightItem"

function KycInsights() {
  const verifiedStatus = IdentityVerificationStatus.VERIFIED

  return (
    <Insights passedStep={2} totalStep={2}>
      <InsightItem
        href={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
        label={verifiedStatus.toLowerCase()}
        status={verifiedStatus}
        title="Government ID"
        toolTipContent="Government Id Verification uses the ID Card, Driver license, etc"
      />
      <InsightItem
        noBorder
        href={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
        label={verifiedStatus.toLowerCase()}
        status={verifiedStatus}
        title="Selfie verification"
        toolTipContent="Selfie Verification uses the Persona to authenticate"
      />
    </Insights>
  )
}

export default KycInsights
