import { useEffect, useState } from "react"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"
import { useLoanApplicationDetailContext } from "../../../../loan-application-management/providers/LoanApplicationDetailProvider"
import { DateHeader } from "./DateHeader"
import { IdentityVerificationCard } from "./IdentityVerification"
import { IdentityVerificationBadge } from "./IdentityVerificationBadge"
import { PersonaSelfie } from "../../../../../lib/persona/persona.types"
import { LoadingWrapper } from "../../../../../shared/atoms/LoadingWrapper"
import { getPassedSelfieVerification } from "../../../../loan-application-management/services/identity-verification.service"
import { cn } from "../../../../../lib/utils"
import { SelfieImageDivider } from "./SelfieImageDivider"

export const SelfieVerification = () => {
  const { loanSmartKycDetail, isLoadingLoanSmartKycDetail } =
    useLoanApplicationDetailContext()

  const [passedSelfieVerification, setPassedSelfieVerification] =
    useState<PersonaSelfie | null>(null)

  useEffect(() => {
    const passed = getPassedSelfieVerification({
      selfieVers: loanSmartKycDetail?.selfies
    })
    setPassedSelfieVerification(passed)
  }, [loanSmartKycDetail?.selfies])

  const getSelfieVerificationHeaderStatus = () => {
    return passedSelfieVerification != null
      ? IdentityVerificationStatus.VERIFIED
      : IdentityVerificationStatus.UNVERIFIED
  }

  const numberOfPhotos = [
    passedSelfieVerification?.leftPhotoUrl,
    passedSelfieVerification?.centerPhotoUrl,
    passedSelfieVerification?.rightPhotoUrl
  ].filter(Boolean).length

  const badge = !isLoadingLoanSmartKycDetail && (
    <IdentityVerificationBadge
      status={getSelfieVerificationHeaderStatus()}
      label={getSelfieVerificationHeaderStatus().toLowerCase()}
    />
  )

  const headerTitle = <>Selfie verification {badge}</>

  const emptyInformation = (
    <p className="text-center align-middle mt-12">
      There is not any successful Selfie Verification
    </p>
  )

  const verifiedSelfie = () => {
    const classNameGridVariants = {
      1: "p-4 grid grid-cols-1 md:grid-cols-1",
      2: "p-4 grid grid-cols-1 md:grid-cols-2",
      3: "p-4 grid grid-cols-1 md:grid-cols-3"
    }
    const classNameGrid =
      classNameGridVariants[
        numberOfPhotos as keyof typeof classNameGridVariants
      ]
    return (
      <div className="py-4">
        <div className={classNameGrid}>
          {!!passedSelfieVerification?.leftPhotoUrl && (
            <SelfieImageDivider
              photoUrl={passedSelfieVerification?.leftPhotoUrl}
              title="Look Left"
              description="Live (autocapture)"
            />
          )}
          {!!passedSelfieVerification?.centerPhotoUrl && (
            <SelfieImageDivider
              photoUrl={passedSelfieVerification?.centerPhotoUrl}
              title="Look Ahead"
              description="Live (autocapture)"
            />
          )}
          {!!passedSelfieVerification?.rightPhotoUrl && (
            <SelfieImageDivider
              photoUrl={passedSelfieVerification?.rightPhotoUrl}
              title="Look Right"
              description="Live (autocapture)"
            />
          )}
        </div>
      </div>
    )
  }
  const content = (
    <LoadingWrapper
      className={cn("p-0", isLoadingLoanSmartKycDetail && "p-12")}
      isLoading={isLoadingLoanSmartKycDetail}
    >
      {passedSelfieVerification !== null ? verifiedSelfie() : emptyInformation}
    </LoadingWrapper>
  )
  return (
    <IdentityVerificationCard
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
      headerTitle={headerTitle}
      headerRight={
        <DateHeader
          date={
            passedSelfieVerification?.completedAt ??
            passedSelfieVerification?.submittedAt ??
            passedSelfieVerification?.createdAt
          }
        />
      }
      content={content}
    />
  )
}
