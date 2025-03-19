import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { type LoanProgramFormsConfiguration } from "@/types/loan-program.type"
import { useMutation } from "@tanstack/react-query"
import { type AxiosError, type AxiosResponse } from "axios"
import { z } from "zod"

export const createFormsConfigurationForm = z.object({
  loanProgramId: z.string(),
  forms: z.array(z.string())
})

export type CreateFormsConfigurationValue = z.infer<
  typeof createFormsConfigurationForm
>

export const useCreateFormsConfiguration = () => {
  return useMutation<
    AxiosResponse<LoanProgramFormsConfiguration>,
    AxiosError<ErrorResponse>,
    CreateFormsConfigurationValue
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.loanProgram.cdfi.configuration(data.loanProgramId),
        data
      })
    }
  })
}
