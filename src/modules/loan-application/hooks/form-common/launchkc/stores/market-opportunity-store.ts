import {
  marketOpportunityFormSchema,
  type MarketOpportunityFormValue
} from "@/modules/loan-application/constants/form"
import { adaptFormV2Metadata } from "@/modules/loan-application/services/formv2.services"
import { type FormV2DataResponse } from "@/modules/loan-application/types/form.v2"
import { get } from "lodash"

export function serializeLoanMarketOpportunityFormV2(
  marketOpportunityForm?: MarketOpportunityFormValue
): Record<string, unknown> {
  return {
    id: marketOpportunityForm?.id,
    loanApplicationId: marketOpportunityForm?.loanApplicationId,
    marketTarget: marketOpportunityForm?.marketTarget,
    potentialCustomer: marketOpportunityForm?.potentialCustomer,
    competitor: marketOpportunityForm?.competitor
  }
}

export function deserializeLoanMarketOpportunityFormV2(
  response?: FormV2DataResponse
): MarketOpportunityFormValue {
  return adaptFormV2Metadata<MarketOpportunityFormValue>({
    schema: marketOpportunityFormSchema,
    metadata: get(response, "forms[0].metadata", {}),
    additionalFields: {
      id: get(response, "forms[0].id", ""),
      loanApplicationId: response?.applicationId
    }
  })
}
