import { API_PATH } from "@/constants"
import { judgeLoanApplicationKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { postRequest } from "@/services/client.service"
import { type ILaunchKCApplicationScore } from "@/types/application/application-score.type"
import { type ErrorResponse } from "@/types/common.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { type IScoreFormValues } from "../../providers/ScoreFormProvider"

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
            /**
             * We want our data look like this before send it to BE:
             * { score: {execution: 2, businessModel: 2,...}, comment: "cu khoai mon" }
             *
             * But the data itself contain field `comment`, so if we spread the data
             * directly to score, it will look like this:
             * { score: { comment: "cu khoai mon", execution: 2, businessModel: 2,...}, comment: "cu khoai mon" }
             * It's unnecessary, so I added `comment: undefined` to remove the comment in score object
             * */
            comment: undefined
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
