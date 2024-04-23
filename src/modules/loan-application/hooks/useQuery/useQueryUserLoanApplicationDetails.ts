import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { ErrorResponse } from "@/types/common.type"
import { UserLoanApplication } from "@/types/loan-application.type"
import { loanApplicationUserKeys } from "@/constants/query-key"

export const useQueryGetUserLoanApplicationDetails = (id: string) => {
  return useQuery<UserLoanApplication, AxiosError<ErrorResponse>>({
    queryKey: loanApplicationUserKeys.detail(id),
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
