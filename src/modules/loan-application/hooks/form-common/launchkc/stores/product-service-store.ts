import {
  productServiceFormSchema,
  type ProductServiceFormValue
} from "@/modules/loan-application/constants/form"
import { adaptFormV2Metadata } from "@/modules/loan-application/services/formv2.services"
import { type FormV2DataResponse } from "@/modules/loan-application/types/form.v2"
import { get } from "lodash"

export function serializeLoanProductServiceFormV2(
  serviceFormData?: ProductServiceFormValue
): Record<string, unknown> {
  return {
    id: serviceFormData?.id,
    loanApplicationId: serviceFormData?.loanApplicationId,
    businessType: serviceFormData?.businessType,
    solutionFocus: serviceFormData?.solutionFocus,
    businessValue: serviceFormData?.businessValue,
    proofOfMarket: serviceFormData?.proofOfMarket,
    intellectualProperty: serviceFormData?.intellectualProperty
  }
}

export function deserializeLoanProductServiceFormV2(
  response?: FormV2DataResponse
): ProductServiceFormValue {
  return adaptFormV2Metadata<ProductServiceFormValue>({
    schema: productServiceFormSchema,
    metadata: get(response, "forms[0].metadata", {}),
    additionalFields: {
      id: get(response, "forms[0].id", ""),
      loanApplicationId: response?.applicationId
    }
  })
}
