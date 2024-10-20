import { useEffect, useState } from "react"
import { useLoanApplicationDetailContext } from "../../../../loan-application-management/providers/LoanApplicationDetailProvider"
import { DateHeader } from "./DateHeader"
import { IdentityVerificationCard } from "./IdentityVerification"
import { IdentityVerificationBadge } from "./IdentityVerificationBadge"
import { SummaryItem } from "./IdentityVerificationSummary"
import { type PersonaGovernmentId } from "../../../../../lib/persona/persona.types"
import { LoadingWrapper } from "../../../../../shared/atoms/LoadingWrapper"
import { getPassedGovVerification } from "../../../../loan-application-management/services/identity-verification.service"
import { GovernmentImageDivider } from "./GovernmentImageDivider"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"
import { calculateAge, joinString } from "@/utils"
import { isLaunchKC } from "../../../../../utils/domain.utils"
import { checkIsWorkspaceAdmin } from "../../../../../utils/check-roles"

export function GovernmentIdVerification() {
  const { loanSmartKycDetail, isLoadingLoanSmartKycDetail } =
    useLoanApplicationDetailContext()

  const [passedGovVerification, setPassedGovVerification] =
    useState<PersonaGovernmentId | null>(null)

  useEffect(() => {
    const passed = getPassedGovVerification({
      governmentVerifications: loanSmartKycDetail?.governmentVerifications
    })

    setPassedGovVerification(passed)
  }, [loanSmartKycDetail?.governmentVerifications])

  const getGovernmentIdVerificationHeaderStatus = () => {
    return passedGovVerification != null
      ? IdentityVerificationStatus.VERIFIED
      : IdentityVerificationStatus.UNVERIFIED
  }

  const numberOfPhotos = [
    passedGovVerification?.frontPhotoUrl,
    passedGovVerification?.backPhotoUrl
  ].filter(Boolean).length

  const badge = !isLoadingLoanSmartKycDetail && (
    <IdentityVerificationBadge
      label={getGovernmentIdVerificationHeaderStatus().toLowerCase()}
      status={getGovernmentIdVerificationHeaderStatus()}
    />
  )
  const headerTitle = <>Government ID {badge}</>

  const emptyInformation = (
    <p className="text-center align-middle mt-12">
      There have been no successful Government ID Verifications.
    </p>
  )

  const verifiedInformation = () => {
    const classNameGridVariants = {
      1: `my-4 grid grid-cols-1 gap-x-4 w-full`,
      2: `my-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 w-full`
    }
    const classNameGrid =
      classNameGridVariants[
        numberOfPhotos as keyof typeof classNameGridVariants
      ]

    return (
      <div className="py-4">
        <div className={classNameGrid}>
          {!!passedGovVerification?.frontPhotoUrl && (
            <GovernmentImageDivider
              photoUrl={passedGovVerification?.frontPhotoUrl}
              title="Front photo"
            />
          )}
          {!!passedGovVerification?.backPhotoUrl && (
            <GovernmentImageDivider
              photoUrl={passedGovVerification?.backPhotoUrl}
              title="Back photo"
            />
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <SummaryItem
            subtitle1={joinString(
              passedGovVerification?.nameFirst,
              passedGovVerification?.nameMiddle,
              passedGovVerification?.nameLast
            )}
            title="Full name"
          />
          <SummaryItem
            subtitle1={joinString(
              passedGovVerification?.addressStreet1,
              passedGovVerification?.addressCity,
              passedGovVerification?.addressSubdivision,
              passedGovVerification?.addressPostalCode
            )}
            title="Address"
          />
          <SummaryItem subtitle1="Male" title="Sex" />
          <SummaryItem
            subtitle1={passedGovVerification?.birthdate ?? "N/A"}
            subtitle2={calculateAge(passedGovVerification?.birthdate)}
            title="Date of birth"
          />
        </div>
        <div className=" my-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <SummaryItem
            subtitle1={
              passedGovVerification?.identificationNumber ??
              passedGovVerification?.documentNumber ??
              "N/A"
            }
            title="ID number"
          />
          <SummaryItem
            subtitle1={passedGovVerification?.countryCode ?? "N/A"}
            title="Issuing country"
          />
          <SummaryItem
            subtitle1={passedGovVerification?.issueDate ?? "N/A"}
            title="Issue date"
          />
          <SummaryItem
            subtitle1={passedGovVerification?.expirationDate ?? "N/A"}
            title="Expiration date"
          />
        </div>
      </div>
    )
  }

  const content = (
    <LoadingWrapper
      className={isLoadingLoanSmartKycDetail ? "p-12" : "p-0"}
      isLoading={isLoadingLoanSmartKycDetail}
    >
      {passedGovVerification != null ? verifiedInformation() : emptyInformation}
    </LoadingWrapper>
  )

  const isHiddenSensitiveData = isLaunchKC() && !checkIsWorkspaceAdmin() // In LaunchKC, only WSAdmin can view this

  return (
    <IdentityVerificationCard
      content={content}
      headerRight={
        <DateHeader
          date={
            passedGovVerification?.completedAt ??
            passedGovVerification?.submittedAt ??
            passedGovVerification?.createdAt
          }
        />
      }
      headerTitle={headerTitle}
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
      isHideSensitiveData={isHiddenSensitiveData}
    />
  )
}
