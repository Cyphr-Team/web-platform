import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { type ErrorResponse } from "@/types/common.type"
import { formsConfigurationEnabled } from "@/utils/feature-flag.utils"
import { type LoanProgramFormsConfiguration } from "@/types/loan-program.type"

export const useQueryGetFormsConfiguration = (id?: string) => {
  return useQuery<LoanProgramFormsConfiguration, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_FORMS_CONFIGURATION, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanProgram.formsConfiguration,
        params: { id }
      })
    },
    enabled: !!id && formsConfigurationEnabled()
  })
}
