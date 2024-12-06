import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type FpOperatingExpensesFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/operating-expenses-form"
import { type FormDetailsQueryOptions } from "src/modules/loan-application/hooks/form-common"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/form-common/useQueryFormBySetupId"

export const useQueryGetFpOperatingExpensesForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormBySetupId<FpOperatingExpensesFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_FP_OPERATING_EXPENSES_FORM],
    enabled,
    path: API_PATH.financialProjection.operatingExpenses.findBySetupId
  })
