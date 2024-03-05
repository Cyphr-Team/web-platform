import { ErrorResponse } from "@/types/common.type"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { getRequest } from "@/services/client.service"
import { API_PATH } from "@/constants"
import { DocumentUploadedResponse } from "../../constants/type"

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
