import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type FpEquityFinancingFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/equity-form"
import { type FormDetailsQueryOptions } from "src/modules/loan-application/hooks/form-common"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/form-common/useQueryFormBySetupId"

export const useQueryGetEquityFinancingForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormBySetupId<FpEquityFinancingFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_EQUITY_FINANCING_FORM],
    enabled,
    path: API_PATH.financialProjection.equityFinancing.findBySetupId
  })
