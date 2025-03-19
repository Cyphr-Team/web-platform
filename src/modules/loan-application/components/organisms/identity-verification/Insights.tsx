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

export function Insights() {
  const { loanSmartKycDetail, isLoading } = useLoanApplicationDetailContext()

  const totalStep = 2
  const govermentIdStep = (): IdentityVerificationStatus => {
    const passedGov = getPassedGovVerification({
      governmentVerifications: loanSmartKycDetail?.governmentVerifications
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
    <Card className="top-0 z-10 mb-4 h-fit shrink-0 lg:sticky">
      <CardHeader className="px-0 !pb-0 md:px-0">
        <CardTitle className="flex items-center justify-between px-4 text-base font-bold">
          <div>Insights</div>
          {isLoading ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            <div>
              {numberOfSuccess()}/{totalStep}
            </div>
          )}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full !p-4 !pt-0 lg:w-[300px]">
        <InsightItem
          href={INSIGHT_IDENTITY_VERIFICATION_TOC.governmentId}
          isLoading={isLoading}
          label={govermentIdStep().toLowerCase()}
          status={govermentIdStep()}
          title="Government ID"
          toolTipContent="Government Id Verification uses the ID Card, Driver license, etc"
        />
        <InsightItem
          noBorder
          href={INSIGHT_IDENTITY_VERIFICATION_TOC.selfieVerification}
          isLoading={isLoading}
          label={selfieStep().toLowerCase()}
          status={selfieStep()}
          title="Selfie Verification"
          toolTipContent="Selfie Verification uses the Persona to authenticate"
        />
      </CardContent>
    </Card>
  )
}
