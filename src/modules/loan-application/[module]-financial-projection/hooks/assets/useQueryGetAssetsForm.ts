import { API_PATH } from "@/constants"
import { QUERY_KEY } from "@/modules/loan-application/[module]-financial-projection/constants/query-key"
import {
  type AssetsCurrentFormResponse,
  type AssetsLongTermFormResponse
} from "@/modules/loan-application/[module]-financial-projection/types/assets-form"
import { type FormDetailsQueryProps } from "@/modules/loan-application/hooks/useQuery"
import { useQueryFormBySetupId } from "@/modules/loan-application/hooks/useQuery/useQueryFormBySetupId"

export const useQueryGetCurrentAssetsForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<AssetsCurrentFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_CURRENT_ASSETS_FORM],
    enabled,
    path: API_PATH.financialProjection.assetsCurrent.findBySetupId
  })

export const useQueryGetLongTermAssetsForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormBySetupId<AssetsLongTermFormResponse>({
    setupId: applicationId,
    queryKey: [QUERY_KEY.GET_LONG_TERM_ASSETS_FORM],
    enabled,
    path: API_PATH.financialProjection.assetsLongTerm.findBySetupId
  })
