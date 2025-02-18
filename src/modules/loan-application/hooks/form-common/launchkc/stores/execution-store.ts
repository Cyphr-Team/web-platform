import {
  executionFormSchema,
  type ExecutionFormValue
} from "@/modules/loan-application/constants/form"
import { adaptFormV2Metadata } from "@/modules/loan-application/services/formv2.services"
import {
  type NoobRecord,
  type FormV2DataResponse
} from "@/modules/loan-application/types/form.v2"
import { get } from "lodash"

export function serializeLoanExecutionFormV2(
  executionFormData?: ExecutionFormValue
): Record<string, unknown> {
  return {
    id: executionFormData?.id,
    loanApplicationId: executionFormData?.loanApplicationId,
    monthlyExpenseRange: executionFormData?.monthlyExpenseRange,
    growthMetric: executionFormData?.growthMetric,
    recentMilestone: executionFormData?.recentMilestone,
    nextMilestone: executionFormData?.nextMilestone,
    greatestChallenge: executionFormData?.greatestChallenge,
    businessStage: executionFormData?.businessStage,
    businessModels: executionFormData?.businessModels.map((businessModel) => ({
      businessModel: businessModel,
      otherMessage: executionFormData?.businessModelsOtherText
    })),
    partnershipTypes: executionFormData?.partnershipTypes,
    fundingSources: executionFormData?.fundingSources.map((fundingSource) => ({
      ...fundingSource,
      amount: parseInt(fundingSource.amount)
    })),
    founders: executionFormData?.founders
  }
}

export function deserializeLoanExecutionFormV2(
  response?: FormV2DataResponse
): ExecutionFormValue {
  const metadata = response?.forms[0]?.metadata

  const mapToExecutionFormZodSchema = (metadata: NoobRecord) => ({
    ...metadata,
    businessModels: metadata?.businessModels?.map(
      (businessModel: { businessModel: string }) =>
        businessModel?.businessModel ?? ""
    ),
    businessModelsOtherText: metadata?.businessModels[0]?.otherMessage ?? "",
    fundingSources: metadata?.fundingSources?.map(
      (fundingSource: { amount: number }) => ({
        ...fundingSource,
        amount: fundingSource?.amount.toString() ?? ""
      })
    )
  })

  return adaptFormV2Metadata<ExecutionFormValue>({
    schema: executionFormSchema,
    metadata: metadata ? mapToExecutionFormZodSchema(metadata) : {},
    additionalFields: {
      id: get(response, "forms[0].id", ""),
      loanApplicationId: response?.applicationId
    }
  })
}
