import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import { ApprovalRateResponse, DashboardState } from "../../types/stats.types"
import { useTimeRangeFilter } from "./useTimeRangeFilter"

export const useQueryGetAverageTimeToApprovalMetrics = ({
  filter,
  averageTimeToApprovalMetricsFrequency
}: DashboardState) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<ApprovalRateResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.AVERAGE_TIME_TO_APPROVAL_METRICS,
      filter,
      averageTimeToApprovalMetricsFrequency
    ],
    queryFn: () => {
      return postRequest({
        path: API_PATH.dashboard.getAverageTimeToApprovalMetrics(),
        data: {
          filter: { timeRange: timeRangeFilter },
          frequency: averageTimeToApprovalMetricsFrequency.toLowerCase()
        }
      })
    },
    enabled: !!(filter.timeRange.from && filter.timeRange.to),
    placeholderData: keepPreviousData
  })
}
