import { QUERY_KEY } from "@/modules/loan-application/constants/query-key.ts"
import { type FormDetailsQueryOptions } from "@/modules/loan-application/hooks/form-common"
import { useQueryCommonForm } from "@/modules/loan-application/hooks/form-common/useQueryCommonFormV2.ts"
import { FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import type { FormV2DataResponse } from "@/modules/loan-application/types/form.v2.ts"
import {
  adaptFormV2Metadata,
  preFormatCurrentLoanForm
} from "@/modules/loan-application/services/formv2.services.ts"
import {
  currentLoansFormSchema,
  type ICurrentLoanFormValue
} from "@/modules/loan-application/constants/form.ts"
import { get } from "lodash"

export function deserializeLoanCurrentLoansFormV2(
  response?: FormV2DataResponse
): ICurrentLoanFormValue {
  const metadata = get(response, "forms[0].metadata", {})

  return adaptFormV2Metadata<ICurrentLoanFormValue>({
    schema: currentLoansFormSchema,
    metadata: metadata,
    preFormat: () =>
      preFormatCurrentLoanForm(
        metadata,
        response?.applicationId,
        get(response, "forms[0].id", "")
      ),
    additionalFields: {
      id: get(response, "forms[0].id", ""),
      loanApplicationId: response?.applicationId ?? ""
    }
  })
}

export interface QueryCurrentLoansFormV2Response {
  formId: string
  currentLoans: {
    id: string
    loanApplicationId: string
    lenderName: string
    loanType: string
    outstandingLoanBalance: number
    monthlyPaymentAmount: number
    loanTermRemainingInMonths: number
    annualInterestRate: number
  }[]
}

export const useQueryCurrentLoansForm = ({
  applicationId,
  enabled
}: FormDetailsQueryOptions) =>
  useQueryCommonForm({
    applicationId,
    queryKey: QUERY_KEY.GET_CURRENT_LOANS_FORM_V2,
    formTypes: [FORM_TYPE.CURRENT_LOAN],
    enabled: !!enabled
  })
