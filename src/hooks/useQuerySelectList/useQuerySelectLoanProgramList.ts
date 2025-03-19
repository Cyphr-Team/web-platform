import { API_PATH } from "@/constants"
import { loanProgramKeys } from "@/constants/query-key"
import { getRequest } from "@/services/client.service"
import { type ListResponse } from "@/types/common.type"
import { type LoanProgram } from "@/types/loan-program.type"
import { useQuery } from "@tanstack/react-query"
import { createSearchParams } from "react-router-dom"

interface PaginateParams {
  limit: number
  offset: number
}

export const useQuerySelectLoanProgramList = ({
  limit,
  offset
}: PaginateParams) => {
  return useQuery<ListResponse<LoanProgram>>({
    queryKey: loanProgramKeys.list(
      createSearchParams({
        limit: limit.toString(),
        offset: offset.toString()
      }).toString()
    ),
    queryFn: async () => {
      const response = await getRequest<
        PaginateParams,
        ListResponse<LoanProgram>
      >({
        path: API_PATH.loanProgram.adminSelectLoanProgramList,
        params: { limit, offset }
      })

      return response
    }
  })
}
