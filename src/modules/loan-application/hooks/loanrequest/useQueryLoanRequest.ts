import { postRequest } from "@/services/client.service"
import { useQuery } from "@tanstack/react-query"
import { API_PATH } from "@/constants"
import { isEnableFormV2 } from "@/utils/feature-flag.utils"
import { QUERY_KEY } from "../../constants/query-key"
import type { LoanRequestV2Response } from "../../constants/type"
import type { FORM_TYPE } from "../../models/LoanApplicationStep/type"
import type { ILoanRequestFormValue } from "../../constants/form"
import { mapMetadataToLoanRequest } from "../../services/form.services"

export const useQueryLoanRequestForm = ({
  applicationId,
  formTypes
}: {
  applicationId: string
  formTypes: FORM_TYPE[]
}) => {
  return useQuery<LoanRequestV2Response>({
    queryKey: [QUERY_KEY.GET_LOAN_REQUEST_FORM, applicationId],
    queryFn: async () => {
      const response = await postRequest<unknown, LoanRequestV2Response>({
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
): ILoanRequestFormValue => {
  return {
    id: loanRequestFormValue?.forms[0].id ?? "",
    applicationId: loanRequestFormValue?.applicationId ?? "",
    ...mapMetadataToLoanRequest(loanRequestFormValue?.forms[0]?.metadata)
  }
}
