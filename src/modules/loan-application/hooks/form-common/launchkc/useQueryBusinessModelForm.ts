import { QUERY_KEY } from "@/modules/loan-application/constants/query-key"
import { type FormDetailsQueryOptions } from "@/modules/loan-application/hooks/form-common"
import { useQueryCommonForm } from "@/modules/loan-application/hooks/form-common/useQueryCommonFormV2"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type"

export const useQueryBusinessModelForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryCommonForm({
    applicationId,
    queryKey: QUERY_KEY.GET_BUSINESS_MODEL_FORM,
    formTypes: [FORM_TYPE.BUSINESS_MODEL],
    enabled: !!enabled
  })
