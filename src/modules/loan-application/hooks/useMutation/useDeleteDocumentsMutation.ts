import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"

export const useMutateDeleteDocuments = () => {
  return useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse>,
    {
      formId: string
      formType: string
      documentId: string
    }
  >({
    mutationFn: (data) => {
      return postRequest({
        path: API_PATH.application.deleteDocuments,
        params: {
          formId: data.formId,
          formType: data.formType,
          documentId: data.documentId
        }
      })
    }
  })
}
