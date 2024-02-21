import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { LoanProgramType } from "../../constants/type"
import { AxiosError } from "axios"

export const useQueryGetLoanProgramDetails = (id: string) => {
  return useQuery<LoanProgramType, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_LOAN_PROGRAM_DETAILS, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanProgram.detail(id!)
      })
    },
    enabled: !!id
  })
}
