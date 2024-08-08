import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { FormDetailsQueryProps } from "."
import { LaunchKcFitFormResponse } from "../../components/organisms/loan-application-form/custom-form/launchkc/launchkc-fit/type"

export const useQueryLaunchKCFitForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<LaunchKcFitFormResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_LAUNCH_KC_FIT_FORM],
    enabled,
    path: API_PATH.application.launchKCFitForm.detail
  })
