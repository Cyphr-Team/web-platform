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
/**
 * Hook to update loan program
 * Allow update loan program as long as the status is draft
 * But if the status is not draft, create a new program with rootVersionId is loanProgramId
 */

export const useUpdateLoanProgram = ({
  loanProgramId,
  status
}: {
  loanProgramId?: string
  status?: ProgramStatus
}) => {
  const queryClient = useQueryClient()

  /**
   * If the status is draft, update the program.
   * Otherwise, create a new program with rootVersionId is loanProgramId.
   * The new program will be used as a new version of the program. It has status as draft.
   */
  return useMutation<
    AxiosResponse<LoanProgram>,
    AxiosError<ErrorResponse>,
    UpdateLoanProgramValue
  >({
    mutationFn: (data) => {
      return status === ProgramStatus.DRAFT
        ? patchRequest({
            path: API_PATH.loanProgram.cdfi.update(),
            data: { ...data, programId: loanProgramId },
            customHeader: customRequestHeader.customHeaders
          })
        : postRequest({
            path: API_PATH.loanProgram.cdfi.create(),
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
