import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import {
  LoanMeta,
  UserMicroLoanApplication
} from "@/types/loan-application.type"
import { loanApplicationUserKeys } from "@/constants/query-key"
import { useQueryDetailsFactory } from "."
import { LoanType } from "@/types/loan-program.type"

export const useQueryLoanApplicationDetailsByType = (
  id: string,
  loanType: LoanType
) => {
  const microLoanQuery = useQueryUserLoanApplicationDetails<
    UserMicroLoanApplication<LoanMeta>
  >(id, LoanType.MICRO)

  switch (loanType) {
    case LoanType.MICRO:
      return microLoanQuery
    default:
      return microLoanQuery
  }
}

export const useQueryUserLoanApplicationDetails = <T>(
  id: string,
  loanType: LoanType
) => {
  return useQueryDetailsFactory<T>(
    id,
    loanApplicationUserKeys.detail(id),
    () => {
      return getRequest({
        path: API_PATH.application.details(loanType),
        params: {
          id
        }
      })
    }
  )
}
