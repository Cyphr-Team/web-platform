import { API_PATH } from "@/constants"
import { type LoanReadiness } from "@/modules/loan-application-management/constants/types/loan-readiness.type.ts"
import { getRequest } from "@/services/client.service"
import { type ErrorResponse } from "@/types/common.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { QUERY_KEY } from "../../constants/query-key"

interface UseQueryLoanReadinessAssessmentProps {
  applicationId?: string
  params?: {
    dummyLevel?: string
  }
}

export const useQueryLoanReadinessAssessmentByApplicationId = ({
  applicationId,
  params
}: UseQueryLoanReadinessAssessmentProps) => {
  return useQuery<LoanReadiness, ErrorResponse>({
    queryKey: [QUERY_KEY.GET_LOAN_READINESS_ASSESSMENT, applicationId, params],
    queryFn: () => {
      return getRequest({
        path: API_PATH.loanReadiness.getLoanReadinessAssessment(applicationId!),
        params
      })
    },
    enabled: !!applicationId,
    placeholderData: keepPreviousData,
    /**
     * Enable caching to avoid refetch
     * when useQueryLoanReadinessAssessmentByApplicationId being use in multiple place
     * */
    refetchOnMount: false
  })
}
