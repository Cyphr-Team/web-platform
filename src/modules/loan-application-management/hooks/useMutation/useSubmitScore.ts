import { API_PATH } from "@/constants"
import { judgeLoanApplicationKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { postRequest } from "@/services/client.service"
import { ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import { ErrorResponse } from "@/types/common.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { IScoreFormValues } from "../../providers/ScoreFormProvider"

interface ISubmitScoreParams {
  applicationId?: string
}

export const useSubmitScore = ({ applicationId }: ISubmitScoreParams) => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<ILaunchKCApplicationScore>,
    AxiosError<ErrorResponse>,
    IScoreFormValues
  >({
    mutationFn: (data) => {
      if (!applicationId) throw Error("Missing application id.")

      return postRequest({
        path: API_PATH.judgeApplication.detail(applicationId),
        data: {
          score: {
            ...data,
            comment: undefined // ignore comment in score
          },
          comment: data.comment
        }
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.judgeLoanApplication.submitScoreSuccess)
      queryClient.invalidateQueries({
        queryKey: judgeLoanApplicationKeys.detail(applicationId!)
      })
      queryClient.invalidateQueries({
        queryKey: judgeLoanApplicationKeys.lists()
      })
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.judgeLoanApplication.submitScoreSuccess,
        description: getAxiosError(error).message
      })
    }
  })
}
