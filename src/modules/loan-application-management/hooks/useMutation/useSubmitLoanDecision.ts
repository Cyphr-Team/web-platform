import { API_PATH } from "@/constants"
import { putRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { useParams } from "react-router-dom"
import { getAxiosError } from "@/utils/custom-error"
import { TOAST_MSG } from "@/constants/toastMsg"
import { toastError, toastSuccess } from "@/utils"
import {
  LoanDecision,
  LoanDecisionResponse
} from "../../constants/types/application"
import {
  loanApplicationKeys,
  workspaceAdminLoanApplicationScoreKeys
} from "@/constants/query-key"
import { QUERY_KEY } from "../../constants/query-key"

export const useSubmitLoanDecision = () => {
  const params = useParams()
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<LoanDecisionResponse>,
    AxiosError<ErrorResponse>,
    LoanDecision
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.loanApplication.submitDecision(params.id!),
        data,
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.loanApplication.submitDecision)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.loanApplication.submitDecision,
        description: getAxiosError(error).message
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: loanApplicationKeys.statusDetail(params.id!)
      })
      queryClient.invalidateQueries({
        queryKey: loanApplicationKeys.lists()
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_DETAILS]
      })
      queryClient.invalidateQueries({
        queryKey: workspaceAdminLoanApplicationScoreKeys.lists()
      })
      queryClient.invalidateQueries({
        queryKey: workspaceAdminLoanApplicationScoreKeys.detail(params.id!)
      })
    }
  })
}
