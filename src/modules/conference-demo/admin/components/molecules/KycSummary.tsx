import { KycSummaryItem } from "@/modules/conference-demo/admin/components/atoms"
import { IdentityVerificationStatus } from "@/modules/loan-application-management/constants/types/smart-kyc"
import { DateHeader } from "@/modules/loan-application/components/organisms/identity-verification/DateHeader"
import { IdentityVerificationCard } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerification"
import { IdentityVerificationBadge } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerificationBadge"
import { getTimeFromSecs } from "../../../../../utils/get-time-from-secs"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"

function KycSummary() {
  const verifiedStatus = IdentityVerificationStatus.VERIFIED

  const badge = (
    <IdentityVerificationBadge
      label={verifiedStatus.toLowerCase()}
      status={verifiedStatus}
    />
  )
  const headerTitle = <>Summary {badge}</>

  const content = (
    <div className="pt-4">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <KycSummaryItem
          subtitle1={getTimeFromSecs({ totalSecs: 92 })}
          title="Time to finish"
        />
        <KycSummaryItem subtitle1="0" title="Watchlist matches" />
        <KycSummaryItem
          subtitle1="Government ID: 1"
          subtitle2="Selfie: 1"
          title="Verification attempts"
        />
        <KycSummaryItem
          subtitle1="California"
          subtitle2="United States of America"
          title="Location"
        />
      </div>
    </div>
  )

  return (
    <IdentityVerificationCard
      content={content}
      headerRight={<DateHeader date={new Date().toUTCString()} />}
      headerTitle={headerTitle}
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.summary}
    />
  )
}

export default KycSummary
