import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { type ListLoanProgramResponse } from "@/types/loan-application.type"

export const useQueryGetLoanProgramList = () => {
  return useQuery<ListLoanProgramResponse, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_LOAN_PROGRAM_LIST],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanProgram.loanOfficer.list
      })
    }
  })
}
