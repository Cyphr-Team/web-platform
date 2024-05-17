import { aggregateApprovedLoanAmountDummyData } from "@/constants/data/dashboard/aggregateApprovedLoanAmount"
import { averageApprovalRateDummyData } from "@/constants/data/dashboard/averageApprovalRate"
import { averageApprovedLoanAmountDummyData } from "@/constants/data/dashboard/averageApprovedLoanAmount"
import { averageApprovedLoanSizeDummyData } from "@/constants/data/dashboard/averageApprovedLoanSize"
import { averageTimeToApprovalDummyData } from "@/constants/data/dashboard/averageTimeToApproval"
import { averageTimeToDecisionDummyData } from "@/constants/data/dashboard/averageTimeToDecision"
import { incompleteRateDummyData } from "@/constants/data/dashboard/incompleteRate"
import { institutionActivityDummyData } from "@/constants/data/dashboard/institutionActivity"
import { loanApplicationActivitiesDummyData } from "@/constants/data/dashboard/loanApplicationActivities"
import { isEnableLenderDashboardV2DummyData } from "@/utils/feature-flag.utils"
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
  DashboardProviderProps,
  DashboardProviderState
} from "../types/stats.types"
import { dashboardReducer } from "./dashboard-reducer"
import { usageDummyData } from "@/constants/data/dashboard/usage"

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

  const value = useMemo(
    () => ({
      dashboardState,
      dashboardDispatch,
      statsData: isEnableLenderDashboardV2DummyData()
        ? institutionActivityDummyData
        : statsResponse.data?.data,
      isLoading: statsResponse.isFetching,

      averageApprovedLoanSizeData: isEnableLenderDashboardV2DummyData()
        ? averageApprovedLoanSizeDummyData
        : averageApprovedLoanSize.data?.data,
      isLoadingAverageApprovedLoanSize: averageApprovedLoanSize.isFetching,

      usageData: isEnableLenderDashboardV2DummyData()
        ? usageDummyData
        : usageResponse.data,
      isLoadingUsage: usageResponse.isFetching,

      averageApprovalRateData: isEnableLenderDashboardV2DummyData()
        ? averageApprovalRateDummyData
        : averageApprovalRate.data?.data,
      isLoadingAverageApprovalRate: averageApprovalRate.isFetching,

      aggregateApprovedLoanAmountData: isEnableLenderDashboardV2DummyData()
        ? aggregateApprovedLoanAmountDummyData
        : aggregateApprovedLoanAmount.data?.data,
      isLoadingAggregateApprovedLoanAmount:
        aggregateApprovedLoanAmount.isFetching,

      averageTimeToApprovalData: isEnableLenderDashboardV2DummyData()
        ? averageTimeToApprovalDummyData
        : averageTimeToApproval.data?.data,
      isLoadingAverageTimeToApproval: averageTimeToApproval.isFetching,

      loanApplicationActivitiesData: isEnableLenderDashboardV2DummyData()
        ? loanApplicationActivitiesDummyData
        : loanApplicationActivities.data?.data,
      isLoadingLoanApplicationActivities: loanApplicationActivities.isFetching,

      averageTimeToDecisionData: isEnableLenderDashboardV2DummyData()
        ? averageTimeToDecisionDummyData
        : averageTimeToDecision.data?.data,
      isLoadingAverageTimeToDecision: averageTimeToDecision.isFetching,

      averageApprovedLoanAmountData: isEnableLenderDashboardV2DummyData()
        ? averageApprovedLoanAmountDummyData
        : averageApprovedLoanAmount.data?.data,
      isLoadingAverageApprovedLoanAmount: averageApprovedLoanAmount.isFetching,

      loanApplicationRatesData: isEnableLenderDashboardV2DummyData()
        ? incompleteRateDummyData
        : loanApplicationRates.data?.data,
      isLoadingLoanApplicationRates: loanApplicationRates.isLoading
    }),
    [
      dashboardState,

      averageApprovedLoanSize.data?.data,
      averageApprovedLoanSize.isFetching,

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
      averageApprovedLoanAmount.isFetching,

      loanApplicationRates.data?.data,
      loanApplicationRates.isLoading
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
