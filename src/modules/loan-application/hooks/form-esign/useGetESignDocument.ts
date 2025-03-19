import { getRequest } from "@/services/client.service.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { type IESignDocument } from "@/types/esign/document.type.ts"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { E_SIGN_CLIENT } from "../../constants/e-sign.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"

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
