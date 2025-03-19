import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import {
  type AssetsCurrentFormResponse,
  type AssetsLongTermFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/assets-form"
import { type FormDetailsQueryOptions } from "src/modules/loan-application/hooks/form-common"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/form-common/useQueryFormBySetupId"

export const useQueryGetCurrentAssetsForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormBySetupId<AssetsCurrentFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_CURRENT_ASSETS_FORM],
    enabled,
    path: API_PATH.financialProjection.assetsCurrent.findBySetupId
  })

export const useQueryGetLongTermAssetsForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormBySetupId<AssetsLongTermFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_LONG_TERM_ASSETS_FORM],
    enabled,
    path: API_PATH.financialProjection.assetsLongTerm.findBySetupId
  })
