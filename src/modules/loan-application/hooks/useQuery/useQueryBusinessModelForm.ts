import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { QUERY_KEY } from "../../constants/query-key"
import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { BusinessModelFormResponse } from "../../components/organisms/loan-application-form/business-model/type"

export const useQueryBusinessModelForm = (id: string) => {
  return useQuery<BusinessModelFormResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_BUSINESS_MODEL_FORM, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.businessModelForm.detail,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
