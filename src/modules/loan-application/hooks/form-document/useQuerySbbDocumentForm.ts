import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service.ts"
import { useQuery } from "@tanstack/react-query"
import { type ErrorResponse } from "@/types/common.type.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { type AxiosError } from "axios"
import { type SBBUploadDocumentFormResponse } from "@/modules/loan-application/constants/type.ts"
import { isSbb } from "@/utils/domain.utils.ts"

export const useQuerySbbDocumentForm = (applicationId?: string) => {
  return useQuery<SBBUploadDocumentFormResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_SBB_DOCUMENT_FORM, applicationId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.sbbDocument.index,
        params: { applicationId }
      })
    },
    enabled: !!applicationId && isSbb()
  })
}
