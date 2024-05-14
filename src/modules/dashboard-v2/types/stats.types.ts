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
  UpdateIncompleteApplicationRateFrequency = "UpdateIncompleteApplicationRateFrequency",
  UpdateAverageTimeToApprovalMetricsFrequency = "UpdateAverageTimeToApprovalMetricsFrequency",
  UpdateAverageLoanSizeFrequency = "UpdateAverageLoanSizeFrequency",
  UpdatePortfolioGrowthFrequency = "UpdatePortfolioGrowthFrequency",
  UpdateLoanProgramIds = "UpdateLoanProgramIds",
  UpdateLoanApplicationActivitiesFrequency = "UpdateLoanApplicationActivitiesFrequency",
  UpdateAverageTimeToDecisionFrequency = "UpdateAverageTimeToDecisionFrequency"
}

export { DashboardActionType }

type DashboardAction =
  | {
      type: DashboardActionType.UpdateTimeRange
      payload: DashboardState["filter"]["timeRange"]
    }
  | {
      type: DashboardActionType.UpdateApprovalRateFrequency
      payload: DashboardState["approvalRateFrequency"]
    }
  | {
      type: DashboardActionType.UpdateIncompleteApplicationRateFrequency
      payload: DashboardState["incompleteApplicationRateFrequency"]
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
      type: DashboardActionType.UpdatePortfolioGrowthFrequency
      payload: DashboardState["portfolioGrowthFrequency"]
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

type DashboardState = {
  filter: TimeRangeFilterValue
  approvalRateFrequency: GRAPH_FREQUENCY
  incompleteApplicationRateFrequency: GRAPH_FREQUENCY
  averageTimeToApprovalMetricsFrequency: GRAPH_FREQUENCY
  averageLoanSizeFrequency: GRAPH_FREQUENCY
  portfolioGrowthFrequency: GRAPH_FREQUENCY
  loanApplicationActivitiesFrequency: GRAPH_FREQUENCY
  averageTimeToDecisionFrequency: GRAPH_FREQUENCY
  loanProgramIds: string[]
}

type Stats = {
  totalApplication: number
  applicationUsageLimit: number
  totalApplicationApproved: number
  totalLoanAmount: number
  totalApplicationSubmitted: number
  totalApplicationInReview: number
  totalApplicationDraft: number
  totalApplicationUnderwritten: number
}

type DashboardProviderProps = {
  children: React.ReactNode
}

type DashboardProviderState = {
  dashboardState: DashboardState
  dashboardDispatch: Dispatch<DashboardAction>
  statsData?: Stats
  isLoading?: boolean
  approvalRateData?: ApprovalRateResponse
  isLoadingApprovalRate?: boolean

  incompleteApplicationRateData?: IncompleteApplicationRateResponse
  isLoadingIncompleteApplicationRate?: boolean

  averageTimeToApprovalMetricsData?: AverageTimeToApprovalMetricsResponse
  isLoadingAverageTimeToApprovalMetrics?: boolean

  averageApprovedLoanSizeData?: AverageApprovedLoanSizeResponse
  isLoadingAverageApprovedLoanSize?: boolean

  portfolioGrowthData?: PortfolioGrowthResponse
  isLoadingPortfolioGrowth?: boolean

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
}

type LoanApprovalRateStats = {
  date: string
  rate: number
  /** @deprecated unused data */
  noApplicationsSubmitted: number
  /** @deprecated unused data */
  noApplicationsApproved: number
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

type RateRequest = {
  filter: StatsFilter
  loanProgramIds?: string[]
}

type FrequencyRequest = {
  filter: StatsFilter
  loanProgramIds?: string[]
  frequency: string
}

type ApprovalRateResponse = {
  loanApprovalRate: LoanApprovalRateStats[]
}

type IncompleteApplicationRateStats = {
  date: string
  rate: number
}

type IncompleteApplicationRateResponse = {
  incompleteApplicationRate: IncompleteApplicationRateStats[]
}

type AverageTimeToApprovalStats = {
  date: string
  averageTimeToApproval: number
}

type AverageTimeToApprovalMetricsResponse = {
  averageTimeToApproval: AverageTimeToApprovalStats[]
}

type AverageApprovedLoanSizeStats = {
  date: string
  value: Map<string, number>
}

type AverageApprovedLoanSizeResponse = {
  averageApprovedLoanSize: AverageApprovedLoanSizeStats[]
}

type PortfolioGrowthResponse = {
  growthSize: PortfolioGrowthStats[]
}

type PortfolioGrowthStats = {
  date: string
  loanSize: number
}

type LoanApplicationActivities = {
  date: string
  totalApplicationApproved: number
  totalApplicationSubmitted: number
  totalApplicationInReview: number
  totalApplicationDraft: number
  totalApplicationDenied: number
  totalApplicationClose: number
}

/**
 * Date form yyyy-MM-dd
 */
type LoanApplicationStatisticAverageTimeToDecision = {
  data: Record<DecisionType, number>
  date: string
}
export type {
  AverageTimeToApprovalResponse,
  FrequencyRequest,
  LoanApplicationActivitiesResponse,
  AverageTimeToDecisionResponse,
  AggregateApprovalLoanAmountResponse,
  ApprovalRateResponse,
  RateRequest,
  AverageApprovalRateResponse,
  AverageApprovedLoanSizeResponse,
  AverageTimeToApprovalMetricsResponse,
  DashboardAction,
  DashboardProviderProps,
  DashboardProviderState,
  DashboardState,
  IncompleteApplicationRateResponse,
  PortfolioGrowthResponse,
  Stats,
  Usage
}
