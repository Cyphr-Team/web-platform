import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { E_SIGN_CLIENT } from "../../constants/e-sign"

interface IUseDownloadESignDocument {
  id?: string
  documentId?: string
}

export const useGetESignDocumentBlob = ({
  id,
  documentId
}: IUseDownloadESignDocument) => {
  return useQuery({
    queryKey: [E_SIGN_CLIENT.E_SIGN_QUERY_KEYS.pdfDocument, id],
    queryFn: () => {
      return getRequest<IUseDownloadESignDocument, Blob>({
        path: E_SIGN_CLIENT.ENDPOINTS.downloadDocument(),
        customHeader: { Accept: "application/octet-stream" },
        config: { responseType: "blob" },
        params: { id, documentId }
      })
    },
    enabled: !!id
  })
}
