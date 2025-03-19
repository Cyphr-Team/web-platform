import { type GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import {
  type TimeRange,
  type TimeRangeFilterValue
} from "@/types/time-range.type"
import { type Usage } from "@/types/usage.type"
import { type Dispatch } from "react"

enum DecisionType {
  DECISION = "decision",
  APPROVAL = "approval",
  DENIAL = "denial"
}

enum DashboardActionType {
  UpdateTimeRange = "UpdateTimeRange",
  UpdateApprovalRateFrequency = "UpdateApprovalRateFrequency",
  UpdateLoanApplicationRatesFrequency = "UpdateLoanApplicationRatesFrequency",
  UpdateAverageTimeToApprovalMetricsFrequency = "UpdateAverageTimeToApprovalMetricsFrequency",
  UpdateAverageLoanSizeFrequency = "UpdateAverageLoanSizeFrequency",
  UpdateLoanProgramIds = "UpdateLoanProgramIds",
  UpdateLoanApplicationActivitiesFrequency = "UpdateLoanApplicationActivitiesFrequency",
  UpdateAverageTimeToDecisionFrequency = "UpdateAverageTimeToDecisionFrequency",
  UpdateAverageApprovedLoanAmount = "UpdateAverageApprovedLoanAmount"
}

export { DashboardActionType }

type DashboardAction =
  | {
      type: DashboardActionType.UpdateTimeRange
      payload: DashboardState["filter"]["timeRange"]
    }
  | {
      type: DashboardActionType.UpdateAverageTimeToApprovalMetricsFrequency
      payload: DashboardState["averageTimeToApprovalMetricsFrequency"]
    }
  | {
      type: DashboardActionType.UpdateAverageLoanSizeFrequency
      payload: DashboardState["averageLoanSizeFrequency"]
    }
  | {
      type: DashboardActionType.UpdateLoanProgramIds
      payload: DashboardState["loanProgramIds"]
    }
  | {
      type: DashboardActionType.UpdateLoanApplicationActivitiesFrequency
      payload: DashboardState["loanApplicationActivitiesFrequency"]
    }
  | {
      type: DashboardActionType.UpdateAverageTimeToDecisionFrequency
      payload: DashboardState["averageTimeToDecisionFrequency"]
    }
  | {
      type: DashboardActionType.UpdateAverageApprovedLoanAmount
      payload: DashboardState["averageApprovedLoanAmountFrequency"]
    }
  | {
      type: DashboardActionType.UpdateLoanApplicationRatesFrequency
      payload: DashboardState["loanApplicationRatesFrequency"]
    }

interface DashboardState {
  filter: TimeRangeFilterValue
  approvalRateFrequency: GRAPH_FREQUENCY
  incompleteApplicationRateFrequency: GRAPH_FREQUENCY
  averageTimeToApprovalMetricsFrequency: GRAPH_FREQUENCY
  averageLoanSizeFrequency: GRAPH_FREQUENCY
  portfolioGrowthFrequency: GRAPH_FREQUENCY
  loanApplicationActivitiesFrequency: GRAPH_FREQUENCY
  averageTimeToDecisionFrequency: GRAPH_FREQUENCY
  averageApprovedLoanAmountFrequency: GRAPH_FREQUENCY
  loanApplicationRatesFrequency: GRAPH_FREQUENCY
  loanProgramIds: string[]
}

interface StatsResponse {
  totalApplicationApproved: number
  totalApplicationSubmitted: number
  totalApplicationInReview: number
  totalApplicationDenied: number
}

interface DashboardProviderProps {
  children: React.ReactNode
}

interface DashboardProviderState {
  dashboardState: DashboardState
  dashboardDispatch: Dispatch<DashboardAction>
  statsData?: StatsResponse
  isLoading?: boolean

  averageApprovedLoanSizeData?: AverageApprovedLoanSizeResponse
  isLoadingAverageApprovedLoanSize?: boolean

  usageError?: Error | null
  usageData?: Usage
  isLoadingUsage?: boolean

  averageApprovalRateData?: AverageApprovalRateResponse
  isLoadingAverageApprovalRate?: boolean

  aggregateApprovedLoanAmountData?: AggregateApprovalLoanAmountResponse
  isLoadingAggregateApprovedLoanAmount?: boolean

  averageTimeToApprovalData?: AverageTimeToApprovalResponse
  isLoadingAverageTimeToApproval?: boolean

  loanApplicationActivitiesData?: LoanApplicationActivitiesResponse
  isLoadingLoanApplicationActivities?: boolean

  averageTimeToDecisionData?: AverageTimeToDecisionResponse
  isLoadingAverageTimeToDecision?: boolean

  averageApprovedLoanAmountData?: AverageApprovalLoanAmountResponse
  isLoadingAverageApprovedLoanAMount?: boolean

  loanApplicationRatesData?: LoanApplicationRatesResponse
  isLoadingLoanApplicationRates?: boolean

  // Right now, only available for CC
  // TODO: Remove these and combine to the current logic
  ccStatsData?: CCStatsResponse
  isLoadingCCStatsData?: boolean
  ccloanApplicationActivitiesData?: CCLoanApplicationActivitiesResponse
}

interface StatsFilter {
  timeRange: TimeRange
}

interface AverageTimeToApprovalResponse {
  averageTimeToApproval: number
  percentRate: number
}
interface LoanApplicationActivitiesResponse {
  loanApplicationActivities: LoanApplicationActivities[]
}
interface CCLoanApplicationActivities extends LoanApplicationActivities {
  totalApplicationFunded: number
  totalApplicationDeclined: number
}
interface CCLoanApplicationActivitiesResponse {
  result: CCLoanApplicationActivities[]
}
interface AverageApprovalLoanAmountResponse {
  averageApprovedLoanAmount: AverageApprovalLoanAmount[]
}
interface AverageTimeToDecisionResponse {
  averageTimeToDecision: LoanApplicationStatisticAverageTimeToDecision[]
}
interface AggregateApprovalLoanAmountResponse {
  totalApprovedLoanAmount: number
  percentRate: number
  averageApprovedLoanSize: number
  averageApprovedLoanSizePercentRate: number
}
interface AverageApprovalRateResponse {
  averageApprovalRate: number
  percentRate: number
}
interface AverageApprovedLoanSizeResponse {
  averageApprovedLoanSize: AverageApprovedLoanSizeStats[]
}
interface LoanApplicationRatesResponse {
  incompleteApplicationRate: LoanApplicationRate[]
}

interface RateRequest {
  filter: StatsFilter
  loanProgramIds?: string[]
}

interface FrequencyRequest {
  filter: StatsFilter
  loanProgramIds?: string[]
  frequency: string
}

interface LoanApplicationRate {
  date: string
  rate: number
}
interface AverageApprovedLoanSizeStats {
  date: string
  value: Map<string, number>
}

interface LoanApplicationActivities {
  date: string
  totalApplicationApproved: number
  totalApplicationSubmitted: number
  totalApplicationInReview: number
  totalApplicationDraft: number
  totalApplicationDenied: number
  totalApplicationClosed: number
}

interface AverageApprovalLoanAmount {
  date: string
  averageApprovedLoanAmount: number
}

/**
 * Date form yyyy-MM-dd
 */
interface LoanApplicationStatisticAverageTimeToDecision {
  data: Record<DecisionType, number>
  date: string
}

interface CCInstitutionActivity {
  request: {
    timeRangeFilter: TimeRange
  }
}

interface CCStatsResponse {
  totalDraft: number
  totalSubmitted: number
  totalReadyForReview: number
  totalApplicationInReview: number
  totalApplicationMissingInfo: number
  totalReadyForUnderwriting: number
  totalUnderwriting: number
  totalApproved: number
  totalDeclined: number
  totalAgreementRequested: number
  totalAgreementSent: number
  totalAgreementSigned: number
  totalFunded: number
}

export type {
  LoanApplicationRatesResponse,
  AggregateApprovalLoanAmountResponse,
  AverageApprovalLoanAmountResponse,
  AverageApprovalRateResponse,
  AverageApprovedLoanSizeResponse,
  AverageTimeToApprovalResponse,
  AverageTimeToDecisionResponse,
  DashboardAction,
  DashboardProviderProps,
  DashboardProviderState,
  DashboardState,
  FrequencyRequest,
  LoanApplicationActivitiesResponse,
  RateRequest,
  StatsResponse,
  Usage,
  CCInstitutionActivity,
  CCStatsResponse,
  CCLoanApplicationActivitiesResponse
}
