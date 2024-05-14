import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { isEnableDashboardV2 } from "@/utils/feature-flag.utils"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import {
  AverageApprovalLoanAmountResponse,
  DashboardState,
  RateRequest
} from "../../types/stats.types"
import { useTimeRangeFilter } from "./useTimeRangeFilter"

export const useQueryGetAverageApprovedLoanAmount = ({
  filter,
  loanProgramIds,
  averageApprovedLoanAmountFrequency
}: DashboardState) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<AverageApprovalLoanAmountResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.AVERAGE_APPROVED_LOAN_AMOUNT,
      filter.timeRange.from,
      filter.timeRange.to,
      loanProgramIds,
      averageApprovedLoanAmountFrequency
    ],
    queryFn: async () => {
      if (!timeRangeFilter.from || !timeRangeFilter.to)
        throw new Error("Invalid 'from', 'to' date")

      return postRequest<
        RateRequest & { frequency: string },
        AverageApprovalLoanAmountResponse
      >({
        path: API_PATH.dashboardV1.getAverageApprovedLoanAmount(),
        data: {
          filter: {
            timeRange: { from: timeRangeFilter.from, to: timeRangeFilter.to }
          },
          frequency: averageApprovedLoanAmountFrequency.toLowerCase(),
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
