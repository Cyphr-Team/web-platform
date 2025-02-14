import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "@/modules/dashboard-v2/constants/dashboard.constants"
import {
  type CCInstitutionActivity,
  type DashboardState,
  type CCStatsResponse
} from "@/modules/dashboard-v2/types/stats.types"
import { useTimeRangeFilter } from "../../useTimeRangeFilter"
import { Institution } from "@/constants/tenant.constants"

export const useQueryGetCCDashboard = ({
  filter,
  loanProgramIds,
  enabled = true
}: DashboardState & {
  enabled?: boolean
}) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<AxiosResponse<CCStatsResponse>, AxiosError<ErrorResponse>>({
    queryKey: [
      QUERY_KEY.DASHBOARD_V2,
      QUERY_KEY.INSTITUTION_ACTIVITIES,
      filter.timeRange.from,
      filter.timeRange.to,
      loanProgramIds,
      Institution.CapitalCollab
    ],
    queryFn: async () => {
      if (!timeRangeFilter.from || !timeRangeFilter.to)
        throw new Error("Invalid 'from', 'to' date")

      return postRequest<CCInstitutionActivity, CCStatsResponse>({
        path: API_PATH.dashboardV1.getCCInstitutionActivity,
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
