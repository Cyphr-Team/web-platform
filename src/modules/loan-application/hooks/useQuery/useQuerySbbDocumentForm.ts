import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { AxiosError } from "axios"
import { SBBUploadDocumentFormResponse } from "@/modules/loan-application/constants/type.ts"

export const useQuerySbbDocumentForm = (applicationId?: string) => {
  return useQuery<SBBUploadDocumentFormResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_SBB_DOCUMENT_FORM, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.sbbDocument.index,
        params: { applicationId }
      })
    },
    enabled: !!applicationId
  })
}
