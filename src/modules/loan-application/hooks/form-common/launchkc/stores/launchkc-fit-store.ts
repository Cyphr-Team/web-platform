import {
  launchKcFitFormSchema,
  type LaunchKCFitFormValue
} from "@/modules/loan-application/constants/form"
import { adaptFormV2Metadata } from "@/modules/loan-application/services/formv2.services"
import { type FormV2DataResponse } from "@/modules/loan-application/types/form.v2"
import { get } from "lodash"

export function serializeLoanLaunchKCFitFormV2(
  launchKCFitForm?: LaunchKCFitFormValue
): Record<string, unknown> {
  return {
    id: launchKCFitForm?.id,
    loanApplicationId: launchKCFitForm?.loanApplicationId,
    applied: launchKCFitForm?.applied,
    businessLocation: launchKCFitForm?.businessLocation,
    equityInclusion: launchKCFitForm?.equityInclusion,
    referralSource: launchKCFitForm?.referralSource,
    founderTies: launchKCFitForm?.founderTies,
    locationChoiceReason: launchKCFitForm?.locationChoiceReason,
    impact: launchKCFitForm?.impact,
    progress: launchKCFitForm?.progress
  }
}

export function deserializeLoanLaunchKCFitFormV2(
  response?: FormV2DataResponse
): LaunchKCFitFormValue {
  return adaptFormV2Metadata<LaunchKCFitFormValue>({
    schema: launchKcFitFormSchema,
    metadata: get(response, "forms[0].metadata", {}),
    additionalFields: {
      id: get(response, "forms[0].id", ""),
      loanApplicationId: response?.applicationId
    }
  })
}
