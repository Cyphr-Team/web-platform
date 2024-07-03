import { API_PATH } from "@/constants"
import * as z from "zod"
import { patchRequest, postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { LoanProgram, ProgramStatus } from "@/types/loan-program.type"
import { loanProgramKeys } from "@/constants/query-key"
import { createLoanProgramForm } from "./useCreateLoanProgram"

export type UpdateLoanProgramValue = z.infer<typeof createLoanProgramForm>

export const useUpdateLoanProgram = ({
  loanProgramId,
  status
}: {
  loanProgramId?: string
  status?: ProgramStatus
}) => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<LoanProgram>,
    AxiosError<ErrorResponse>,
    UpdateLoanProgramValue
  >({
    mutationFn: (data) => {
      // If the status is draft, update the program. Otherwise, create a new program with rootVersionId is loanProgramId.
      return status === ProgramStatus.DRAFT
        ? patchRequest({
            path: API_PATH.loanProgram.workspaceAdmin.update(),
            data: { ...data, programId: loanProgramId },
            customHeader: customRequestHeader.customHeaders
          })
        : postRequest({
            path: API_PATH.loanProgram.workspaceAdmin.create(),
            data: {
              ...data,
              rootVersionId: loanProgramId
            },
            customHeader: customRequestHeader.customHeaders
          })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanProgramKeys.lists() })
      if (loanProgramId && status === ProgramStatus.DRAFT)
        queryClient.invalidateQueries({
          queryKey: loanProgramKeys.detail(loanProgramId)
        })

      toastSuccess(TOAST_MSG.loanProgram.update)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.loanProgram.update,
        description: getAxiosError(error).message
      })
    }
  })
}
