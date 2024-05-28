import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service"

import { ILinkInquiryRequest } from "@/types/kyc/request/LinkInquiryRequest"
import { ILinkInquiryResponse } from "@/types/kyc/response/LinkInquiryResponse"
import { customRequestHeader } from "@/utils/request-header"
import { useMutationFactory } from "."

export const useLinkInquiryKyc = () => {
  return useMutationFactory<ILinkInquiryRequest, ILinkInquiryResponse>(
    (data) => {
      return postRequest({
        path: API_PATH.application.linkInquiry,
        data,
        customHeader: customRequestHeader.customHeaders
      })
    }
  )
}
