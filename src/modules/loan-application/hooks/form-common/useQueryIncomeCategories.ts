import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"

export const useQueryGetIncomeCategories = (enabled: boolean) => {
  return useQuery<string[], ErrorResponse>({
    queryKey: [QUERY_KEY.GET_INCOME_CATEGORIES],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.getIncomeCategories
      })
    },
    enabled
  })
}
