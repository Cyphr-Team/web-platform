import { useQuery } from "@tanstack/react-query"
import { getRequest } from "@/services/client.service.ts"
import { type FormDetailsQueryOptions } from "src/modules/loan-application/hooks/form-common"
import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { API_PATH } from "@/constants"
import { type CurrentLoanFormsV2Value } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form.ts"

export interface QueryCurrentLoansFormV2Response {
  formId: string
  currentLoans: {
    id: string
    loanApplicationId: string
    lenderName: string
    loanType: string
    outstandingLoanBalance: number
    monthlyPaymentAmount: number
    loanTermRemainingInMonths: number
    annualInterestRate: number
  }[]
}

export const useQueryCurrentLoansFormV2 = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_CURRENT_LOANS_FORM_V2, applicationId],
    enabled,
    queryFn: () =>
      getRequest<{ applicationId: string }, QueryCurrentLoansFormV2Response>({
        path: API_PATH.application.formV2.currentLoans.index,
        params: {
          applicationId
        }
      })
  })
}

export function deserializeCurrentLoansFormV2(
  data: QueryCurrentLoansFormV2Response
): CurrentLoanFormsV2Value {
  return {
    id: data.formId,
    hasOutstandingLoans:
      data.currentLoans?.length > 0 ? BINARY_VALUES.YES : BINARY_VALUES.NO,
    currentLoans: data.currentLoans
  }
}
