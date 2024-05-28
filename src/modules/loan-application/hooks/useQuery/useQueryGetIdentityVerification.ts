import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { ErrorResponse } from "@/types/common.type"
import { ILinkInquiryData } from "@/types/kyc/response/LinkInquiryResponse"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key"

export const useQueryGetIdentityVerification = (appId: string) => {
  return useQuery<ILinkInquiryData, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_IDENTITY_VERIFICATION, appId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.getInquiry,
        params: { applicationId: appId }
      })
    },
    enabled: !!appId
  })
}
