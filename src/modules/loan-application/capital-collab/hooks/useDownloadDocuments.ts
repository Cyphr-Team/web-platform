import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { customRequestHeader } from "@/utils/request-header"
import { useMutation } from "@tanstack/react-query"
import { downloadZip } from "@/utils"

interface DownloadDocumentsPayload {
  documentIds: string[]
}

interface UseDownloadDocumentsOptions {
  isAdmin?: boolean
}

// We need to download on button click
// useMutation is better than use useQuery, useQuery call every times the component is rendered
// useMutation only call when the function is called
export const useDownloadDocuments = ({
  isAdmin = false
}: UseDownloadDocumentsOptions) => {
  return useMutation<string, ErrorResponse, DownloadDocumentsPayload>({
    mutationFn: async ({ documentIds }: DownloadDocumentsPayload) => {
      const data = await postRequest<{ documentIds: string[] }, string>({
        path: isAdmin
          ? API_PATH.loanApplicationDetails.capitalCollabDocuments.admin
              .downloadMultipleDocuments
          : API_PATH.loanApplicationDetails.capitalCollabDocuments.applicant
              .downloadMultipleDocuments,
        data: {
          documentIds
        },
        customHeader: customRequestHeader.customHeaders,
        config: {
          responseType: "arraybuffer"
        }
      })

      downloadZip(data.data, "documents")

      return data.data
    }
  })
}
