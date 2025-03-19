import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"

import { type IPlaidItemLinkRequest } from "@/types/plaid/request/PlaidItemLinkRequest.ts"
import { customRequestHeader } from "@/utils/request-header.ts"

import { useMutationFactory } from "@/modules/loan-application/hooks/form-common"

export const useLinkPlaidItemId = () => {
  return useMutationFactory<IPlaidItemLinkRequest, never>((data) => {
    return postRequest({
      path: API_PATH.application.linkPlaidItem,
      data,
      customHeader: customRequestHeader.customHeaders
    })
  })
}
