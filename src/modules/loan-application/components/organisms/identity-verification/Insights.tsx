import { Separator } from "@radix-ui/react-dropdown-menu"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "../../../../../components/ui/card"
import { Skeleton } from "../../../../../components/ui/skeleton"
import InsightItem from "../../molecules/InsightItem"
import { useLoanApplicationDetailContext } from "../../../../loan-application-management/providers/LoanApplicationDetailProvider"
import { INSIGHT_IDENTITY_VERIFICATION_TOC } from "../../../../loan-application-management/constants/insight-toc.constant"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"
import {
  getPassedGovVerification,
  getPassedSelfieVerification
} from "../../../../loan-application-management/services/identity-verification.service"

export const Insights = () => {
  const { loanSmartKycDetail, isLoading } = useLoanApplicationDetailContext()

  const totalStep = 2
  const govermentIdStep = (): IdentityVerificationStatus => {
    const passedGov = getPassedGovVerification({
      govermentVerifications: loanSmartKycDetail?.governmentVerifications
    })
    return passedGov != null
      ? IdentityVerificationStatus.VERIFIED
      : IdentityVerificationStatus.UNVERIFIED
  }

  const selfieStep = (): IdentityVerificationStatus => {
    const passedSelfie = getPassedSelfieVerification({
      selfieVers: loanSmartKycDetail?.selfies
    })
    return passedSelfie != null
      ? IdentityVerificationStatus.VERIFIED
      : IdentityVerificationStatus.UNVERIFIED
  }

  const numberOfSuccess = () => {
    return (
      [govermentIdStep(), selfieStep()].filter(
        (e) => e == IdentityVerificationStatus.VERIFIED
      )?.length ?? 0
    )
  }

  return (
    <Card className="h-fit lg:sticky top-0 z-10 mb-4 flex-shrink-0">
      <CardHeader className="!pb-0 px-0 md:px-0">
        <CardTitle className="font-bold text-base flex justify-between items-center px-4">
          <div>Insights</div>
          {isLoading ? (
            <Skeleton className="w-16 h-4" />
          ) : (
            <div>
              {numberOfSuccess()}/{totalStep}
            </div>
          )}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full lg:w-[300px] !p-4 !pt-0">
        <InsightItem
          title="Government ID"
          status={govermentIdStep()}
          label={govermentIdStep().toLowerCase()}
          toolTipContent="Government Id Verification uses the ID Card, Driver license, etc"
          href={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
          isLoading={isLoading}
        />
        <InsightItem
          title="Selfie verification"
          status={selfieStep()}
          label={selfieStep().toLowerCase()}
          toolTipContent="Selfie Verification uses the Persona to authenticate"
          href={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
          isLoading={isLoading}
          noBorder={true}
        />
      </CardContent>
    </Card>
  )
}
