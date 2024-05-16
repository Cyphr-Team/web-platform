import { ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { OperatingExpensesInformationResponse } from "../../constants/type"

export const useQueryGetOperatingExpensesForm = (loanApplicationId: string) => {
  return useQuery<
    OperatingExpensesInformationResponse,
    AxiosError<ErrorResponse>
  >({
    queryKey: [QUERY_KEY.GET_OPERATING_EXPENSES_FORM, loanApplicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.operatingExpensesForm,
        params: { applicationId: loanApplicationId }
      })
    },
    enabled: !!loanApplicationId
  })
}
