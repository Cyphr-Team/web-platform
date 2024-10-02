import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { downloadPDFFile } from "@/utils"
import { customRequestHeader } from "@/utils/request-header"
import { useQuery } from "@tanstack/react-query"
import { chatbotDocumentKeys } from "@/constants/query-key"
import { configWithResponseType } from "@/utils/request-config"

export const useQueryDownloadChatbotDocument = ({
  documentId,
  fileName,
  timestamp
}: {
  documentId?: string
  fileName?: string
  timestamp: number
}) => {
  return useQuery<string, ErrorResponse>({
    queryKey: chatbotDocumentKeys.download(documentId ?? "", timestamp),
    queryFn: async () => {
      const data = await getRequest<{ id: string }, string>({
        path: API_PATH.admin.document.download,
        params: { id: documentId! },
        customHeader: customRequestHeader.customHeaders,
        config: configWithResponseType("arraybuffer")
      })

      // Only download if needed
      if (fileName) {
        downloadPDFFile(data, fileName)
      }

      const pdfBlob = new Blob([data], {
        type: "application/pdf"
      })

      // Return blob for preview
      return URL.createObjectURL(pdfBlob)
    },
    enabled: !!documentId && !!timestamp
  })
}
