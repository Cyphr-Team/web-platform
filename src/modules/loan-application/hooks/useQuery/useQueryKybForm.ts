import { KYBInformationResponse } from "../../constants/type"
import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { FormDetailsQueryProps } from "."
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"

export const useQueryGetKybForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<KYBInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_KYB_FORM],
    enabled,
    path: API_PATH.application.kybForm
  })
