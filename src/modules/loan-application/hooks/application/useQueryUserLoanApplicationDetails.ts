import { API_PATH } from "@/constants"
import { loanApplicationUserKeys } from "@/constants/query-key.ts"
import { type LoanRequestFormValue } from "@/modules/loan-application/constants/form.ts"
import { getRequest } from "@/services/client.service.ts"
import { type UserMicroLoanApplication } from "@/types/loan-application.type.ts"
import { LoanType } from "@/types/loan-program.type.ts"
import { useQueryDetailsFactory } from "../form-common"

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
