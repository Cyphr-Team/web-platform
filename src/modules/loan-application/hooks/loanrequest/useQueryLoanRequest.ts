import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { API_PATH } from "@/constants"
import { isEnableFormV2 } from "@/utils/feature-flag.utils"
import { QUERY_KEY } from "../../constants/query-key"
import type { FORM_TYPE } from "../../models/LoanApplicationStep/type"
import type { ILoanRequestFormValue } from "../../constants/form"
import { mapMetadataToLoanRequest } from "../../services/form.services"
import { get } from "lodash"
import { type LoanRequestV2 } from "../../constants/type"

interface LoanRequestV2Request {
  applicationId: string
  formTypes: FORM_TYPE[]
}

export interface LoanRequestV2Response {
  applicationId: string
  forms: LoanRequestV2[]
}

export const useQueryLoanRequestForm = ({
  applicationId,
  formTypes
}: {
  applicationId: string
  formTypes: FORM_TYPE[]
}) => {
  return useQuery<LoanRequestV2Response, never>({
    queryKey: [QUERY_KEY.GET_LOAN_REQUEST_FORM, applicationId],
    queryFn: async () => {
      const response = await postRequest<
        LoanRequestV2Request,
        LoanRequestV2Response
      >({
        path: API_PATH.application.formV2.loanRequest.index,
        data: {
          applicationId: applicationId ?? "",
          formTypes: formTypes
        }
      })

      return response.data
    },
    enabled: !!applicationId && isEnableFormV2()
  })
}

export const reverseFormatLoanRequestFormV2 = (
  loanRequestFormValue?: LoanRequestV2Response
): Partial<ILoanRequestFormValue> => {
  return {
    id: get(loanRequestFormValue, "forms[0].id", "") ?? "",
    applicationId: loanRequestFormValue?.applicationId ?? "",
    ...mapMetadataToLoanRequest(
      get(loanRequestFormValue, "forms[0].metadata", {})
    )
  }
}
