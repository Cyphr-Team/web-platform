import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { putRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { LoanProgramFormsConfiguration } from "@/types/loan-program.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { z } from "zod"

export const updateFormsConfigurationForm = z.object({
  loanProgramId: z.string(),
  forms: z.array(z.string())
})

export type UpdateFormsConfigurationValue = z.infer<
  typeof updateFormsConfigurationForm
>

export const useUpdateFormsConfiguration = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<LoanProgramFormsConfiguration>,
    AxiosError<ErrorResponse>,
    UpdateFormsConfigurationValue
  >({
    mutationFn: (data) => {
      return putRequest({
        path: API_PATH.loanProgram.cdfi.configuration(data.loanProgramId),
        data
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_FORMS_CONFIGURATION]
      })
    }
  })
}
