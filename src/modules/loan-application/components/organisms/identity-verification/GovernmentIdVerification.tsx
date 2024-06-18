import { useEffect, useState } from "react"
import { useLoanApplicationDetailContext } from "../../../../loan-application-management/providers/LoanApplicationDetailProvider"
import { DateHeader } from "./DateHeader"
import { IdentityVerificationCard } from "./IdentityVerification"
import { IdentityVerificationBadge } from "./IdentityVerificationBadge"
import { SummaryItem } from "./IdentityVerificationSummary"
import { PersonaGovernmentId } from "../../../../../lib/persona/persona.types"
import { LoadingWrapper } from "../../../../../shared/atoms/LoadingWrapper"
import { getPassedGovVerification } from "../../../../loan-application-management/services/identity-verification.service"
import { GovernmentImageDivider } from "./GovernmentImageDivider"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"

export const GovernmentIdVerification = () => {
  const { loanSmartKycDetail, isLoadingLoanSmartKycDetail } =
    useLoanApplicationDetailContext()

  const [passedGovVerification, setPassedGovVerification] =
    useState<PersonaGovernmentId | null>(null)

  useEffect(() => {
    const passed = getPassedGovVerification({
      govermentVerifications: loanSmartKycDetail?.governmentVerifications
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

  const joinString = (
    separator?: string,
    ...args: (string | null | undefined)[]
  ) => {
    return args.filter(Boolean).join(separator ?? ", ")
  }

  function calculateAge(birthdateString?: string): string {
    if (birthdateString == null) {
      return "N/A"
    }
    const birthdate: Date = new Date(birthdateString)
    const today: Date = new Date()
    const birthYear: number = birthdate.getFullYear()
    const birthMonth: number = birthdate.getMonth()
    const birthDay: number = birthdate.getDate()

    const todayYear: number = today.getFullYear()
    const todayMonth: number = today.getMonth()
    const todayDay: number = today.getDate()

    let age: number = todayYear - birthYear

    // Check if the birthday for this year has passed
    if (
      todayMonth < birthMonth ||
      (todayMonth === birthMonth && todayDay < birthDay)
    ) {
      age--
    }

    return `(${age} years old)`
  }

  const badge = !isLoadingLoanSmartKycDetail && (
    <IdentityVerificationBadge
      status={getGovernmentIdVerificationHeaderStatus()}
      label={getGovernmentIdVerificationHeaderStatus().toLowerCase()}
    />
  )
  const headerTitle = <>Government ID {badge}</>

  const emptyInformation = (
    <p className="text-center align-middle mt-12">
      There is not any successful Government Id Verification
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
            title="Full name"
            subtitle1={joinString(
              passedGovVerification?.nameFirst,
              passedGovVerification?.nameMiddle,
              passedGovVerification?.nameLast
            )}
          />
          <SummaryItem
            title="Address"
            subtitle1={joinString(
              passedGovVerification?.addressStreet1,
              passedGovVerification?.addressCity,
              passedGovVerification?.addressSubdivision,
              passedGovVerification?.addressPostalCode
            )}
          />
          <SummaryItem title="Sex" subtitle1="Male" />
          <SummaryItem
            title="Date of birth"
            subtitle1={passedGovVerification?.birthdate ?? "N/A"}
            subtitle2={calculateAge(passedGovVerification?.birthdate)}
          />
        </div>
        <div className=" my-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <SummaryItem
            title="ID number"
            subtitle1={
              passedGovVerification?.identificationNumber ??
              passedGovVerification?.documentNumber ??
              "N/A"
            }
          />
          <SummaryItem
            title="Issuing country"
            subtitle1={passedGovVerification?.countryCode ?? "N/A"}
          />
          <SummaryItem
            title="Issue date"
            subtitle1={passedGovVerification?.issueDate ?? "N/A"}
          />
          <SummaryItem
            title="Expiration date"
            subtitle1={passedGovVerification?.expirationDate ?? "N/A"}
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

  return (
    <IdentityVerificationCard
      id={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
      headerTitle={headerTitle}
      headerRight={
        <DateHeader
          date={
            passedGovVerification?.completedAt ??
            passedGovVerification?.submittedAt ??
            passedGovVerification?.createdAt
          }
        />
      }
      content={content}
    />
  )
}
