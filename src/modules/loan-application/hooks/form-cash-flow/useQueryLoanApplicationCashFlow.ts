import { API_PATH } from "@/constants"
import { getRequest } from "@/services/client.service.ts"
import { type ErrorResponse } from "@/types/common.type.ts"
import { useQuery } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { type LoanApplicationCashflowVerification } from "../../constants/type.ts"

export const useQueryGetLoanApplicationCashflowVerification = (id?: string) => {
  return useQuery<
    LoanApplicationCashflowVerification,
    AxiosError<ErrorResponse>
  >({
    queryKey: [QUERY_KEY.GET_LOAN_APPLICATION_CASHFLOW_VERIFICATION, id],
    queryFn: () => {
      if (!id) throw new Error("Loan application ID not found!")

      return getRequest({
        path: API_PATH.application.getCashflowVerification(id)
      })
    },
    enabled: !!id
  })
}
