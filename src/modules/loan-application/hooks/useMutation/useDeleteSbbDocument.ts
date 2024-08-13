import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { AxiosError, AxiosResponse } from "axios"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { SBBDeleteDocumentResponse } from "@/modules/loan-application/constants/type.ts"

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
