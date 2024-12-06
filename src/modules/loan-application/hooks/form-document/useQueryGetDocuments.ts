import { type ErrorResponse } from "@/types/common.type.ts"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { getRequest } from "@/services/client.service.ts"
import { API_PATH } from "@/constants"
import { type DocumentUploadedResponse } from "../../constants/type.ts"

export const useQueryGetDocumentsByForm = (formId: string) => {
  return useQuery<DocumentUploadedResponse[], AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_FORM_DOCUMENTS, formId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.documents,
        params: { formId: formId }
      })
    },
    enabled: !!formId
  })
}
