import {
  type DashboardAction,
  DashboardActionType,
  type DashboardState
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
    case DashboardActionType.UpdateAverageApprovedLoanAmount: {
      return {
        ...state,
        averageApprovedLoanAmountFrequency: action.payload
      }
    }
    case DashboardActionType.UpdateLoanProgramIds: {
      return {
        ...state,
        loanProgramIds: action.payload
      }
    }
    case DashboardActionType.UpdateLoanApplicationActivitiesFrequency: {
      return {
        ...state,
        loanApplicationActivitiesFrequency: action.payload
      }
    }
    case DashboardActionType.UpdateAverageTimeToDecisionFrequency: {
      return {
        ...state,
        averageTimeToDecisionFrequency: action.payload
      }
    }
    case DashboardActionType.UpdateLoanApplicationRatesFrequency: {
      return {
        ...state,
        loanApplicationRatesFrequency: action.payload
      }
    }
    default:
      return state
  }
}
