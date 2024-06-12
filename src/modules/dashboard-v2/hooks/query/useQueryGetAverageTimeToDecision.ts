import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { isEnableDashboardV2 } from "@/utils/feature-flag.utils"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import {
  AverageTimeToDecisionResponse,
  DashboardState,
  RateRequest
} from "../../types/stats.types"
import { useTimeRangeFilter } from "./useTimeRangeFilter"

export const useQueryGetAverageTimeToDecision = ({
  filter,
  loanProgramIds,
  averageTimeToDecisionFrequency
}: DashboardState) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<AverageTimeToDecisionResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.DASHBOARD_V2,
      QUERY_KEY.AVERAGE_TIME_TO_DECISION,
      filter.timeRange.from,
      filter.timeRange.to,
      loanProgramIds,
      averageTimeToDecisionFrequency
    ],
    queryFn: async () => {
      if (!timeRangeFilter.from || !timeRangeFilter.to)
        throw new Error("Invalid 'from', 'to' date")

      return postRequest<
        RateRequest & { frequency: string },
        AverageTimeToDecisionResponse
      >({
        path: API_PATH.dashboardV1.getAverageTimeToDecision(),
        data: {
          filter: {
            timeRange: { from: timeRangeFilter.from, to: timeRangeFilter.to }
          },
          loanProgramIds: loanProgramIds.length ? loanProgramIds : undefined,
          frequency: averageTimeToDecisionFrequency.toLowerCase()
        }
      })
    },
    enabled: !!(
      filter.timeRange.from &&
      filter.timeRange.to &&
      isEnableDashboardV2()
    ),
    placeholderData: keepPreviousData
  })
}
