import { createContext, useContext, useMemo, useReducer } from "react"
import { DEFAULT_DASHBOARD_STATE } from "../constants/dashboard.constants"
import { useQueryGetAggregateApprovedLoanAmount } from "../hooks/query/useQueryGetAggregateApprovedLoanAmount"
import { useQueryGetApprovalRate } from "../hooks/query/useQueryGetApprovalRate"
import { useQueryGetAverageApprovalRate } from "../hooks/query/useQueryGetAverageApprovalRate"
import { useQueryGetAverageApprovedLoanSize } from "../hooks/query/useQueryGetAverageLoanSize"
import { useQueryGetAverageTimeToApproval } from "../hooks/query/useQueryGetAverageTimeToApproval"
import { useQueryGetAverageTimeToApprovalMetrics } from "../hooks/query/useQueryGetAverageTimeToApprovalMetrics"
import { useQueryGetAverageTimeToDecision } from "../hooks/query/useQueryGetAverageTimeToDecision"
import { useQueryGetIncompleteApplicationRate } from "../hooks/query/useQueryGetIncompleteApplicationRate"
import { useQueryGetInstitutionActivity } from "../hooks/query/useQueryGetInstitutionActivity"
import { useQueryGetInstitutionUsage } from "../hooks/query/useQueryGetInstitutionUsage"
import { useQueryGetPortfolioGrowth } from "../hooks/query/useQueryGetPortfolioGrowth"
import {
  DashboardProviderProps,
  DashboardProviderState
} from "../types/stats.types"
import { dashboardReducer } from "./dashboard-reducer"
import { useQueryGetLoanApplicationActivities } from "../hooks/query/useQueryGetLoanApplicationActivities"
import { useQueryGetAverageApprovedLoanAmount } from "../hooks/query/useQueryGetAverageApprovedLoanAmount"

const DashboardContext = createContext<DashboardProviderState>({
  dashboardState: DEFAULT_DASHBOARD_STATE,
  dashboardDispatch: () => null
})

export function DashboardProvider({
  children,
  ...props
}: DashboardProviderProps) {
  const [dashboardState, dashboardDispatch] = useReducer(
    dashboardReducer,
    DEFAULT_DASHBOARD_STATE
  )

  const usageResponse = useQueryGetInstitutionUsage()

  // Data V2
  const averageApprovalRate = useQueryGetAverageApprovalRate(dashboardState)
  const aggregateApprovedLoanAmount =
    useQueryGetAggregateApprovedLoanAmount(dashboardState)
  const averageTimeToApproval = useQueryGetAverageTimeToApproval(dashboardState)
  const loanApplicationActivities =
    useQueryGetLoanApplicationActivities(dashboardState)
  const averageTimeToDecision = useQueryGetAverageTimeToDecision(dashboardState)
  const averageApprovedLoanAmount =
    useQueryGetAverageApprovedLoanAmount(dashboardState)

  const statsResponse = useQueryGetInstitutionActivity(dashboardState)
  const approvalRate = useQueryGetApprovalRate(dashboardState)
  const incompleteApplicationRate =
    useQueryGetIncompleteApplicationRate(dashboardState)
  const averageTimeToApprovalMetricsResponse =
    useQueryGetAverageTimeToApprovalMetrics(dashboardState)
  const averageApprovedLoanSize =
    useQueryGetAverageApprovedLoanSize(dashboardState)
  const portfolioGrowth = useQueryGetPortfolioGrowth(dashboardState)

  const value = useMemo(
    () => ({
      dashboardState,
      dashboardDispatch,
      statsData: statsResponse.data?.data,
      isLoading: statsResponse.isFetching,
      approvalRateData: approvalRate.data?.data,
      isLoadingApprovalRate: approvalRate.isFetching,

      incompleteApplicationRateData: incompleteApplicationRate.data?.data,
      isLoadingIncompleteApplicationRate: incompleteApplicationRate.isFetching,

      averageTimeToApprovalMetricsData:
        averageTimeToApprovalMetricsResponse.data?.data,
      isLoadingAverageTimeToApprovalMetrics:
        averageTimeToApprovalMetricsResponse.isFetching,

      averageApprovedLoanSizeData: averageApprovedLoanSize.data?.data,
      isLoadingAverageApprovedLoanSize: averageApprovedLoanSize.isFetching,

      portfolioGrowthData: portfolioGrowth.data?.data,
      isLoadingPortfolioGrowth: portfolioGrowth.isFetching,

      usageData: usageResponse.data,
      isLoadingUsage: usageResponse.isFetching,

      averageApprovalRateData: averageApprovalRate.data?.data,
      isLoadingAverageApprovalRate: averageApprovalRate.isFetching,

      aggregateApprovedLoanAmountData: aggregateApprovedLoanAmount.data?.data,
      isLoadingAggregateApprovedLoanAmount:
        aggregateApprovedLoanAmount.isFetching,

      averageTimeToApprovalData: averageTimeToApproval.data?.data,
      isLoadingAverageTimeToApproval: averageTimeToApproval.isFetching,

      loanApplicationActivitiesData: loanApplicationActivities.data?.data,
      isLoadingLoanApplicationActivities: loanApplicationActivities.isFetching,

      averageTimeToDecisionData: averageTimeToDecision.data?.data,
      isLoadingAverageTimeToDecision: averageTimeToDecision.isFetching,

      averageApprovedLoanAmountData: averageApprovedLoanAmount.data?.data,
      isLoadingAverageApprovedLoanAmount: averageApprovedLoanAmount.isFetching
    }),
    [
      approvalRate.data?.data,
      approvalRate.isFetching,
      averageApprovedLoanSize.data?.data,
      averageApprovedLoanSize.isFetching,
      averageTimeToApprovalMetricsResponse.data?.data,
      averageTimeToApprovalMetricsResponse.isFetching,
      dashboardState,
      incompleteApplicationRate.data?.data,
      incompleteApplicationRate.isFetching,
      portfolioGrowth.data?.data,
      portfolioGrowth.isFetching,
      statsResponse.data?.data,
      statsResponse.isFetching,
      usageResponse.data,
      usageResponse.isFetching,

      averageApprovalRate.data?.data,
      averageApprovalRate.isFetching,

      aggregateApprovedLoanAmount.data?.data,
      aggregateApprovedLoanAmount.isFetching,

      averageTimeToApproval.data?.data,
      averageTimeToApproval.isFetching,

      loanApplicationActivities.data?.data,
      loanApplicationActivities.isFetching,

      averageTimeToDecision.data?.data,
      averageTimeToDecision.isFetching,

      averageApprovedLoanAmount.data?.data,
      averageApprovedLoanAmount.isFetching
    ]
  )

  return (
    <DashboardContext.Provider {...props} value={value}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => {
  const context = useContext(DashboardContext)

  if (context === undefined)
    throw new Error("useDashboard must be used within a ThemeProvider")

  return context
}
