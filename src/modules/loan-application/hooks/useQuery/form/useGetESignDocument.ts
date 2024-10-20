import { getRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { type IESignDocument } from "@/types/esign/document.type"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { E_SIGN_CLIENT } from "../../../constants/e-sign"
import { QUERY_KEY } from "../../../constants/query-key"

interface IGetESignDocumentByApplicationId {
  applicationId?: string
}

type IUseGetESignDocument = IGetESignDocumentByApplicationId & {
  enabled?: boolean
}

export const useGetESignDocument = ({
  applicationId,
  enabled
}: IUseGetESignDocument) => {
  return useQuery<IESignDocument, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_E_SIGN, applicationId],
    queryFn: () => {
      return getRequest<IGetESignDocumentByApplicationId, never>({
        path: E_SIGN_CLIENT.ENDPOINTS.getDocumentByAppId(),
        params: { applicationId }
      })
    },
    enabled: enabled
  })
}
