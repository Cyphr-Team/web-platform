import { createContext, useContext, useMemo, useReducer } from "react"
import { DEFAULT_DASHBOARD_STATE } from "../constants/dashboard.constants"
import { useQueryGetInstitutionActivity } from "../hooks/query/useQueryGetInstitutionActivity"
import {
  DashboardAction,
  DashboardActionType,
  DashboardProviderProps,
  DashboardProviderState,
  DashboardState
} from "../types/stats.types"

const DashboardContext = createContext<DashboardProviderState>({
  dashboardState: DEFAULT_DASHBOARD_STATE,
  dashboardDispatch: () => null
})

function reducer(state: DashboardState, action: DashboardAction) {
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
  }
}

export function DashboardProvider({
  children,
  ...props
}: DashboardProviderProps) {
  const [dashboardState, dashboardDispatch] = useReducer(
    reducer,
    DEFAULT_DASHBOARD_STATE
  )

  const statsResponse = useQueryGetInstitutionActivity(dashboardState)

  const value = useMemo(
    () => ({
      dashboardState,
      dashboardDispatch,
      statsData: statsResponse.data?.data,
      isLoading: statsResponse.isFetching
    }),
    [dashboardState, statsResponse.data?.data, statsResponse.isFetching]
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
