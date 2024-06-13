import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"

import { IPlaidItemLinkRequest } from "@/types/plaid/request/PlaidItemLinkRequest"
import { customRequestHeader } from "@/utils/request-header"
import { useMutationFactory } from "."

export const useLinkPlaidItemId = () => {
  return useMutationFactory<IPlaidItemLinkRequest, never>((data) => {
    return postRequest({
      path: API_PATH.application.linkPlaidItem,
      data,
      customHeader: customRequestHeader.customHeaders
    })
  })
}
