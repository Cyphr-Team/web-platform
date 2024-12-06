import { API_PATH } from "@/constants"
import { QUERY_KEY } from "../../constants/query-key"
import { type KYCInformationResponse } from "../../constants/type"
import { type FormDetailsQueryProps } from "."
import { useQueryFormByApplicationId } from "./useQueryFormByApplicationId"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2.ts"

export const useQueryKycForm = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<KYCInformationResponse>({
    applicationId,
    queryKey: [QUERY_KEY.GET_KYC_FORM],
    enabled,
    path: API_PATH.application.kycForm
  })

export const useQueryKycFormV2 = ({
  applicationId,
  enabled
}: FormDetailsQueryProps) =>
  useQueryFormByApplicationId<FormV2Data>({
    applicationId,
    queryKey: [QUERY_KEY.GET_KYC_FORM_V2],
    enabled,
    path: API_PATH.application.formV2.kyc.get
  })
