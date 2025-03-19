import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"

import { customRequestHeader } from "@/utils/request-header.ts"
import {
  type UserMicroLoanApplication,
  type UserMicroLoanApplicationRequest
} from "@/types/loan-application.type.ts"
import { LoanType } from "@/types/loan-program.type.ts"

import { useMutationFactory } from "@/modules/loan-application/hooks/form-common"

const useCreateLoanApplication = <R, T>(loanType: LoanType) => {
  return useMutationFactory<R, T>((data: R) => {
    return postRequest({
      path: API_PATH.application.create(loanType),
      data,
      customHeader: customRequestHeader.customHeaders
    })
  })
}

export const useCreateLoanApplicationMutation = (loanType: LoanType) => {
  const microLoanMutation = useCreateLoanApplication<
    UserMicroLoanApplicationRequest,
    UserMicroLoanApplication
  >(loanType)

  switch (loanType) {
    case LoanType.MICRO:
      return microLoanMutation
    default:
      return microLoanMutation
  }
}
