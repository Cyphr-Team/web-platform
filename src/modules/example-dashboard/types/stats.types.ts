import { GRAPH_FREQUENCY } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { TimeRangeFilterValue } from "@/types/time-range.type"
import { Dispatch } from "react"

enum DashboardActionType {
  UpdateTimeRange = "UpdateTimeRange",
  UpdateApprovalRateFrequency = "UpdateApprovalRateFrequency"
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

type DashboardState = {
  filter: TimeRangeFilterValue
  approvalRateFrequency: GRAPH_FREQUENCY
  incompleteApplicationRateFrequency: GRAPH_FREQUENCY
  averageTimeToApprovalMetricsFrequency: GRAPH_FREQUENCY
  averageLoanSizeFrequency: GRAPH_FREQUENCY
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
}

type LoanApprovalRateStats = {
  date: string
  rate: number
  /** @deprecated unused data */
  noApplicationsSubmitted: number
  /** @deprecated unused data */
  noApplicationsApproved: number
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
  loanSize: number
}

type AverageApprovedLoanSizeResponse = {
  averageApprovedLoanSize: AverageApprovedLoanSizeStats[]
}

export type {
  AverageTimeToApprovalMetricsResponse,
  IncompleteApplicationRateResponse,
  ApprovalRateResponse,
  AverageApprovedLoanSizeResponse,
  DashboardAction,
  DashboardProviderProps,
  DashboardProviderState,
  DashboardState,
  Stats
}
