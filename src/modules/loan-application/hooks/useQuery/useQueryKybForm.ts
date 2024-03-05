import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { KYBInformationResponse } from "../../constants/type"
import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { ErrorResponse } from "@/types/common.type"

export const useQueryGetKybForm = (id: string) => {
  return useQuery<KYBInformationResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_KYB_FORM, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.kybForm,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
