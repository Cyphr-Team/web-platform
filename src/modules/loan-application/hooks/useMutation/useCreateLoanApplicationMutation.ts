import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"

import { customRequestHeader } from "@/utils/request-header"
import {
  UserMicroLoanApplication,
  UserMicroLoanApplicationRequest
} from "@/types/loan-application.type"
import { LoanType } from "@/types/loan-program.type"
import { useMutationFactory } from "."

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
