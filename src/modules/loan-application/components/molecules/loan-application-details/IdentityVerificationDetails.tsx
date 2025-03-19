import React from "react"
import { type InquirySessionResponse } from "@/lib/persona/persona.types"
import { IdentityVerificationCard } from "../../organisms/identity-verification/IdentityVerification"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { IdentityVerificationBadge } from "../../organisms/identity-verification/IdentityVerificationBadge"
import { IdentityVerificationStatus } from "@/modules/loan-application-management/constants/types/smart-kyc"
import {
  getPassedGovVerification,
  getPassedSelfieVerification
} from "@/modules/loan-application-management/services/identity-verification.service"
import { DateHeader } from "../../organisms/identity-verification/DateHeader"
import { SummaryItem } from "../../organisms/identity-verification/IdentityVerificationSummary"
import { LoadingWrapper } from "@/shared/atoms/LoadingWrapper"
import { getTimeFromSecs } from "@/utils/get-time-from-secs"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "@/modules/loan-application-management/constants/insight-toc.constant"
import { calculateAge, joinString } from "@/utils"
import { Separator } from "@/components/ui/separator.tsx"
import { isSbb } from "@/utils/domain.utils"
import { GovernmentIdVerification } from "../../organisms/identity-verification/GovernmentIdVerification"

export const IdentityVerificationDetails: React.FC = () => {
  const { loanSmartKycDetail, isLoadingLoanSmartKycDetail } =
    useLoanApplicationDetailContext()

  const getSummaryStatus = (): IdentityVerificationStatus => {
    const passedGovernment = getPassedGovVerification({
      governmentVerifications: loanSmartKycDetail?.governmentVerifications
    })
    const passedSelfie = getPassedSelfieVerification({
      selfieVers: loanSmartKycDetail?.selfies
    })

    return passedGovernment != null && passedSelfie != null
      ? IdentityVerificationStatus.VERIFIED
      : IdentityVerificationStatus.UNVERIFIED
  }

  const badge = !isLoadingLoanSmartKycDetail && (
    <IdentityVerificationBadge
      label={getSummaryStatus().toLowerCase()}
      status={getSummaryStatus()}
    />
  )
  const headerTitle = <>Summary {badge}</>
  const getInquirySession = (): InquirySessionResponse | null => {
    return loanSmartKycDetail?.inquirySession?.at(-1) ?? null
  }

  const content = (
    <div className="py-4">
      <LoadingWrapper
        className={isLoadingLoanSmartKycDetail ? "p-12" : "p-0"}
        isLoading={isLoadingLoanSmartKycDetail}
      >
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <SummaryItem
            subtitle1={getTimeFromSecs({
              totalSecs: loanSmartKycDetail?.behavior?.completionTime ?? 0
            })}
            title="Time to finish"
          />
          <SummaryItem
            subtitle1={`Government ID: ${
              loanSmartKycDetail?.governmentVerifications?.length ?? 0
            }`}
            subtitle2={`Selfie: ${loanSmartKycDetail?.selfies?.length ?? 0}`}
            title="Verification attemps"
          />
          <SummaryItem
            subtitle1={getInquirySession()?.regionName ?? "--"}
            subtitle2={getInquirySession()?.countryName ?? "--"}
            title="Location"
          />
        </div>
      </LoadingWrapper>
    </div>
  )

  const passedGovVerification = getPassedGovVerification({
    governmentVerifications: loanSmartKycDetail?.governmentVerifications
  })

  const verifiedInformation = () => {
    return (
      <div className="py-4">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
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
        <div className=" my-6 grid grid-cols-2 gap-6 md:grid-cols-4">
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
  const emptyInformation = (
    <p className="mt-12 text-center align-middle">
      There have been no successful Government ID Verifications.
    </p>
  )
  const govContent = (
    <LoadingWrapper
      className={isLoadingLoanSmartKycDetail ? "p-12" : "p-0"}
      isLoading={isLoadingLoanSmartKycDetail}
    >
      {passedGovVerification != null ? verifiedInformation() : emptyInformation}
    </LoadingWrapper>
  )

  return (
    <>
      <p className="text-4xl font-semibold ">Identity Verification</p>
      {!isSbb() ? (
        <>
          <IdentityVerificationCard
            content={content}
            headerRight={<DateHeader date={loanSmartKycDetail?.updatedAt} />}
            headerTitle={headerTitle}
            id={INSIGHT_IDENTITY_VERIFICATION_TOC.summary}
          />
          <IdentityVerificationCard
            content={govContent}
            headerRight={
              <DateHeader
                date={
                  passedGovVerification?.completedAt ??
                  passedGovVerification?.submittedAt ??
                  passedGovVerification?.createdAt
                }
              />
            }
            headerTitle={<>Government ID {badge}</>}
            id={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
          />
        </>
      ) : (
        <GovernmentIdVerification />
      )}

      <IdentityVerificationCard
        content={
          <p className="mt-4 align-middle text-gray-700 ">
            Applicant has submitted selfie captures which have been successful
            verified.
          </p>
        }
        headerRight={
          <DateHeader
            date={
              passedGovVerification?.completedAt ??
              passedGovVerification?.submittedAt ??
              passedGovVerification?.createdAt
            }
          />
        }
        headerTitle={<>Selfie Verification {badge}</>}
        id={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
      />
      <Separator />
    </>
  )
}
