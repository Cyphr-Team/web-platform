import {
  businessModelFormSchema,
  type BusinessModelFormValue
} from "@/modules/loan-application/constants/form"
import { adaptFormV2Metadata } from "@/modules/loan-application/services/formv2.services"
import { type FormV2DataResponse } from "@/modules/loan-application/types/form.v2"
import { get } from "lodash"

export function serializeLoanBusinessModelFormV2(
  businessModelForm?: BusinessModelFormValue
): Record<string, unknown> {
  return {
    id: businessModelForm?.id,
    loanApplicationId: businessModelForm?.loanApplicationId,
    description: businessModelForm?.description,
    totalRevenueRange: businessModelForm?.totalRevenueRange,
    lastMonthRevenueRange: businessModelForm?.lastMonthRevenueRange,
    lastYearRevenueRange: businessModelForm?.lastYearRevenueRange,
    annualPayroll: businessModelForm?.annualPayroll,
    scalePlan: businessModelForm?.scalePlan
  }
}

export function deserializeLoanBusinessModelFormV2(
  response?: FormV2DataResponse
): BusinessModelFormValue {
  return adaptFormV2Metadata<BusinessModelFormValue>({
    schema: businessModelFormSchema,
    metadata: get(response, "forms[0].metadata", {}),
    additionalFields: {
      id: get(response, "forms[0].id", ""),
      loanApplicationId: response?.applicationId
    }
  })
}
