import { API_PATH } from "@/constants"
import { loanProgramKeys } from "@/constants/query-key"
import { TOAST_MSG } from "@/constants/toastMsg"
import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { type ProgramStatus } from "@/types/loan-program.type"
import { toastError, toastSuccess } from "@/utils"
import { getAxiosError } from "@/utils/custom-error"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"

export function useUpdateStatusLoanProgram() {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<boolean>,
    AxiosError<ErrorResponse>,
    { loanProgramId: string; programStatus: ProgramStatus }
  >({
    mutationFn: ({ loanProgramId, programStatus }) => {
      if (!loanProgramId) {
        toastError({ title: "Error", description: "Missing loan program id" })
        throw new Error("Missing loan program id")
      }

      return postRequest({
        path: API_PATH.loanProgram.cdfi.updateStatus(loanProgramId),
        customHeader: customRequestHeader.customHeaders,
        data: { status: programStatus }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanProgramKeys.lists() })

      toastSuccess(TOAST_MSG.loanProgram.updateStatus)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.loanProgram.updateStatus,
        description: getAxiosError(error).message
      })
    }
  })
}
