import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service.ts"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse, type ListResponse } from "@/types/common.type.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { type AxiosError } from "axios"
import { type BaseLoanProgramType } from "@/types/loan-program.type.ts"

export const useQueryGetLoanPrograms = () => {
  return useQuery<ListResponse<BaseLoanProgramType>, AxiosError<ErrorResponse>>(
    {
      queryKey: [QUERY_KEY.GET_LOAN_PROGRAMS],
      queryFn: () => {
        return getRequest({
          path: API_PATH.loanProgram.list
        })
      }
    }
  )
}
