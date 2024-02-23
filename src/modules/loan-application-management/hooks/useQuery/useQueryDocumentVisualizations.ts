import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { QUERY_KEY } from "../../constants/query-key"
import { DocumentVisualizationType } from "../../constants/types/document"

export const useQueryGetDocumentVisualizations = ({
  applicationId,
  documentId
}: {
  applicationId: string
  documentId: string
}) => {
  return useQuery<DocumentVisualizationType, ErrorResponse>({
    queryKey: [
      QUERY_KEY.GET_DOCUMENT_VISUALIZATIONS,
      applicationId,
      documentId
    ],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanApplicationDetails.getDocumentVisualizations(
          applicationId,
          documentId
        )
      })
    },
    enabled: !!applicationId && !!documentId
  })
}
