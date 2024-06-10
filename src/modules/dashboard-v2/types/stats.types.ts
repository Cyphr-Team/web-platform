import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { TimeRange, TimeRangeFilterValue } from "@/types/time-range.type"
import { Usage } from "@/types/usage.type"
import { Dispatch } from "react"

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

type DashboardState = {
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

type StatsResponse = {
  totalApplicationApproved: number
  totalApplicationSubmitted: number
  totalApplicationInReview: number
  totalApplicationDenied: number
}

type DashboardProviderProps = {
  children: React.ReactNode
}

type DashboardProviderState = {
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
}

type StatsFilter = {
  timeRange: TimeRange
}

type AverageTimeToApprovalResponse = {
  averageTimeToApproval: number
  percentRate: number
}
type LoanApplicationActivitiesResponse = {
  loanApplicationActivities: LoanApplicationActivities[]
}
type AverageApprovalLoanAmountResponse = {
  averageApprovedLoanAmount: AverageApprovalLoanAmount[]
}
type AverageTimeToDecisionResponse = {
  averageTimeToDecision: LoanApplicationStatisticAverageTimeToDecision[]
}
type AggregateApprovalLoanAmountResponse = {
  totalApprovedLoanAmount: number
  percentRate: number
  averageApprovedLoanSize: number
  averageApprovedLoanSizePercentRate: number
}
type AverageApprovalRateResponse = {
  averageApprovalRate: number
  percentRate: number
}
type AverageApprovedLoanSizeResponse = {
  averageApprovedLoanSize: AverageApprovedLoanSizeStats[]
}
type LoanApplicationRatesResponse = {
  incompleteApplicationRate: LoanApplicationRate[]
}

type RateRequest = {
  filter: StatsFilter
  loanProgramIds?: string[]
}

type FrequencyRequest = {
  filter: StatsFilter
  loanProgramIds?: string[]
  frequency: string
}

type LoanApplicationRate = {
  date: string
  rate: number
}
type AverageApprovedLoanSizeStats = {
  date: string
  value: Map<string, number>
}

type LoanApplicationActivities = {
  date: string
  totalApplicationApproved: number
  totalApplicationSubmitted: number
  totalApplicationInReview: number
  totalApplicationDraft: number
  totalApplicationDenied: number
  totalApplicationClosed: number
}

type AverageApprovalLoanAmount = {
  date: string
  averageApprovedLoanAmount: number
}

/**
 * Date form yyyy-MM-dd
 */
type LoanApplicationStatisticAverageTimeToDecision = {
  data: Record<DecisionType, number>
  date: string
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
  Usage
}
