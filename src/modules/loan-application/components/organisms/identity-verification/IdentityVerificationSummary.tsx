import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"
import { useLoanApplicationDetailContext } from "../../../../loan-application-management/providers/LoanApplicationDetailProvider"
import { DateHeader } from "./DateHeader"
import { IdentityVerificationCard } from "./IdentityVerification"
import { IdentityVerificationBadge } from "./IdentityVerificationBadge"

import { InquirySessionResponse } from "../../../../../lib/persona/persona.types"
import { LoadingWrapper } from "../../../../../shared/atoms/LoadingWrapper"
import {
  getPassedGovVerification,
  getPassedSelfieVerification
} from "../../../../loan-application-management/services/identity-verification.service"
import { getTimeFromSecs } from "../../../../../utils/get-time-from-secs"

export const IdentificationSummary = () => {
  const { loanSmartKycDetail, isLoadingLoanSmartKycDetail } =
    useLoanApplicationDetailContext()

  const getSummaryStatus = (): IdentityVerificationStatus => {
    const passedGovernment = getPassedGovVerification({
      govermentVerifications: loanSmartKycDetail?.governmentVerifications
    })
    const passedSelfie = getPassedSelfieVerification({
      selfieVers: loanSmartKycDetail?.selfies
    })
    return passedGovernment != null && passedSelfie != null
      ? IdentityVerificationStatus.VERIFIED
      : IdentityVerificationStatus.UNVERIFIED
  }

  const getInquirySession = (): InquirySessionResponse | null => {
    return loanSmartKycDetail?.inquirySession?.at(-1) ?? null
  }

  const badge = !isLoadingLoanSmartKycDetail && (
    <IdentityVerificationBadge
      status={getSummaryStatus()}
      label={getSummaryStatus().toLowerCase()}
    />
  )
  const headerTitle = <>Summary {badge}</>

  const content = (
    <div className="py-4 ">
      <LoadingWrapper
        className={isLoadingLoanSmartKycDetail ? "p-12" : "p-0"}
        isLoading={isLoadingLoanSmartKycDetail}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <SummaryItem
            title="Time to finish"
            subtitle1={getTimeFromSecs({
              totalSecs: loanSmartKycDetail?.behavior?.completionTime ?? 0
            })}
          />
          {/* Todo: integrate watchlist */}
          <SummaryItem title="Watchlist matches" subtitle1="0" />
          <SummaryItem
            title="Verification attemps"
            subtitle1={`Government ID: ${
              loanSmartKycDetail?.governmentVerifications?.length ?? 0
            }`}
            subtitle2={`Selfie: ${loanSmartKycDetail?.selfies?.length ?? 0}`}
          />
          <SummaryItem
            title="Location"
            subtitle1={getInquirySession()?.regionName ?? "--"}
            subtitle2={getInquirySession()?.countryName ?? "--"}
          />
        </div>
      </LoadingWrapper>
    </div>
  )

  return (
    <IdentityVerificationCard
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.summary}
      headerTitle={headerTitle}
      headerRight={<DateHeader date={loanSmartKycDetail?.updatedAt} />}
      content={content}
    />
  )
}

export const SummaryItem = ({
  title,
  subtitle1,
  subtitle2
}: {
  title: string
  subtitle1: string
  subtitle2?: string
}) => {
  return (
    <div>
      <h1 className=" text-gray-500 my-2 text-xs">{title}</h1>
      <div className=" text-base">{subtitle1}</div>
      {subtitle2 && <div className="text-base">{subtitle2}</div>}
    </div>
  )
}
