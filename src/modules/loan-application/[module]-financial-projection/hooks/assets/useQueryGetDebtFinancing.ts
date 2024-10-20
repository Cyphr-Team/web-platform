import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import {
  type DebtFinancingLiabilityResponse,
  type DebtFinancingResponse
} from "@/modules/loan-application/[module]-financial-projection/types/debt-financing"
import { type FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId"

export const useQueryGetDebtFinancingForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<DebtFinancingResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_FP_DEBT_FINANCING_FORM],
    enabled,
    path: API_PATH.financialProjection.debtFinancing.findBySetupId
  })

export const useQueryGetDebtFinancingLiabilityForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<DebtFinancingLiabilityResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_FP_DEBT_FINANCING_LIABILITY_FORM],
    enabled,
    path: API_PATH.financialProjection.liability.findBySetupId
  })
