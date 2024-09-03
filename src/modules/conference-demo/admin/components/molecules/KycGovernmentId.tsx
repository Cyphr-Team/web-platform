import { KycSummaryItem } from "@/modules/conference-demo/admin/components/atoms"
import { IdentityVerificationStatus } from "@/modules/loan-application-management/constants/types/smart-kyc"
import { DateHeader } from "@/modules/loan-application/components/organisms/identity-verification/DateHeader"
import { IdentityVerificationCard } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerification"
import { IdentityVerificationBadge } from "@/modules/loan-application/components/organisms/identity-verification/IdentityVerificationBadge"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"

const KycGovernmentId = () => {
  const verifiedStatus = IdentityVerificationStatus.VERIFIED

  const badge = (
    <IdentityVerificationBadge
      status={verifiedStatus}
      label={verifiedStatus.toLowerCase()}
    />
  )
  const headerTitle = <>Government ID {badge}</>

  const verifiedInformation = () => {
    return (
      <div className="pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <KycSummaryItem title="Full name" subtitle1="LARRY" />
          <KycSummaryItem
            title="Address"
            subtitle1="600 BEVERLY HILLS, LOS ANGELES, CA 94109"
          />
          <KycSummaryItem title="Sex" subtitle1="Male" />
          <KycSummaryItem
            title="Date of birth"
            subtitle1="May 27, 1977"
            subtitle2="(47 years old)"
          />
        </div>
        <div className=" my-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <KycSummaryItem title="ID number" subtitle1="DTRJ4242WWE" />
          <KycSummaryItem
            title="Issuing country"
            subtitle1="United States of America"
          />
          <KycSummaryItem title="Issue date" subtitle1="Jul 4, 2014" />
          <KycSummaryItem title="Expiration date" subtitle1="Jul 4, 2024" />
        </div>
      </div>
    )
  }

  return (
    <IdentityVerificationCard
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
      headerTitle={headerTitle}
      headerRight={<DateHeader date={new Date().toUTCString()} />}
      content={verifiedInformation()}
    />
  )
}

export default KycGovernmentId
