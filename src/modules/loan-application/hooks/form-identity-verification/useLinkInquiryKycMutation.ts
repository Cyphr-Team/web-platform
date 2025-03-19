import { API_PATH } from "@/constants"
import { postRequest } from "@/services/client.service.ts"

import { type ILinkInquiryRequest } from "@/types/kyc/request/LinkInquiryRequest.ts"
import { type ILinkInquiryResponse } from "@/types/kyc/response/LinkInquiryResponse.ts"
import { customRequestHeader } from "@/utils/request-header.ts"

import { useMutationFactory } from "@/modules/loan-application/hooks/form-common"

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
