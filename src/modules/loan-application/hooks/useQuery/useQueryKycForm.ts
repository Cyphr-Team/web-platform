import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { QUERY_KEY } from "../../constants/query-key"
import { KYCInformationResponse } from "../../constants/type"
import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"

export const useQueryGetKycForm = (id: string) => {
  return useQuery<KYCInformationResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_KYC_FORM, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.kycForm,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
