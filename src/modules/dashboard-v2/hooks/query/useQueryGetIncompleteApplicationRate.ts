import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import {
  DashboardState,
  IncompleteApplicationRateResponse
} from "../../types/stats.types"
import { useTimeRangeFilter } from "./useTimeRangeFilter"

export const useQueryGetIncompleteApplicationRate = ({
  filter,
  incompleteApplicationRateFrequency
}: DashboardState) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<IncompleteApplicationRateResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.INCOMPLETE_APPLICATION_RATE,
      filter,
      incompleteApplicationRateFrequency
    ],
    queryFn: () => {
      return postRequest({
        path: API_PATH.dashboard.getIncompleteApplicationRate(),
        data: {
          filter: { timeRange: timeRangeFilter },
          frequency: incompleteApplicationRateFrequency.toLowerCase()
        }
      })
    },
    enabled: !!(filter.timeRange.from && filter.timeRange.to),
    placeholderData: keepPreviousData
  })
}
