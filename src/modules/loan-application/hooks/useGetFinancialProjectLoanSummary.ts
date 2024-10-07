import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application-management/constants/query-key"
import { LoanSummary } from "@/modules/loan-application-management/constants/types/loan-summary.type"
import { getRequest } from "@/services/client.service"
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult
} from "@tanstack/react-query"
import { ErrorResponse, useParams } from "react-router-dom"

type UseQueryGetLoanSummaryOptions<T extends LoanSummary, TSelected = T> = Omit<
  UseQueryOptions<T, ErrorResponse, TSelected>,
  "queryKey" | "queryFn"
>

export function useGetLoanSummary<TSelected = LoanSummary>(
  options?: UseQueryGetLoanSummaryOptions<LoanSummary, TSelected>
): UseQueryResult<TSelected, ErrorResponse> {
  const { id: loanApplicationId } = useParams<{ id: string }>()

  return useQuery<LoanSummary, ErrorResponse, TSelected>({
    queryKey: [QUERY_KEY.GET_LOAN_SUMMARY, loanApplicationId],
    queryFn: () =>
      getRequest({
        path: API_PATH.loanApplicationDetails.getLoanSummary(loanApplicationId!)
      }),
    enabled: !!loanApplicationId,
    ...options
  })
}

export const useGetFinancialProjectLoanSummary = () => {
  const fpAssetsCurrentFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.assetCurrentForm
  })

  const fpAssetsLongTermFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.assetLongTermForm
  })

  const expensePeopleFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.expensePeopleForm
  })

  const fpOperatingExpensesFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.operatingExpenseForm
  })

  const revenueFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.revenueForm
  })

  const debtFinancingFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.debtFinancingForm
  })

  const debtFinancingLiabilityFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.debtFinancingLiabilityForm
  })

  const forecastingSetupQuery = useGetLoanSummary({
    select: (data) =>
      data?.financialApplicationForm?.financialProjectionSetupForm
  })

  const financialStatementQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.financialStatementForm
  })

  const fpEquityFinancingFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.equityForm
  })

  const fpExpenseTaxRateFormQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.expenseTaxRateForm
  })

  const directCostsQuery = useGetLoanSummary({
    select: (data) => data?.financialApplicationForm?.directCostForm
  })

  return {
    expensePeopleFormQuery,
    fpOperatingExpensesFormQuery,
    revenueFormQuery,
    debtFinancingFormQuery,
    debtFinancingLiabilityFormQuery,
    forecastingSetupQuery,
    financialStatementQuery,
    fpEquityFinancingFormQuery,
    fpAssetsLongTermFormQuery,
    fpAssetsCurrentFormQuery,
    fpExpenseTaxRateFormQuery,
    directCostsQuery
  }
}
