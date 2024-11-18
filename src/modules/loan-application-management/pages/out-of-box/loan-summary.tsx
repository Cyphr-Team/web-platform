import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CashflowGlanceReport } from "@/modules/loan-application-management/components/organisms/out-of-box/cash-flow/CashflowGlance"
import { CurrentLoanFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormDetails"
import { KybFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/KybFormDetails"
import { KycFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/kyc/KycFormDetails"
import { OperatingExpensesFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/operating-expenses/OperatingExpenseFormDetails"
import { SignatureDetails } from "@/modules/loan-application/components/organisms/loan-application-form/confirmation/SignatureDetails"
import { BusinessModelFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/business-model/BusinessModelFormDetails"
import { ExecutionFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/execution/ExecutionFormDetails"
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
import { isLaunchKC } from "@/utils/domain.utils"
import { concat, get } from "lodash"
import { useRef } from "react"
import { DownloadButton } from "../../components/atoms/DownloadButton"
import { ScoreCard } from "../../components/organisms/score-card/ScoreCard"
import { ScoreCardListDetail } from "../../components/organisms/score-card/ScoreCardListDetail"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import {
  getBadgeVariantByStatus,
  getDecisionTextByStatus
} from "../../services"
import { IndustryClassification } from "@/modules/loan-application/components/organisms/Middesk/IndustryClassification.tsx"
import { Website } from "@/modules/loan-application/components/organisms/Middesk/Website.tsx"
import { AdverseMedia } from "@/modules/loan-application/components/organisms/Middesk/AdverseMedia.tsx"
import { CashFlowTable } from "@/modules/loan-application/components/molecules/loan-application-details/CashFlowTable.tsx"
import { IdentityVerificationDetails } from "@/modules/loan-application/components/molecules/loan-application-details/IdentityVerificationDetails.tsx"
import { PreQualificationFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/pre-qualification/PreQualificationFormDetails.tsx"
import usePermissions from "@/hooks/usePermissions"
import { ApplicationOverview } from "../../components/organisms/out-of-box/loan-summary"
import { useQueryGetLoanApplicationDetailStatus } from "../../hooks/useQuery/useQueryGetLoanApplicationDetailStatus"
import { useParams } from "react-router-dom"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { LaunchKcFitFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/LaunchKcFitFormDetails"

export function Component() {
  const params = useParams()
  const {
    loanSummary,
    loanApplicationDetails,
    newCashFlowGlance,
    isFetchingCashflow,
    isFetchingNewCashFlow
  } = useLoanApplicationDetailContext()

  // Get Application Status
  const { data: statusData } = useQueryGetLoanApplicationDetailStatus({
    applicationId: params.id!
  })

  const notAllowToDownloadStatuses: string[] = [
    LoanApplicationStatus.DRAFT,
    LoanApplicationStatus.PENDING_SUBMISSION
  ]

  const {
    isJudge,
    isWorkspaceAdmin,
    shouldDisplayCashFlowTable,
    shouldDisplayHighRiskEntity,
    shouldDisplayCashFlowReport,
    shouldDisplayOperatingExpensesSection
  } = usePermissions()

  const page_1 = useRef<HTMLDivElement>(null)
  const page_2 = useRef<HTMLDivElement>(null)
  const page_3 = useRef<HTMLDivElement>(null)
  const page_4 = useRef<HTMLDivElement>(null)
  const page_5 = useRef<HTMLDivElement>(null)
  const page_6 = useRef<HTMLDivElement>(null)
  const page_7 = useRef<HTMLDivElement>(null)
  const page_8 = useRef<HTMLDivElement>(null)
  const page_9 = useRef<HTMLDivElement>(null)
  const page_10 = useRef<HTMLDivElement>(null)
  const page_11 = useRef<HTMLDivElement>(null)
  const page_12 = useRef<HTMLDivElement>(null)
  const page_13 = useRef<HTMLDivElement>(null)
  const page_14 = useRef<HTMLDivElement>(null)

  const elementToExportRef = concat(
    page_1,
    isLaunchKC() ? [page_2, page_3] : [],
    shouldDisplayCashFlowTable ? [page_4] : [],
    page_5,
    shouldDisplayOperatingExpensesSection ? page_6 : [],
    isLaunchKC() ? [page_7, page_8, page_9] : [],
    page_10,
    page_11,
    shouldDisplayHighRiskEntity ? [page_12] : [],
    page_13,
    shouldDisplayCashFlowReport ? [page_14] : []
  )

  // we can easily adjust the order of form here
  // split the form into two groups to avoid overflow
  const formsOrder = [
    {
      page: page_7,
      forms: [
        { key: "productServiceForm", Component: ProductServiceFormDetails },
        {
          key: "marketOpportunityForm",
          Component: MarketOpportunityFormDetails
        },
        { key: "launchKcfitForm", Component: LaunchKcFitFormDetails }
      ]
    },
    {
      page: page_8,
      forms: [{ key: "executionForm", Component: ExecutionFormDetails }]
    },
    {
      page: page_9,
      forms: [{ key: "businessModelForm", Component: BusinessModelFormDetails }]
    }
  ]

  // Define the function to determine which component to render
  const renderCurrentLoanFormDetails = () => {
    // TODO: FormV2 currentloan here
    return (
      <CurrentLoanFormDetails
        currentLoanFormData={loanSummary?.currentLoanForms}
      />
    )
  }

  const isOverviewDownloadable =
    statusData &&
    !notAllowToDownloadStatuses.includes(statusData.toUpperCase()) &&
    !isJudge

  const downloadOverviewButton = isOverviewDownloadable && (
    <DownloadButton
      disabled={isFetchingCashflow || isFetchingNewCashFlow}
      elementToExportRef={elementToExportRef}
    />
  )

  return (
    <div className="w-full gap-3xl lg:flex" id="loan-summary">
      <Card className="size-full flex-1 space-y-4xl p-4xl">
        <div
          ref={page_1}
          className="flex flex-col gap-3xl"
          id="application-overview"
        >
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
            <p className="text-4xl font-semibold ">Application Overview</p>
            {downloadOverviewButton}
          </div>
          <ApplicationOverview />
          <Separator />

          {isLaunchKC() && (
            <PreQualificationFormDetails
              data={loanSummary?.preQualificationForm}
            />
          )}
          {!isLaunchKC() && (
            <>
              <p className="loan-application-header text-4xl font-semibold">
                Application Details
              </p>
              <KybFormDetails kybFormData={loanSummary?.kybForm} />
              <KycFormDetails kycFormData={loanSummary?.kycForm} />
            </>
          )}
        </div>
        {isLaunchKC() && (
          <>
            <div
              ref={page_2}
              className="flex flex-col space-y-3xl"
              id="application-overview"
            >
              <KybFormDetails kybFormData={loanSummary?.kybForm} />
            </div>
            <div ref={page_3} className="flex flex-col space-y-3xl">
              <KycFormDetails kycFormData={loanSummary?.kycForm} />
            </div>
          </>
        )}
        {shouldDisplayCashFlowTable ? (
          <div ref={page_4} className="flex flex-col space-y-3xl">
            <CashFlowTable wrapperClassName="rounded-lg border" />
          </div>
        ) : null}
        <div
          ref={page_5}
          className="flex flex-col space-y-3xl"
          id="loan-application"
        >
          {renderCurrentLoanFormDetails()}
        </div>
        {shouldDisplayOperatingExpensesSection ? (
          <div ref={page_6} className="flex flex-col space-y-3xl">
            <OperatingExpensesFormDetails
              operatingExpensesFormData={loanSummary?.operatingExpensesForm}
            />
          </div>
        ) : null}
        {/* Loan summary */}
        {isLaunchKC() && (
          <>
            {formsOrder.map(({ page, forms }) => (
              // eslint-disable-next-line react/jsx-key
              <div ref={page} className="flex flex-col space-y-3xl">
                {forms.map(({ key, Component }) => {
                  const formData = get(loanSummary, key)

                  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                  return formData && <Component key={key} data={formData} />
                })}
              </div>
            ))}
          </>
        )}

        <div
          ref={page_10}
          className="flex flex-col space-y-3xl"
          id="business-verification-p1"
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
          ref={page_11}
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
            ref={page_12}
            className="flex flex-col space-y-3xl"
            id="business-verification-p3"
          >
            <IndustryClassification />
            <Website />
            <AdverseMedia />
            <Separator />
          </div>
        ) : null}

        <div
          ref={page_13}
          className="flex flex-col space-y-3xl"
          id="identity-verification"
        >
          <IdentityVerificationDetails />
        </div>

        {shouldDisplayCashFlowReport ? (
          <div
            ref={page_14}
            className="flex flex-col space-y-3xl"
            id="cash-flow-report"
          >
            <p className="text-4xl font-semibold">Cash Flow Report</p>
            <Card className="flex h-fit flex-col gap-2xl overflow-auto rounded-lg p-4xl shadow-none">
              <CashflowGlanceReport
                isFetchingNewCashFlow={isFetchingNewCashFlow}
                newCashFlowGlance={newCashFlowGlance}
              />
            </Card>
          </div>
        ) : null}
      </Card>
      {isLaunchKC() && isJudge ? <ScoreCard /> : null}
      {isLaunchKC() && isWorkspaceAdmin ? <ScoreCardListDetail /> : null}
    </div>
  )
}

Component.displayName = "LoanSummary"
