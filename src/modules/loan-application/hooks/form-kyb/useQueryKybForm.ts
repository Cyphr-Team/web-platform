import { type KYBInformationResponse } from "../../constants/type.ts"
import { QUERY_KEY } from "../../constants/query-key.ts"
import { API_PATH } from "@/constants"
import { type FormDetailsQueryOptions } from "../form-common"
import { useQueryFormByApplicationId } from "../form-common/useQueryFormByApplicationId.ts"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2.ts"

export const useQueryGetKybForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<KYBInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_KYB_FORM],
    enabled,
    path: API_PATH.application.kybForm
  })

export const useQueryGetKybFormV2 = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<FormV2Data>({
    applicationId,
    queryKey: [QUERY_KEY.GET_KYB_FORM_V2],
    enabled,
    path: API_PATH.application.formV2.kyb.get
  })
