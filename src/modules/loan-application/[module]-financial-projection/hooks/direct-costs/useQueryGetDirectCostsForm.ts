import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import { type DirectCostsFormResponse } from "@/modules/loan-application/[module]-financial-projection/types/direct-costs-form"
import { type FormDetailsQueryOptions } from "src/modules/loan-application/hooks/form-common"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/form-common/useQueryFormBySetupId"

export const useQueryGetDirectCostsForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormBySetupId<DirectCostsFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_DIRECT_COSTS_FORM],
    enabled,
    path: API_PATH.financialProjection.directCosts.findBySetupId
  })
