import { API_PATH } from "@/constants"
import { loanProgramKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { delRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"

export function useDeleteLoanProgram() {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<boolean>,
    AxiosError<ErrorResponse>,
    { loanProgramId: string }
  >({
    mutationFn: ({ loanProgramId }) => {
      if (!loanProgramId) throw new Error("Missing loan program id")

      return delRequest({
        path: API_PATH.loanProgram.cdfi.delete(loanProgramId),
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanProgramKeys.lists() })

      toastSuccess(TOAST_MSG.loanProgram.delete)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.loanProgram.delete,
        description: getAxiosError(error).message
      })
    }
  })
}
