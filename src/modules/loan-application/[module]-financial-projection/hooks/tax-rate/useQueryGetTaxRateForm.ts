import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type ExpenseTaxRateFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/tax-rate-form"
import { type FormDetailsQueryOptions } from "src/modules/loan-application/hooks/form-common"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/form-common/useQueryFormBySetupId"

export const useQueryGetTaxRateForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormBySetupId<ExpenseTaxRateFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_EXPENSE_TAX_RATE_FORM],
    enabled,
    path: API_PATH.financialProjection.taxRates.findBySetupId
  })
