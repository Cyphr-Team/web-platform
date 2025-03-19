import { getRequest } from "@/services/client.service"
import { downloadFile } from "@/utils"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { E_SIGN_CLIENT } from "../../constants/e-sign"
import { FORMAT_DATE_MM_DD_YYYY_HH_MM } from "@/constants/date.constants"

interface Params {
  documentId?: string
  id?: string
}

export const useDownloadESignDocument = () => {
  return useMutation({
    mutationFn: async ({
      documentId,
      id,
      documentName
    }: {
      documentId?: string
      id?: string
      documentName?: string
    }) => {
      const blob = await getRequest<Params, Blob>({
        path: E_SIGN_CLIENT.ENDPOINTS.downloadDocument(),
        customHeader: { Accept: "application/octet-stream" },
        config: { responseType: "blob" },
        params: { documentId: documentId, id: id }
      })

      // Normally, we have to convert the data response to Blob
      // But the server has already handle it
      // Therefore we just need to use 'downloadFile'
      const fileName =
        documentName ??
        `E_Signed_Application_${format(
          new Date(),
          FORMAT_DATE_MM_DD_YYYY_HH_MM
        )}`

      downloadFile(blob, fileName + ".pdf")

      return blob
    }
  })
}
