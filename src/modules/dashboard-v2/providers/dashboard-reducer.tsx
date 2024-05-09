import {
  DashboardAction,
  DashboardActionType,
  DashboardState
} from "../types/stats.types"

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction
): DashboardState {
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
    case DashboardActionType.UpdateLoanProgramIds: {
      return {
        ...state,
        loanProgramIds: action.payload
      }
    }
    default:
      return state
  }
}
