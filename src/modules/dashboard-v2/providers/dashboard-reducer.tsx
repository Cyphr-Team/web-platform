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
