import { TimeRangeFilterValue } from "@/types/time-range.type"
import { Dispatch } from "react"

enum DashboardActionType {
  UpdateTimeRange = "UpdateTimeRange"
}

export { DashboardActionType }

type DashboardAction = {
  type: DashboardActionType.UpdateTimeRange
  payload: DashboardState["filter"]["timeRange"]
}

type DashboardState = {
  filter: TimeRangeFilterValue
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
}

export type {
  DashboardAction,
  DashboardProviderProps,
  DashboardProviderState,
  DashboardState,
  Stats
}
