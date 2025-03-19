import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { downloadPDFFile } from "@/utils"
import { customRequestHeader } from "@/utils/request-header"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/query-key"

export const useQueryDownloadDocumentForOfficer = ({
  documentId,
  fileName,
  preventCacheCount
}: {
  documentId?: string
  fileName?: string
  preventCacheCount: number
}) => {
  return useQuery<string, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_DOCUMENT_DOWNLOAD, documentId, preventCacheCount],
    queryFn: async () => {
      const data = await getRequest<{ documentId: string }, string>({
        path: API_PATH.document.getDocumentDownloadForOfficer,
        params: { documentId: documentId! },
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

      // Return blob for preview
      return URL.createObjectURL(pdfBlob)
    },
    enabled: !!documentId && !!preventCacheCount
  })
}
