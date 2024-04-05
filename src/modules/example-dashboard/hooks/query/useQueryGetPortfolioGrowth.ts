import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import {
  PortfolioGrowthResponse,
  DashboardState
} from "../../types/stats.types"
import { useTimeRangeFilter } from "./useTimeRangeFilter"

export const useQueryGetPortfolioGrowth = ({
  filter,
  portfolioGrowthFrequency
}: DashboardState) => {
  const timeRangeFilter = useTimeRangeFilter(filter)

  return useQuery<
    AxiosResponse<PortfolioGrowthResponse>,
    AxiosError<ErrorResponse>
  >({
    queryKey: [QUERY_KEY.PORTFOLIO_GROWTH, filter, portfolioGrowthFrequency],
    queryFn: () => {
      return postRequest({
        path: API_PATH.dashboard.getPortfolioGrowth(),
        data: {
          filter: { timeRange: timeRangeFilter },
          frequency: portfolioGrowthFrequency.toLowerCase()
        }
      })
    },
    enabled: !!(filter.timeRange.from && filter.timeRange.to),
    placeholderData: keepPreviousData
  })
}
