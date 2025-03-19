import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service.ts"
import { useQueryClient } from "@tanstack/react-query"
import { customRequestHeader } from "@/utils/request-header.ts"
import {
  type UserMicroLoanApplication,
  type UserMicroLoanApplicationRequest
} from "@/types/loan-application.type.ts"
import { loanApplicationUserKeys } from "@/constants/query-key.ts"
import { LoanType } from "@/types/loan-program.type.ts"

import { useMutationFactory } from "@/modules/loan-application/hooks/form-common"

export const useUpdateLoanApplicationMutation = (
  id: string,
  loanType: LoanType
) => {
  const microLoanMutation = useUpdateLoanApplication<
    UserMicroLoanApplicationRequest,
    UserMicroLoanApplication
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
