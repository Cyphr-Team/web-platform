import { ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { CurrentLoansInformationResponse } from "../../constants/type"

export const useQueryGetCurrentLoansForm = (loanApplicationId: string) => {
  return useQuery<CurrentLoansInformationResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_CURRENT_LOANS_FORM, loanApplicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.currentLoansForm,
        params: { applicationId: loanApplicationId }
      })
    },
    enabled: !!loanApplicationId
  })
}
