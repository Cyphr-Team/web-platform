import { postRequest } from "@/services/client.service"

import { type ILinkESignDocumentRequest } from "@/types/esign/request/LinkESignDocumentRequest"
import { useQueryClient } from "@tanstack/react-query"
import { useMutationFactory } from "."
import { E_SIGN_CLIENT } from "../../constants/e-sign"
import { QUERY_KEY } from "../../constants/query-key"

export const useLinkESignDocument = () => {
  const queryClient = useQueryClient()

  return useMutationFactory<ILinkESignDocumentRequest, never>(
    (data) => {
      return postRequest({
        path: E_SIGN_CLIENT.ENDPOINTS.linkDocument(),
        data
      })
    },
    () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_E_SIGN] })
    }
  )
}
