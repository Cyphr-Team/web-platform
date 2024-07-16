import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { PreQualificationResponse } from "../../constants/type"
import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { ErrorResponse } from "@/types/common.type"

export const useQueryGetPreQualificationForm = (id: string) => {
  return useQuery<PreQualificationResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_PRE_QUALIFICATION_FORM, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.preQualification,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
