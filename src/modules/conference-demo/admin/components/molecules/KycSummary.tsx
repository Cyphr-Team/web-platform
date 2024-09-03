import { KycSummaryItem } from "@/modules/conference-demo/admin/components/atoms"
import { IdentityVerificationStatus } from "@/modules/loan-application-management/constants/types/smart-kyc"
import { DateHeader } from "@/modules/loan-application/components/organisms/identity-verification/DateHeader"
import { IdentityVerificationCard } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerification"
import { IdentityVerificationBadge } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerificationBadge"
import { getTimeFromSecs } from "../../../../../utils/get-time-from-secs"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"

const KycSummary = () => {
  const verifiedStatus = IdentityVerificationStatus.VERIFIED

  const badge = (
    <IdentityVerificationBadge
      status={verifiedStatus}
      label={verifiedStatus.toLowerCase()}
    />
  )
  const headerTitle = <>Summary {badge}</>

  const content = (
    <div className="pt-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <KycSummaryItem
          title="Time to finish"
          subtitle1={getTimeFromSecs({ totalSecs: 92 })}
        />
        <KycSummaryItem title="Watchlist matches" subtitle1="0" />
        <KycSummaryItem
          title="Verification attempts"
          subtitle1="Government ID: 1"
          subtitle2="Selfie: 1"
        />
        <KycSummaryItem
          title="Location"
          subtitle1="California"
          subtitle2="United States of America"
        />
      </div>
    </div>
  )

  return (
    <IdentityVerificationCard
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.summary}
      headerTitle={headerTitle}
      headerRight={<DateHeader date={new Date().toUTCString()} />}
      content={content}
    />
  )
}

export default KycSummary
