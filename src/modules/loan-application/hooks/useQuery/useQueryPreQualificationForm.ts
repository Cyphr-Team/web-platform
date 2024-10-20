import { type PreQualificationResponse } from "../../constants/type"
import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { type FormDetailsQueryProps } from "."

export const useQueryGetPreQualificationForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<PreQualificationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_PRE_QUALIFICATION_FORM],
    enabled,
    path: API_PATH.application.preQualification.detail
  })
