import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import {
  type DashboardState,
  type LoanApplicationRatesResponse,
  type RateRequest
} from "../../types/stats.types"
import { useTimeRangeFilter } from "../useTimeRangeFilter"

export const useQueryGetLoanApplicationRates = ({
  filter,
  loanProgramIds,
  frequency
}: DashboardState) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<LoanApplicationRatesResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.DASHBOARD_V2,
      QUERY_KEY.LOAN_APPLICATION_RATES,
      filter.timeRange.from,
      filter.timeRange.to,
      loanProgramIds,
      frequency
    ],
    queryFn: async () => {
      if (!timeRangeFilter.from || !timeRangeFilter.to)
        throw new Error("Invalid 'from', 'to' date")

      return postRequest<
        RateRequest & { frequency: string },
        LoanApplicationRatesResponse
      >({
        path: API_PATH.dashboardV1.getLoanApplicationRates(),
        data: {
          filter: {
            timeRange: { from: timeRangeFilter.from, to: timeRangeFilter.to }
          },
          frequency: frequency.toLowerCase(),
          loanProgramIds: loanProgramIds.length ? loanProgramIds : undefined
        }
      })
    },
    enabled: !!(filter.timeRange.from && filter.timeRange.to),
    placeholderData: keepPreviousData
  })
}
