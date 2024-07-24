import { Card } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CashflowGlanceReport } from "@/modules/loan-application-management/components/organisms/out-of-box/loan-summary/CashflowGlance.tsx"
import { CurrentLoanFormDetails } from "@/modules/loan-application/components/molecules/loan-application-details/CurrentLoanFormDetails.tsx"
import { KybFormDetails } from "@/modules/loan-application/components/molecules/loan-application-details/KybFormDetails"
import { KycFormDetails } from "@/modules/loan-application/components/molecules/loan-application-details/KycFormDetails"
import { OperatingExpensesFormDetails } from "@/modules/loan-application/components/molecules/loan-application-details/OperatingExpenseFormDetails.tsx"
import { SignatureDetails } from "@/modules/loan-application/components/organisms/loan-application-details/SignatureDetails"
import { BusinessModelFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/business-model/BusinessModelFormDetails"
import { ExecutionFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/execution/ExecutionFormDetails"
import { LaunchKcFitFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/launchkc-fit/LaunchKcFitFormDetails"
import { MarketOpportunityFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/market-opportunity/MarketOpportunityFormDetails.tsx"
import { ProductServiceFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/product-service/ProductServiceFormDetails"
import { Bankruptcy } from "@/modules/loan-application/components/organisms/Middesk/Bankruptcy"
import { BusinessDetail } from "@/modules/loan-application/components/organisms/Middesk/BusinessDetail"
import { BusinessName } from "@/modules/loan-application/components/organisms/Middesk/BusinessName"
import { OfficeAddress } from "@/modules/loan-application/components/organisms/Middesk/OfficeAddress"
import { People } from "@/modules/loan-application/components/organisms/Middesk/People"
import { Secretary } from "@/modules/loan-application/components/organisms/Middesk/Secretary"
import { TinMatch } from "@/modules/loan-application/components/organisms/Middesk/TinMatch"
import { WatchList } from "@/modules/loan-application/components/organisms/Middesk/WatchList"
import { checkIsJudge, checkIsWorkspaceAdmin } from "@/utils/check-roles"
import { isLaunchKC } from "@/utils/domain.utils"
import { isEnableJudgeSubmitScore } from "@/utils/feature-flag.utils"
import { get } from "lodash"
import { useRef } from "react"
import { DownloadButton } from "../../components/atoms/DownloadButton"
import { ApplicationOverview } from "../../components/organisms/out-of-box/loan-summary/ApplicationOverview"
import { ScoreCard } from "../../components/organisms/ScoreCard"
import { ScoreCardListDetail } from "../../components/organisms/ScoreCardListDetail"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import {
  getBadgeVariantByStatus,
  getDecisionTextByStatus
} from "../../services"

export function Component() {
  const {
    loanSummary,
    loanApplicationDetails,
    isFetchingCashflow,
    isFetchingNewCashFlow
  } = useLoanApplicationDetailContext()

  const isJudge = checkIsJudge()
  const isWorkspaceAdmin = checkIsWorkspaceAdmin()

  const page_1 = useRef<HTMLDivElement>(null)
  const page_2 = useRef<HTMLDivElement>(null)
  const page_3 = useRef<HTMLDivElement>(null)
  const page_4 = useRef<HTMLDivElement>(null)
  const page_5 = useRef<HTMLDivElement>(null)
  const page_6 = useRef<HTMLDivElement>(null)
  const page_7 = useRef<HTMLDivElement>(null)

  const elementToExportRef = [page_1, page_2, page_3, page_5, page_6, page_7]

  // we can easily adjust the order of form here
  const formsOrder = [
    { key: "productServiceForm", Component: ProductServiceFormDetails },
    { key: "marketOpportunityForm", Component: MarketOpportunityFormDetails },
    { key: "launchKCFitForm", Component: LaunchKcFitFormDetails },
    { key: "executionForm", Component: ExecutionFormDetails },
    { key: "businessModelForm", Component: BusinessModelFormDetails }
  ]

  return (
    <div className="lg:flex gap-3xl w-full" id="loan-summary">
      <Card className="w-full flex-1 h-full space-y-4xl p-4xl">
        <div
          id="application-overview"
          className="flex flex-col gap-3xl"
          ref={page_1}
        >
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
                  {getDecisionTextByStatus(loanApplicationDetails?.decision)}
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

          <div className="space-y-lg mt-lg flex justify-between gap-2 flex-wrap items-center">
            <p className="text-4xl font-semibold ">Application Overview</p>
            <DownloadButton
              elementToExportRef={elementToExportRef}
              disabled={isFetchingCashflow || isFetchingNewCashFlow}
            />
          </div>
          <ApplicationOverview />
          <Separator />
          <p className="text-4xl font-semibold loan-application-header">
            Loan Application
          </p>
          <KybFormDetails kybFormData={loanSummary?.kybForm} />
          <KycFormDetails kycFormData={loanSummary?.kycForm} />
        </div>
        <div
          className="space-y-3xl flex flex-col"
          id="loan-application"
          ref={page_2}
        >
          <CurrentLoanFormDetails
            currentLoanFormData={loanSummary?.currentLoanForms}
          />
        </div>
        <div className="space-y-3xl flex flex-col" ref={page_3}>
          <OperatingExpensesFormDetails
            operatingExpensesFormData={loanSummary?.operatingExpensesForm}
          />
        </div>

        {/* Loan summary */}
        <div className="space-y-3xl flex flex-col" ref={page_4}>
          {formsOrder.map(({ key, Component }) => {
            const formData = get(loanSummary, key)
            return formData && <Component key={key} data={formData} />
          })}
        </div>

        <div
          className="flex flex-col space-y-3xl"
          id="business-verification-p1"
          ref={page_5}
        >
          <SignatureDetails
            confirmationFormData={loanSummary?.confirmationForm}
            hasTitle={false}
          />
          <Separator />
          <p className="text-4xl font-semibold ">Business Verification</p>
          <BusinessDetail isDownloadAble={false} />
          <BusinessName />
          <OfficeAddress />
        </div>

        <div
          className="flex flex-col space-y-3xl"
          id="business-verification-p2"
          ref={page_6}
        >
          <Secretary />
          <TinMatch />
          <People />
          <WatchList />
          <Bankruptcy />
          <Separator />
        </div>

        <div
          className="flex flex-col space-y-3xl"
          id="cash-flow-report"
          ref={page_7}
        >
          <p className="text-4xl font-semibold ">Cash Flow Report</p>
          <CashflowGlanceReport />
        </div>
      </Card>
      {isLaunchKC() && isJudge && isEnableJudgeSubmitScore() && <ScoreCard />}
      {isLaunchKC() && isWorkspaceAdmin && isEnableJudgeSubmitScore() && (
        <ScoreCardListDetail />
      )}
    </div>
  )
}

Component.displayName = "LoanSummary"
