import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { FpEquityFinancingFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/equity-form"
import { FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId"

export const useQueryGetEquityFinancingForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<FpEquityFinancingFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_EQUITY_FINANCING_FORM],
    enabled,
    path: API_PATH.financialProjection.equityFinancing.findBySetupId
  })
