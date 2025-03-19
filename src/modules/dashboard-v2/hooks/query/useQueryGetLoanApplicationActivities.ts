import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import {
  type DashboardState,
  type FrequencyRequest,
  type LoanApplicationActivitiesResponse
} from "../../types/stats.types"
import { useTimeRangeFilter } from "./useTimeRangeFilter"

export const useQueryGetLoanApplicationActivities = ({
  filter,
  loanProgramIds,
  loanApplicationActivitiesFrequency
}: DashboardState) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<LoanApplicationActivitiesResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.DASHBOARD_V2,
      QUERY_KEY.LOAN_APPLICATION_ACTIVITIES,
      filter.timeRange.from,
      filter.timeRange.to,
      loanProgramIds,
      loanApplicationActivitiesFrequency
    ],
    queryFn: () => {
      if (!timeRangeFilter.from || !timeRangeFilter.to)
        throw new Error("Invalid 'from', 'to' date")

      return postRequest<FrequencyRequest, LoanApplicationActivitiesResponse>({
        path: API_PATH.dashboardV1.getLoanApplicationActivities(),
        data: {
          filter: {
            timeRange: { from: timeRangeFilter.from, to: timeRangeFilter.to }
          },
          frequency: loanApplicationActivitiesFrequency.toLowerCase(),
          loanProgramIds: loanProgramIds.length ? loanProgramIds : undefined
        }
      })
    },
    enabled: !!(filter.timeRange.from && filter.timeRange.to),
    placeholderData: keepPreviousData
  })
}
