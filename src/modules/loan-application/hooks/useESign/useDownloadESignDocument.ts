import { getRequest } from "@/services/client.service"
import { useMutation } from "@tanstack/react-query"
import { E_SIGN_CLIENT } from "../../constants/e-sign"

// TODO - ESign: Integrate API download document
export const useDownloadESignDocument = () => {
  return useMutation({
    mutationFn: (documentId: string) => {
      return getRequest<unknown, unknown>({
        path: E_SIGN_CLIENT.ENDPOINTS.downloadDocument(documentId)
      })
    }
  })
}
