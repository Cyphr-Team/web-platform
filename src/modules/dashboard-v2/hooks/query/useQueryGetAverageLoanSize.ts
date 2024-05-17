import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import {
  AverageApprovedLoanSizeResponse,
  DashboardState
} from "../../types/stats.types"
import { useTimeRangeFilter } from "./useTimeRangeFilter"
import { isEnableDashboardV2 } from "@/utils/feature-flag.utils"

export const useQueryGetAverageApprovedLoanSize = ({
  filter,
  averageLoanSizeFrequency,
  loanProgramIds
}: DashboardState) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<AverageApprovedLoanSizeResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [
      QUERY_KEY.AVERAGE_LOAN_SIZE,
      filter,
      averageLoanSizeFrequency,
      loanProgramIds
    ],
    queryFn: () => {
      return postRequest({
        path: API_PATH.dashboardV1.getAverageLoanSize(),
        data: {
          filter: { timeRange: timeRangeFilter },
          frequency: averageLoanSizeFrequency.toLowerCase(),
          loanProgramIds: loanProgramIds?.length ? loanProgramIds : undefined
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
