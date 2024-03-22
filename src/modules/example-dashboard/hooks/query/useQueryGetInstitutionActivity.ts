import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "react-router-dom"
import { QUERY_KEY } from "../../constants/dashboard.constants"
import { DashboardState, Stats } from "../../types/stats.types"
import { requestDate } from "@/utils/date.utils"

export const useQueryGetInstitutionActivity = ({ filter }: DashboardState) => {
  return useQuery<AxiosResponse<Stats>, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.INSTITUTION_ACTIVITY, filter],
    queryFn: () => {
      return postRequest({
        path: API_PATH.dashboard.getInstitutionActivity(),
        data: {
          filter: {
            timeRange: {
              from: requestDate(filter.timeRange.from),
              to: requestDate(filter.timeRange.to)
            }
          }
        }
      })
    },
    enabled: !!(filter.timeRange.from && filter.timeRange.to),
    placeholderData: keepPreviousData
  })
}
