import { createContext, useContext, useMemo, useReducer } from "react"
import { DEFAULT_DASHBOARD_STATE } from "../constants/dashboard.constants"
import { useQueryGetApprovalRate } from "../hooks/query/useQueryGetApprovalRate"
import { useQueryGetAverageTimeToApprovalMetrics } from "../hooks/query/useQueryGetAverageTimeToApprovalMetrics"
import { useQueryGetIncompleteApplicationRate } from "../hooks/query/useQueryGetIncompleteApplicationRate"
import { useQueryGetInstitutionActivity } from "../hooks/query/useQueryGetInstitutionActivity"
import {
  DashboardAction,
  DashboardActionType,
  DashboardProviderProps,
  DashboardProviderState,
  DashboardState
} from "../types/stats.types"
import { useQueryGetAverageApprovedLoanSize } from "../hooks/query/useQueryGetAverageLoanSize"
import { useQueryGetPortfolioGrowth } from "../hooks/query/useQueryGetPortfolioGrowth"
import { useQueryGetInstitutionUsage } from "../hooks/query/useQueryGetInstitutionUsage"

const DashboardContext = createContext<DashboardProviderState>({
  dashboardState: DEFAULT_DASHBOARD_STATE,
  dashboardDispatch: () => null
})

function reducer(state: DashboardState, action: DashboardAction) {
  switch (action.type) {
    case DashboardActionType.UpdateTimeRange: {
      return {
        ...state,
        filter: {
          ...state.filter,
          timeRange: action.payload
        }
      }
    }
    case DashboardActionType.UpdateApprovalRateFrequency: {
      return {
        ...state,
        approvalRateFrequency: action.payload
      }
    }
    case DashboardActionType.UpdateIncompleteApplicationRateFrequency: {
      return {
        ...state,
        incompleteApplicationRateFrequency: action.payload
      }
    }
    case DashboardActionType.UpdateAverageTimeToApprovalMetricsFrequency: {
      return {
        ...state,
        averageTimeToApprovalMetricsFrequency: action.payload
      }
    }
    case DashboardActionType.UpdateAverageLoanSizeFrequency: {
      return {
        ...state,
        averageLoanSizeFrequency: action.payload
      }
    }
    case DashboardActionType.UpdatePortfolioGrowthFrequency: {
      return {
        ...state,
        portfolioGrowthFrequency: action.payload
      }
    }
    default:
      return state
  }
}

export function DashboardProvider({
  children,
  ...props
}: DashboardProviderProps) {
  const [dashboardState, dashboardDispatch] = useReducer(
    reducer,
    DEFAULT_DASHBOARD_STATE
  )

  const usageResponse = useQueryGetInstitutionUsage()

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
      isLoadingUsage: usageResponse.isFetching
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
      usageResponse.isFetching
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
