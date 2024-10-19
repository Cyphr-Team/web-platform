import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { type KYCInformationResponse } from "../../constants/type"
import { type FormDetailsQueryProps } from "."
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"

export const useQueryGetKycForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<KYCInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_KYC_FORM],
    enabled,
    path: API_PATH.application.kycForm
  })
