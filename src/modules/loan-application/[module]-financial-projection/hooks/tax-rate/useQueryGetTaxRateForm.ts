import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { ExpenseTaxRateFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/tax-rate-form"
import { FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId"

export const useQueryGetTaxRateForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<ExpenseTaxRateFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_EXPENSE_TAX_RATE_FORM],
    enabled,
    path: API_PATH.financialProjection.taxRates.findBySetupId
  })
