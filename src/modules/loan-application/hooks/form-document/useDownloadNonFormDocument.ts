import { API_PATH } from "@/constants"
import { FORMAT_DATE_MM_DD_YYYY_HH_MM } from "@/constants/date.constants"
import { postRequest } from "@/services/client.service"
import { downloadFile } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"

export interface DownloadNonFormDocumentParams {
  documentId: string
  documentName?: string
}

export const useDownloadNonFormDocument = () => {
  return useMutation({
    mutationFn: async ({
      documentId,
      documentName
    }: DownloadNonFormDocumentParams) => {
      const blob = await postRequest<DownloadNonFormDocumentParams, Blob>({
        path: API_PATH.application.formV2.documentNonForm.byDocumentId,
        config: { responseType: "blob" },
        params: { documentId }
      })

      // Normally, we have to convert the data response to Blob
      // But the server has already handle it
      // Therefore we just need to use 'downloadFile'
      const fileName =
        documentName ??
        `Document_${format(new Date(), FORMAT_DATE_MM_DD_YYYY_HH_MM)}`

      downloadFile(blob.data, fileName + ".pdf")

      return blob
    }
  })
}
