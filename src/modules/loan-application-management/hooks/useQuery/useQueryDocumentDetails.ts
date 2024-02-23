import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { DocumentDetailsType } from "../../constants/types/document"

export const useQueryGetDocumentDetails = ({
  applicationId,
  documentId
}: {
  applicationId: string
  documentId: string
}) => {
  return useQuery<DocumentDetailsType, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_DOCUMENT_DETAILS, applicationId, documentId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getDocumentDetails(
          applicationId,
          documentId
        )
      })
    },
    enabled: !!applicationId && !!documentId
  })
}
