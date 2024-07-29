import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { QUERY_KEY } from "../../constants/query-key"
import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { BusinessDocumentsResponse } from "../../constants/type"

export const useQueryBusinessDocuments = (id: string) => {
  return useQuery<BusinessDocumentsResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_BUSINESS_DOCUMENTS, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.businessDocuments.detail,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
