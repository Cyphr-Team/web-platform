import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { QUERY_KEY } from "../../constants/query-key"
import { LoanType, type MicroLoanProgramType } from "@/types/loan-program.type"
import { useQueryDetailsFactory } from "."

export const useQueryLoanProgramDetailsByType = (
  loanType: LoanType,
  id: string
) => {
  const microLoanQuery = useQueryLoanProgramDetails<MicroLoanProgramType>(
    id,
    LoanType.MICRO
  )

  switch (loanType) {
    case LoanType.MICRO:
      return microLoanQuery
    default:
      return microLoanQuery
  }
}

export const useQueryLoanProgramDetails = <T>(
  id: string,
  loanType: LoanType
) => {
  return useQueryDetailsFactory<T>(
    id,
    [QUERY_KEY.GET_LOAN_PROGRAM_DETAILS],
    () => {
      return getRequest({
        path: API_PATH.loanProgram.detail(id, loanType)
      })
    }
  )
}
