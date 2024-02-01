import { API_PATH } from "@/constants"
import * as z from "zod"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { customRequestHeader } from "@/utils/request-header"
import { toastError, toastSuccess } from "@/utils"
import { TOAST_MSG } from "@/constants/toastMsg"
import { getAxiosError } from "@/utils/custom-error"
import { LoanProgram } from "@/types/loan-program.type"

export const createLoanProgramForm = z.object({
  name: z.string().min(1, "Name is required."),
  type: z.string().min(1, "Type is required.")
})

export type CreateLoanProgramValue = z.infer<typeof createLoanProgramForm>

export const useCreateLoanProgram = () => {
  return useMutation<
    AxiosResponse<LoanProgram>,
    AxiosError<ErrorResponse>,
    CreateLoanProgramValue
  >({
    mutationFn: ({ name, type }) => {
      return postRequest({
        path: API_PATH.loanProgram.create,
        data: { name, type },
        customHeader: customRequestHeader.customHeaders
      })
    },
    onSuccess: () => {
      toastSuccess(TOAST_MSG.user.sendInvitation)
    },
    onError: (error) => {
      toastError({
        ...TOAST_MSG.user.sendInvitation,
        description: getAxiosError(error).message
      })
    }
  })
}
