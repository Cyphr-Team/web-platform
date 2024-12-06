import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { type ILinkInquiryData } from "@/types/kyc/response/LinkInquiryResponse.ts"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key.ts"

interface useQueryGetIdentityVerificationProps {
  appId?: string
  enabled?: boolean
}

export const useQueryGetIdentityVerification = ({
  appId,
  enabled
}: useQueryGetIdentityVerificationProps) => {
  return useQuery<ILinkInquiryData, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_IDENTITY_VERIFICATION, appId],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.getInquiry,
        params: { applicationId: appId }
      })
    },
    enabled
  })
}
