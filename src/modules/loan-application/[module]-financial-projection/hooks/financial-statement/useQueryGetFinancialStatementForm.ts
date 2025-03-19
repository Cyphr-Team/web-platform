import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type FinancialStatementFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/financial-statement-form"
import { type FormDetailsQueryOptions } from "src/modules/loan-application/hooks/form-common"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/form-common/useQueryFormBySetupId"

export const useQueryGetFinancialStatementForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormBySetupId<FinancialStatementFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_FINANCIAL_STATEMENT_FORM],
    enabled,
    path: API_PATH.financialProjection.financialStatement.findBySetupId
  })
