import { useEffect, useState } from "react"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"
import { useLoanApplicationDetailContext } from "../../../../loan-application-management/providers/LoanApplicationDetailProvider"
import { DateHeader } from "./DateHeader"
import { IdentityVerificationCard } from "./IdentityVerification"
import { IdentityVerificationBadge } from "./IdentityVerificationBadge"
import { type PersonaSelfie } from "../../../../../lib/persona/persona.types"
import { LoadingWrapper } from "../../../../../shared/atoms/LoadingWrapper"
import { getPassedSelfieVerification } from "../../../../loan-application-management/services/identity-verification.service"
import { cn } from "../../../../../lib/utils"
import { SelfieImageDivider } from "./SelfieImageDivider"
import { isLaunchKC } from "../../../../../utils/domain.utils"
import { checkIsWorkspaceAdmin } from "../../../../../utils/check-roles"

export function SelfieVerification() {
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
      label={getSelfieVerificationHeaderStatus().toLowerCase()}
      status={getSelfieVerificationHeaderStatus()}
    />
  )

  const headerTitle = <>Selfie verification {badge}</>

  const emptyInformation = (
    <p className="mt-12 text-center align-middle">
      There have been no successful Selfie Verifications
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
              description="Live (autocapture)"
              photoUrl={passedSelfieVerification?.leftPhotoUrl}
              title="Look Left"
            />
          )}
          {!!passedSelfieVerification?.centerPhotoUrl && (
            <SelfieImageDivider
              description="Live (autocapture)"
              photoUrl={passedSelfieVerification?.centerPhotoUrl}
              title="Look Ahead"
            />
          )}
          {!!passedSelfieVerification?.rightPhotoUrl && (
            <SelfieImageDivider
              description="Live (autocapture)"
              photoUrl={passedSelfieVerification?.rightPhotoUrl}
              title="Look Right"
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
  const isHiddenSensitiveData = isLaunchKC() && !checkIsWorkspaceAdmin() // In LaunchKC, only WSAdmin can view this

  return (
    <IdentityVerificationCard
      content={content}
      headerRight={
        <DateHeader
          date={
            passedSelfieVerification?.completedAt ??
            passedSelfieVerification?.submittedAt ??
            passedSelfieVerification?.createdAt
          }
        />
      }
      headerTitle={headerTitle}
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
      isHideSensitiveData={isHiddenSensitiveData}
    />
  )
}
