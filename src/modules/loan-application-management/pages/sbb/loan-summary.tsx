import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SignatureDetails } from "@/modules/loan-application/components/organisms/loan-application-form/confirmation/SignatureDetails"
import { Bankruptcy } from "@/modules/loan-application/components/organisms/Middesk/Bankruptcy"
import { BusinessDetail } from "@/modules/loan-application/components/organisms/Middesk/BusinessDetail"
import { BusinessName } from "@/modules/loan-application/components/organisms/Middesk/BusinessName"
import { OfficeAddress } from "@/modules/loan-application/components/organisms/Middesk/OfficeAddress"
import { People } from "@/modules/loan-application/components/organisms/Middesk/People"
import { Secretary } from "@/modules/loan-application/components/organisms/Middesk/Secretary"
import { TinMatch } from "@/modules/loan-application/components/organisms/Middesk/TinMatch"
import { WatchList } from "@/modules/loan-application/components/organisms/Middesk/WatchList"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import {
  getBadgeVariantByStatus,
  getDecisionTextByStatus
} from "../../services"
import { IndustryClassification } from "@/modules/loan-application/components/organisms/Middesk/IndustryClassification.tsx"
import { Website } from "@/modules/loan-application/components/organisms/Middesk/Website.tsx"
import { AdverseMedia } from "@/modules/loan-application/components/organisms/Middesk/AdverseMedia.tsx"
import { IdentityVerificationDetails } from "@/modules/loan-application/components/molecules/loan-application-details/IdentityVerificationDetails.tsx"
import usePermissions from "@/hooks/usePermissions"

import { PreApplicationDisclosuresDetails } from "@/modules/loan-application/components/organisms/loan-application-form/pre-application-disclosures/PreApplicationDisclosuresDetails"
import { SbbKybFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/sbb/SbbKybFormDetails"
import { SbbKycFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/kyc/sbb/SbbKycFormDetails"
import { SbbSubmittedDocuments } from "../../components/organisms/loan-summary/SbbDocumentUploaded"

export function Component() {
  const { loanSummary, loanApplicationDetails } =
    useLoanApplicationDetailContext()

  const { shouldDisplayHighRiskEntity } = usePermissions()

  return (
    <div className="w-full gap-3xl lg:flex" id="loan-summary">
      <Card className="size-full flex-1 space-y-4xl p-4xl">
        <div className="flex flex-col gap-3xl" id="application-overview">
          {!!loanApplicationDetails?.decision && (
            <div className="flex flex-col gap-2">
              <Badge
                className="relative w-fit px-4 py-2 capitalize"
                variant="soft"
                variantColor={getBadgeVariantByStatus(
                  loanApplicationDetails?.status
                )}
              >
                <p className="text-base">
                  {getDecisionTextByStatus(loanApplicationDetails?.decision)}
                </p>
              </Badge>
              {!!loanApplicationDetails?.decisionNote?.length && (
                <p className="pl-4 text-sm">
                  <span className="text-sm font-semibold">Decision note: </span>
                  {loanApplicationDetails?.decisionNote}
                </p>
              )}
            </div>
          )}

          <div className="mt-lg flex flex-wrap items-center justify-between gap-2 space-y-lg">
            <p className="text-4xl font-semibold ">Application Summary</p>
          </div>
          <PreApplicationDisclosuresDetails />
          <SbbKybFormDetails kybFormData={loanSummary?.kybForm} />
          {loanSummary?.kycForm ? (
            <SbbKycFormDetails kycFormData={loanSummary?.kycForm} />
          ) : null}
          <SbbSubmittedDocuments />
        </div>
        <div
          className="flex flex-col space-y-3xl"
          id="business-verification-p1"
        >
          <SignatureDetails
            confirmationFormData={loanSummary?.confirmationForm}
            hasTitle={false}
          />
          <BusinessDetail isDownloadAble={false} />
          <BusinessName />
          <OfficeAddress />
        </div>

        <div
          className="flex flex-col space-y-3xl"
          id="business-verification-p2"
        >
          <Secretary />
          <TinMatch />
          <People />
          <WatchList />
          <Bankruptcy />
          <Separator />
        </div>

        {shouldDisplayHighRiskEntity ? (
          <div
            className="flex flex-col space-y-3xl"
            id="business-verification-p3"
          >
            <IndustryClassification />
            <Website />
            <AdverseMedia />
            <Separator />
          </div>
        ) : null}

        <div className="flex flex-col space-y-3xl" id="identity-verification">
          <IdentityVerificationDetails />
        </div>
      </Card>
    </div>
  )
}

Component.displayName = "LoanSummary"
