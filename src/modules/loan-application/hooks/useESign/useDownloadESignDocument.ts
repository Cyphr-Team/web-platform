import { getRequest } from "@/services/client.service"
import { downloadFile } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { E_SIGN_CLIENT } from "../../constants/e-sign"
import { FORMAT_DATE_MM_DD_YYYY_HH_MM } from "@/constants/date.constants"

export const useDownloadESignDocument = () => {
  return useMutation({
    mutationFn: async (documentId: string) => {
      const blob = await getRequest<never, Blob>({
        path: E_SIGN_CLIENT.ENDPOINTS.downloadDocument(documentId),
        customHeader: { Accept: "application/octet-stream" },
        config: { responseType: "blob" }
      })

      // Normally, we have to convert the data response to Blob
      // But the server has already handle it
      // Therefore we just need to use 'downloadFile'
      const fileName = `E_Signed_Application_${format(
        new Date(),
        FORMAT_DATE_MM_DD_YYYY_HH_MM
      )}.pdf`

      downloadFile(blob, fileName)

      return blob
    }
  })
}
