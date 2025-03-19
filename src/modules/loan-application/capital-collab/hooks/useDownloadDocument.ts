import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { customRequestHeader } from "@/utils/request-header"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"
import { downloadPDFFile } from "@/utils"

interface PreviewDocumentPayload {
  documentId: string
  fileName?: string
  preventCacheCount: number
  isAdmin: boolean
}

export const useDownloadDocument = ({
  documentId,
  fileName,
  preventCacheCount,
  isAdmin
}: PreviewDocumentPayload) => {
  const queryPath = isAdmin
    ? API_PATH.loanApplicationDetails.capitalCollabDocuments.admin
        .downloadDocument
    : API_PATH.loanApplicationDetails.capitalCollabDocuments.applicant
        .downloadDocument

  return useQuery<string, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_DOCUMENT_DOWNLOAD, documentId, preventCacheCount],
    queryFn: async () => {
      const { data } = await postRequest<{ documentId: string }, string>({
        path: queryPath,
        params: {
          documentId
        },
        customHeader: customRequestHeader.customHeaders,
        config: {
          responseType: "arraybuffer"
        }
      })

      // Only download if needed
      if (fileName) {
        downloadPDFFile(data, fileName ?? "document")
      }

      const pdfBlob = new Blob([data], {
        type: "application/pdf"
      })

      return URL.createObjectURL(pdfBlob)
    },
    enabled: !!documentId && !!preventCacheCount
  })
}
