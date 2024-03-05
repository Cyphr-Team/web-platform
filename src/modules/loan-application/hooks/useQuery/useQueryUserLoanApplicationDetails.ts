import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { ErrorResponse } from "@/types/common.type"
import { UserLoanApplication } from "@/types/loan-application.type"

export const useQueryGetUserLoanApplicationDetails = (id: string) => {
  return useQuery<UserLoanApplication, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_USER_LOAN_APPLICATION_DETAILS, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.details,
        params: {
          id
        }
      })
    },
    enabled: !!id
  })
}
