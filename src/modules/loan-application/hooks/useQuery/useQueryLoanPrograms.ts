import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse, ListResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { BaseLoanProgramType } from "../../constants/type"
import { AxiosError } from "axios"

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
