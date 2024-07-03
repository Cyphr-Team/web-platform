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
import { LoanProgram } from "@/types/loan-program.type"
import { loanProgramKeys } from "@/constants/query-key"

export const createLoanProgramForm = z.object({
  name: z.string().min(1, "Name is required."),
  type: z.string().min(1, "Type is required."),
  minLoanAmount: z.coerce.number().min(1, "Min loan amount is required."),
  maxLoanAmount: z.coerce.number().min(1, "Max loan amount is required."),
  minTermInMonth: z.coerce.number().min(1, "Min term in month is required."),
  maxTermInMonth: z.coerce.number().min(1, "Max term in month is required."),
  interestRate: z.coerce.number().min(1, "Interest rate is required."),
  interestRateType: z.string().min(1, "Interest rate type is required."),
  interestRateDescription: z
    .string()
    .min(1, "Interest rate description is required."),
  description: z.string().min(1, "Description is required."),
  originationFee: z.coerce.number().min(1, "Origination fee is required.")
})

export type CreateLoanProgramValue = z.infer<typeof createLoanProgramForm>

export const useCreateLoanProgram = ({ detailId }: { detailId?: string }) => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<LoanProgram>,
    AxiosError<ErrorResponse>,
    CreateLoanProgramValue
  >({
    mutationFn: (data) => {
      return detailId
        ? patchRequest({
            path: API_PATH.loanProgram.workspaceAdmin.update(),
            data: { ...data, programId: detailId },
            customHeader: customRequestHeader.customHeaders
          })
        : postRequest({
            path: API_PATH.loanProgram.workspaceAdmin.create(),
            data,
            customHeader: customRequestHeader.customHeaders
          })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: loanProgramKeys.lists() })
      if (detailId)
        queryClient.invalidateQueries({
          queryKey: loanProgramKeys.detail(detailId)
        })

      toastSuccess(
        detailId ? TOAST_MSG.loanProgram.update : TOAST_MSG.loanProgram.create
      )
    },
    onError: (error) => {
      toastError({
        ...(detailId
          ? TOAST_MSG.loanProgram.update
          : TOAST_MSG.loanProgram.create),
        description: getAxiosError(error).message
      })
    }
  })
}
