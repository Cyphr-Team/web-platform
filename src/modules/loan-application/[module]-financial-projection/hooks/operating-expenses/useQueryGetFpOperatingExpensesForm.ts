import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { FpOperatingExpensesFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/operating-expenses-form"
import { FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId"

export const useQueryGetFpOperatingExpensesForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<FpOperatingExpensesFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_OPERATING_EXPENSES_FORM],
    enabled,
    path: API_PATH.financialProjection.operatingExpenses.findBySetupId
  })
