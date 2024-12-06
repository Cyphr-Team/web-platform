import { postRequest } from "@/services/client.service"
import { type IESignSession } from "@/types/esign/document.type"
import { useMutation } from "@tanstack/react-query"
import { E_SIGN_CLIENT } from "../../constants/e-sign"

export const useCreateESignSession = () => {
  return useMutation({
    mutationFn: (documentId: string) => {
      return postRequest<never, IESignSession>({
        path: E_SIGN_CLIENT.ENDPOINTS.createSessionDocument(documentId)
      })
    }
  })
}
