import { KycSummaryItem } from "@/modules/conference-demo/admin/components/atoms"
import { IdentityVerificationStatus } from "@/modules/loan-application-management/constants/types/smart-kyc"
import { DateHeader } from "@/modules/loan-application/components/organisms/identity-verification/DateHeader"
import { IdentityVerificationCard } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerification"
import { IdentityVerificationBadge } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerificationBadge"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"

function KycGovernmentId() {
  const verifiedStatus = IdentityVerificationStatus.VERIFIED

  const badge = (
    <IdentityVerificationBadge
      label={verifiedStatus.toLowerCase()}
      status={verifiedStatus}
    />
  )
  const headerTitle = <>Government ID {badge}</>

  const verifiedInformation = () => {
    return (
      <div className="pt-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <KycSummaryItem subtitle1="LARRY" title="Full name" />
          <KycSummaryItem
            subtitle1="600 BEVERLY HILLS, LOS ANGELES, CA 94109"
            title="Address"
          />
          <KycSummaryItem subtitle1="Male" title="Sex" />
          <KycSummaryItem
            subtitle1="May 27, 1977"
            subtitle2="(47 years old)"
            title="Date of birth"
          />
        </div>
        <div className=" my-6 grid grid-cols-2 gap-6 md:grid-cols-4">
          <KycSummaryItem subtitle1="DTRJ4242WWE" title="ID number" />
          <KycSummaryItem
            subtitle1="United States of America"
            title="Issuing country"
          />
          <KycSummaryItem subtitle1="Jul 4, 2014" title="Issue date" />
          <KycSummaryItem subtitle1="Jul 4, 2024" title="Expiration date" />
        </div>
      </div>
    )
  }

  return (
    <IdentityVerificationCard
      content={verifiedInformation()}
      headerRight={<DateHeader date={new Date().toUTCString()} />}
      headerTitle={headerTitle}
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
    />
  )
}

export default KycGovernmentId
