import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "@/modules/dashboard-v2/constants/dashboard.constants"
import {
  type DashboardState,
  type CCLoanApplicationActivitiesResponse
} from "@/modules/dashboard-v2/types/stats.types"
import { useTimeRangeFilter } from "../useTimeRangeFilter"
import { Institution } from "@/constants/tenant.constants"

export const useQueryGetCCLoanApplicationActivities = (
  props: DashboardState & {
    enabled?: boolean
  }
) => {
  const { filter, enabled } = props
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<CCLoanApplicationActivitiesResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.DASHBOARD_V2,
      QUERY_KEY.LOAN_APPLICATION_ACTIVITIES,
      filter,
      Institution.CapitalCollab
    ],
    queryFn: () => {
      if (!timeRangeFilter.from || !timeRangeFilter.to)
        throw new Error("Invalid 'from', 'to' date")

      return postRequest({
        path: API_PATH.dashboardV1.getCCLoanApplicationActivities,
        data: {
          request: {
            timeRangeFilter: {
              from: timeRangeFilter.from,
              to: timeRangeFilter.to
            }
          }
        }
      })
    },
    enabled: !!(filter.timeRange.from && filter.timeRange.to) && enabled,
    placeholderData: keepPreviousData
  })
}
