import { API_PATH } from "@/constants"
import { loanApplicationUserKeys } from "@/constants/query-key"
import { type LoanRequestFormValue } from "@/modules/loan-application/constants/form"
import { getRequest } from "@/services/client.service"
import { type UserMicroLoanApplication } from "@/types/loan-application.type"
import { LoanType } from "@/types/loan-program.type"
import { useQueryDetailsFactory } from "."

export const useQueryLoanApplicationDetailsByType = (
  id: string,
  loanType: LoanType
) => {
  const microLoanQuery =
    useQueryUserLoanApplicationDetails<UserMicroLoanApplication>(
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

export const reverseFormatLoanRequestForm = (
  loanApplicationDetails?: UserMicroLoanApplication
): LoanRequestFormValue => {
  if (!loanApplicationDetails)
    return {
      id: "",
      loanAmount: 0,
      loanTermInMonth: 0,
      proposeUseOfLoan: ""
    }

  return {
    id: loanApplicationDetails.id,
    applicationId: loanApplicationDetails.id,
    loanAmount: loanApplicationDetails.loanAmount,
    loanTermInMonth: loanApplicationDetails.loanTermInMonth,
    proposeUseOfLoan: loanApplicationDetails.proposeUseOfLoan
  }
}
