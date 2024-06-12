import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { isEnableDashboardV2 } from "@/utils/feature-flag.utils"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import {
  DashboardState,
  LoanApplicationRatesResponse,
  RateRequest
} from "../../types/stats.types"
import { useTimeRangeFilter } from "./useTimeRangeFilter"

export const useQueryGetLoanApplicationRates = ({
  filter,
  loanProgramIds,
  loanApplicationRatesFrequency
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
      loanApplicationRatesFrequency
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
          frequency: loanApplicationRatesFrequency.toLowerCase(),
          loanProgramIds: loanProgramIds.length ? loanProgramIds : undefined
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
