import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type DirectCostsFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/direct-costs-form"
import { type FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId"

export const useQueryGetDirectCostsForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<DirectCostsFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_DIRECT_COSTS_FORM],
    enabled,
    path: API_PATH.financialProjection.directCosts.findBySetupId
  })
