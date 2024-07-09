import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useQueryClient } from "@tanstack/react-query"
import { customRequestHeader } from "@/utils/request-header"
import {
  LoanMeta,
  UserMicroLoanApplication,
  UserMicroLoanApplicationRequest
} from "@/types/loan-application.type"
import { loanApplicationUserKeys } from "@/constants/query-key"
import { LoanType } from "@/types/loan-program.type"
import { useMutationFactory } from "."

export const useUpdateLoanApplicationMutation = (
  id: string,
  loanType: LoanType
) => {
  const microLoanMutation = useUpdateLoanApplication<
    UserMicroLoanApplicationRequest,
    UserMicroLoanApplication<LoanMeta>
  >(id, loanType)

  switch (loanType) {
    case LoanType.MICRO:
      return microLoanMutation
    default:
      return microLoanMutation
  }
}

const useUpdateLoanApplication = <R, T>(id: string, loanType: LoanType) => {
  const queryClient = useQueryClient()

  return useMutationFactory<R, T>(
    (data) => {
      return putRequest({
        path: API_PATH.application.update(id, loanType),
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    () => {
      queryClient.invalidateQueries({
        queryKey: loanApplicationUserKeys.detail(id)
      })
    }
  )
}
