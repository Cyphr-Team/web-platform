import { type ConfirmationFormResponse } from "../../constants/type"
import { QUERY_KEY } from "../../constants/query-key"
import { API_PATH } from "@/constants"
import { type FormDetailsQueryOptions } from "."
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"

export const useQueryGetConfirmationForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryFormByApplicationId<ConfirmationFormResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_CONFIRMATION_FORM],
    path: API_PATH.application.confirmationForm,
    enabled
  })
