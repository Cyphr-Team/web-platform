import { postRequest } from "@/services/client.service.ts"

import { type ILinkESignDocumentRequest } from "@/types/esign/request/LinkESignDocumentRequest.ts"
import { useQueryClient } from "@tanstack/react-query"
import { E_SIGN_CLIENT } from "../../constants/e-sign.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { useMutationFactory } from "@/modules/loan-application/hooks/form-common"

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
