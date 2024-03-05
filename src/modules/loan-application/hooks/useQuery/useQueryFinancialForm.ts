import { ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { FinancialInformationResponse } from "../../constants/type"

export const useQueryGetFinancialForm = (loanApplicationId: string) => {
  return useQuery<FinancialInformationResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_FINANCIAL_FORM, loanApplicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.financialForm,
        params: { applicationId: loanApplicationId }
      })
    },
    enabled: !!loanApplicationId
  })
}
