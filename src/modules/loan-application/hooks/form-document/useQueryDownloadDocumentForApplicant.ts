import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { downloadPDFFile } from "@/utils"
import { customRequestHeader } from "@/utils/request-header.ts"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/query-key.ts"

export const useQueryDownloadDocumentForApplicant = ({
  documentId,
  fileName,
  preventCacheCount
}: {
  documentId?: string
  fileName?: string
  preventCacheCount?: number
}) => {
  return useQuery<string, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_DOWNLOAD_DOCUMENT, documentId, preventCacheCount],
    queryFn: async () => {
      const data = await getRequest<{ documentId: string }, string>({
        path: API_PATH.document.getDocumentDownloadForApplicant,
        params: { documentId: documentId! },
        customHeader: customRequestHeader.customHeaders,
        config: {
          responseType: "arraybuffer"
        }
      })

      downloadPDFFile(data, fileName ?? "document")

      return data
    },
    enabled: !!documentId && !!preventCacheCount
  })
}
