import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { API_PATH } from "@/constants"
import { ErrorResponse } from "@/types/common.type"
import { formsConfigurationEnabled } from "@/utils/feature-flag.utils"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"
import { LoanProgramFormsConfiguration } from "@/types/loan-program.type"

export const useGetFormsConfiguration = (id: string) => {
  return useQuery<LoanProgramFormsConfiguration, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_FORMS_CONFIGURATION, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanProgram.cdfi.configuration(id)
      })
    },
    enabled: !!id && formsConfigurationEnabled()
  })
}
