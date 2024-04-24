import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { AxiosError } from "axios"
import { LoanType, MicroLoanProgramType } from "@/types/loan-program.type"

export const useQueryLoanProgramDetailsByType = (type: string, id: string) => {
  const microLoanDetailsQuery = useQueryGetMicroLoanProgramDetails(id)

  switch (type) {
    case LoanType.MICRO:
      return microLoanDetailsQuery
    default:
      return microLoanDetailsQuery
  }
}

export const useQueryGetLoanProgramDetails = <T>(
  id: string,
  queryKey: string,
  queryFn: () => Promise<T>
) => {
  return useQuery<T, AxiosError<ErrorResponse>>({
    queryKey: [queryKey, id],
    queryFn: queryFn,
    enabled: !!id
  })
}

export const useQueryGetMicroLoanProgramDetails = (id: string) => {
  return useQueryGetLoanProgramDetails<MicroLoanProgramType>(
    id,
    QUERY_KEY.GET_LOAN_PROGRAM_DETAILS,
    () => {
      return getRequest({
        path: API_PATH.loanProgram.detail(id!, LoanType.MICRO)
      })
    }
  )
}
