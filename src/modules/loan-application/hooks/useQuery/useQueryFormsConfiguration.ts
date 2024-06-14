import { getRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { ErrorResponse } from "@/types/common.type"
import { LoanProgramFormsConfiguration } from "../../constants/type"

export const useQueryGetFormsConfiguration = (id: string) => {
  return useQuery<LoanProgramFormsConfiguration, AxiosError<ErrorResponse>>({
    queryKey: [QUERY_KEY.GET_FORMS_CONFIGURATION, id],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanProgram.formsConfiguration,
        params: { id }
      })
    },
    enabled: !!id
  })
}
