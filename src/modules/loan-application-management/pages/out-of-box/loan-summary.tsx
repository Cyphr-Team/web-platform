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
import { isKansasCity, isLaunchKC, isSbb } from "@/utils/domain.utils"
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
import { SbbCurrentLoanFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/sbb/SbbCurrentLoanFormDetails"
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
import { KansasCityCurrentLoanFormDetails } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/kansascity/KansasCityCurrentLoanFormDetails"

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
    if (isSbb()) {
      return (
        <SbbCurrentLoanFormDetails
          currentLoanFormData={loanSummary?.currentLoanForms}
        />
      )
    }
    if (isKansasCity()) {
      return (
        <KansasCityCurrentLoanFormDetails
          currentLoanFormData={loanSummary?.currentLoanForms}
        />
      )
    }
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
      elementToExportRef={elementToExportRef}
      disabled={isFetchingCashflow || isFetchingNewCashFlow}
    />
  )

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
              <p className="text-4xl font-semibold loan-application-header">
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
              className="space-y-3xl flex flex-col"
              id="application-overview"
              ref={page_2}
            >
              <KybFormDetails kybFormData={loanSummary?.kybForm} />
            </div>
            <div className="space-y-3xl flex flex-col" ref={page_3}>
              <KycFormDetails kycFormData={loanSummary?.kycForm} />
            </div>
          </>
        )}
        {shouldDisplayCashFlowTable && (
          <div className="space-y-3xl flex flex-col" ref={page_4}>
            <CashFlowTable />
          </div>
        )}
        <div
          className="space-y-3xl flex flex-col"
          id="loan-application"
          ref={page_5}
        >
          {renderCurrentLoanFormDetails()}
        </div>
        {shouldDisplayOperatingExpensesSection && (
          <div className="space-y-3xl flex flex-col" ref={page_6}>
            <OperatingExpensesFormDetails
              operatingExpensesFormData={loanSummary?.operatingExpensesForm}
            />
          </div>
        )}
        {/* Loan summary */}
        {isLaunchKC() && (
          <>
            {formsOrder.map(({ page, forms }) => (
              <div className="space-y-3xl flex flex-col" ref={page}>
                {forms.map(({ key, Component }) => {
                  const formData = get(loanSummary, key)
                  return formData && <Component key={key} data={formData} />
                })}
              </div>
            ))}
          </>
        )}

        <div
          className="flex flex-col space-y-3xl"
          id="business-verification-p1"
          ref={page_10}
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
          ref={page_11}
        >
          <Secretary />
          <TinMatch />
          <People />
          <WatchList />
          <Bankruptcy />
          <Separator />
        </div>

        {shouldDisplayHighRiskEntity && (
          <div
            className="flex flex-col space-y-3xl"
            id="business-verification-p3"
            ref={page_12}
          >
            <IndustryClassification />
            <Website />
            <AdverseMedia />
            <Separator />
          </div>
        )}

        <div
          className="space-y-3xl flex flex-col"
          id="identity-verification"
          ref={page_13}
        >
          <IdentityVerificationDetails />
        </div>

        {shouldDisplayCashFlowReport && (
          <div
            className="flex flex-col space-y-3xl"
            id="cash-flow-report"
            ref={page_14}
          >
            <p className="text-4xl font-semibold">Cash Flow Report</p>
            <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto shadow-none">
              <CashflowGlanceReport
                newCashFlowGlance={newCashFlowGlance}
                isFetchingNewCashFlow={isFetchingNewCashFlow}
              />
            </Card>
          </div>
        )}
      </Card>
      {isLaunchKC() && isJudge && <ScoreCard />}
      {isLaunchKC() && isWorkspaceAdmin && <ScoreCardListDetail />}
    </div>
  )
}

Component.displayName = "LoanSummary"
