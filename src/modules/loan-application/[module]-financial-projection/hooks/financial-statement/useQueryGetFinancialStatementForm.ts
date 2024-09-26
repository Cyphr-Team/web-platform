import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { FinancialStatementFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-statement-form"
import { FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId"

export const useQueryGetFinancialStatementForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<FinancialStatementFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_FINANCIAL_STATEMENT_FORM],
    enabled,
    path: API_PATH.financialProjection.financialStatement.findBySetupId
  })
