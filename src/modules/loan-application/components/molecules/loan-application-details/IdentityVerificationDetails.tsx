import React from "react"
import { InquirySessionResponse } from "@/lib/persona/persona.types"
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
      status={getSummaryStatus()}
      label={getSummaryStatus().toLowerCase()}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <SummaryItem
            title="Time to finish"
            subtitle1={getTimeFromSecs({
              totalSecs: loanSmartKycDetail?.behavior?.completionTime ?? 0
            })}
          />
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

  const passedGovVerification = getPassedGovVerification({
    governmentVerifications: loanSmartKycDetail?.governmentVerifications
  })

  const verifiedInformation = () => {
    return (
      <div className="py-4">
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
  const emptyInformation = (
    <p className="text-center align-middle mt-12">
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
            id={INSIGHT_IDENTITY_VERIFICATION_TOC.summary}
            headerTitle={headerTitle}
            headerRight={<DateHeader date={loanSmartKycDetail?.updatedAt} />}
            content={content}
          />
          <IdentityVerificationCard
            id={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
            headerTitle={<>Government ID {badge}</>}
            headerRight={
              <DateHeader
                date={
                  passedGovVerification?.completedAt ??
                  passedGovVerification?.submittedAt ??
                  passedGovVerification?.createdAt
                }
              />
            }
            content={govContent}
          />
        </>
      ) : (
        <GovernmentIdVerification />
      )}

      <IdentityVerificationCard
        id={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
        headerTitle={<>Selfie Verification {badge}</>}
        headerRight={
          <DateHeader
            date={
              passedGovVerification?.completedAt ??
              passedGovVerification?.submittedAt ??
              passedGovVerification?.createdAt
            }
          />
        }
        content={
          <p className="align-middle mt-4 text-gray-700 ">
            Applicant has submitted selfie captures which have been successful
            verified.
          </p>
        }
      />
      <Separator />
    </>
  )
}
