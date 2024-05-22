import { Card } from "@/components/ui/card"

import { useRef } from "react"
import { DownloadButton } from "../../components/atoms/DownloadButton"
import { ApplicationOverview } from "../../components/organisms/out-of-box/loan-summary/ApplicationOverview"
import { KybFormDetails } from "@/modules/loan-application/components/molecules/loan-application-details/KybFormDetails"
import { KycFormDetails } from "@/modules/loan-application/components/molecules/loan-application-details/KycFormDetails"
import { SignatureDetails } from "@/modules/loan-application/components/organisms/loan-application-details/SignatureDetails"
import { BusinessDetail } from "@/modules/loan-application/components/organisms/Middesk/BusinessDetail"
import { OfficeAddress } from "@/modules/loan-application/components/organisms/Middesk/OfficeAddress"
import { Secretary } from "@/modules/loan-application/components/organisms/Middesk/Secretary"
import { TinMatch } from "@/modules/loan-application/components/organisms/Middesk/TinMatch"
import { People } from "@/modules/loan-application/components/organisms/Middesk/People"
import { WatchList } from "@/modules/loan-application/components/organisms/Middesk/WatchList"
import { Bankruptcy } from "@/modules/loan-application/components/organisms/Middesk/Bankruptcy"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { LoanDecisionEnum } from "../../constants/types/application"
import { Badge } from "@/components/ui/badge"
import { getBadgeVariantByStatus } from "../../services"
import { BusinessName } from "@/modules/loan-application/components/organisms/Middesk/BusinessName"
import { CashflowGlanceReport } from "@/modules/loan-application-management/components/organisms/cashflow/report/CashflowGlance.tsx"

export function Component() {
  const { loanSummary, loanApplicationDetails } =
    useLoanApplicationDetailContext()

  const applicationOverviewRef = useRef<HTMLDivElement>(null)
  const loanApplicationRef = useRef<HTMLDivElement>(null)
  const businessVerificationRefP1 = useRef<HTMLDivElement>(null)
  const businessVerificationRefP2 = useRef<HTMLDivElement>(null)
  const cashFlowReportRef = useRef<HTMLDivElement>(null)

  const elementToExportRef = [
    applicationOverviewRef,
    loanApplicationRef,
    businessVerificationRefP1,
    businessVerificationRefP2,
    cashFlowReportRef
  ]

  return (
    <div className="lg:flex gap-3xl w-full flex-col" id="loan-summary">
      <Card className="w-full flex-1 h-full space-y-4xl p-4xl">
        <div ref={applicationOverviewRef} className="flex flex-col gap-3xl">
          {!!loanApplicationDetails?.decision && (
            <div className="flex flex-col gap-2">
              <Badge
                variant="soft"
                variantColor={getBadgeVariantByStatus(
                  loanApplicationDetails?.status
                )}
                className="capitalize px-4 py-2 relative w-fit"
              >
                <p className="text-base">
                  {loanApplicationDetails?.decision ===
                  LoanDecisionEnum.APPROVED
                    ? "Ideal Applicant"
                    : "Not Ideal Time to Apply"}
                </p>
              </Badge>
              {!!loanApplicationDetails?.decisionNote?.length && (
                <p className="text-sm pl-4">
                  <span className="text-sm font-semibold">Decision note: </span>
                  {loanApplicationDetails?.decisionNote}
                </p>
              )}
            </div>
          )}
          <div className="space-y-3xl">
            <div className="space-y-lg mt-lg flex justify-between gap-2 flex-wrap items-center">
              <p className="text-4xl font-semibold ">Application Overview</p>
              <DownloadButton elementToExportRef={elementToExportRef} />
            </div>
            <ApplicationOverview />
          </div>
        </div>
        <div className="space-y-3xl flex flex-col" ref={loanApplicationRef}>
          <p className="text-4xl font-semibold ">Loan Application</p>
          <KybFormDetails kybFormData={loanSummary?.kybForm} />
          <KycFormDetails kycFormData={loanSummary?.kycForm} />
          <SignatureDetails
            confirmationFormData={loanSummary?.confirmationForm}
            hasTitle={false}
          />
        </div>

        <div className="space-y-3xl">
          <div
            className="flex flex-col space-y-3xl"
            ref={businessVerificationRefP1}
          >
            <p className="text-4xl font-semibold ">Business Verification</p>
            <BusinessDetail isDownloadAble={false} />
            <BusinessName />
            <OfficeAddress />
            <Secretary />
            <TinMatch />
          </div>

          <div
            className="flex flex-col space-y-3xl"
            ref={businessVerificationRefP2}
          >
            <People />
            <WatchList />
            <Bankruptcy />
          </div>
        </div>

        <div className="flex flex-col space-y-3xl" ref={cashFlowReportRef}>
          <p className="text-4xl font-semibold ">Cash Flow Report</p>
          <CashflowGlanceReport />
        </div>
      </Card>
    </div>
  )
}

Component.displayName = "LoanSummary"
