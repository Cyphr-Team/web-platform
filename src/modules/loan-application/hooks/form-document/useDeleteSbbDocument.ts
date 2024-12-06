import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type.ts"
import { type AxiosError, type AxiosResponse } from "axios"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { type SBBDeleteDocumentResponse } from "@/modules/loan-application/constants/type.ts"

export const useDeleteSbbDocument = () => {
  const queryClient = useQueryClient()

  return useMutation<
    AxiosResponse<SBBDeleteDocumentResponse>,
    AxiosError<ErrorResponse>,
    { id: string }
  >({
    mutationFn: (params) => {
      return postRequest({
        path: API_PATH.application.sbbDocument.deleteById,
        params
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_SBB_DOCUMENT_FORM]
      })

      return data
    }
  })
}
