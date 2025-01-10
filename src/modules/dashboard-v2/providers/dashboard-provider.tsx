import { createContext, useContext, useMemo, useReducer } from "react"
import { DEFAULT_DASHBOARD_STATE } from "../constants/dashboard.constants"
import { useQueryGetAggregateApprovedLoanAmount } from "../hooks/query/useQueryGetAggregateApprovedLoanAmount"
import { useQueryGetAverageApprovalRate } from "../hooks/query/useQueryGetAverageApprovalRate"
import { useQueryGetAverageApprovedLoanAmount } from "../hooks/query/useQueryGetAverageApprovedLoanAmount"
import { useQueryGetAverageApprovedLoanSize } from "../hooks/query/useQueryGetAverageLoanSize"
import { useQueryGetAverageTimeToApproval } from "../hooks/query/useQueryGetAverageTimeToApproval"
import { useQueryGetAverageTimeToDecision } from "../hooks/query/useQueryGetAverageTimeToDecision"
import { useQueryGetInstitutionActivity } from "../hooks/query/useQueryGetInstitutionActivity"
import { useQueryGetInstitutionUsage } from "../hooks/query/useQueryGetInstitutionUsage"
import { useQueryGetLoanApplicationActivities } from "../hooks/query/useQueryGetLoanApplicationActivities"
import { useQueryGetLoanApplicationRates } from "../hooks/query/useQueryGetLoanApplicationRates"
import {
  type DashboardProviderProps,
  type DashboardProviderState
} from "../types/stats.types"
import { dashboardReducer } from "./dashboard-reducer"
import { useQueryGetCCDashboard } from "../hooks/query/capital-collab/useQueryGetCCDashboard"
import { isCapitalCollab } from "@/utils/domain.utils"
import { useQueryGetCCLoanApplicationActivities } from "../hooks/query/capital-collab/useQueryGetCCLoanApplicationActivities"

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
  const averageApprovedLoanSize =
    useQueryGetAverageApprovedLoanSize(dashboardState)
  const loanApplicationRates = useQueryGetLoanApplicationRates(dashboardState)

  // Capital Collab only
  const ccStatsResponse = useQueryGetCCDashboard({
    ...dashboardState,
    enabled: isCapitalCollab()
  })
  const ccloanApplicationActivities = useQueryGetCCLoanApplicationActivities({
    ...dashboardState,
    enabled: isCapitalCollab()
  })

  const value = useMemo(
    () => ({
      dashboardState,
      dashboardDispatch,
      statsData: statsResponse.data?.data,
      isLoading: statsResponse.isFetching,

      averageApprovedLoanSizeData: averageApprovedLoanSize.data?.data,
      isLoadingAverageApprovedLoanSize: averageApprovedLoanSize.isFetching,

      usageData: usageResponse.data,
      isLoadingUsage: usageResponse.isFetching,
      usageError: usageResponse.error,

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
      isLoadingAverageApprovedLoanAmount: averageApprovedLoanAmount.isFetching,

      loanApplicationRatesData: loanApplicationRates.data?.data,
      isLoadingLoanApplicationRates: loanApplicationRates.isLoading,

      ccStatsData: ccStatsResponse.data?.data,
      isLoadingCCStatsData: ccStatsResponse.isFetching,
      ccloanApplicationActivitiesData: ccloanApplicationActivities.data?.data
    }),
    [
      dashboardState,

      averageApprovedLoanSize.data?.data,
      averageApprovedLoanSize.isFetching,

      statsResponse.data?.data,
      statsResponse.isFetching,

      usageResponse.error,
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
      averageApprovedLoanAmount.isFetching,

      loanApplicationRates.data?.data,
      loanApplicationRates.isLoading,

      ccStatsResponse.data?.data,
      ccStatsResponse.isFetching,
      ccloanApplicationActivities.data?.data
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
