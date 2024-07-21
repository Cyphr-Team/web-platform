import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service"
import { QUERY_KEY } from "../../constants/query-key"
import { AxiosError } from "axios"
import { useQuery } from "@tanstack/react-query"
import { ErrorResponse } from "@/types/common.type"
import { LaunchKcFitFormResponse } from "../../components/organisms/loan-application-form/launchkc-fit/type"

export const useQueryLaunchKCFitForm = (id: string) => {
  return useQuery<LaunchKcFitFormResponse, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_LAUNCH_KC_FIT_FORM, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.application.launchKCFitForm.detail,
        params: { applicationId: id }
      })
    },
    enabled: !!id
  })
}
