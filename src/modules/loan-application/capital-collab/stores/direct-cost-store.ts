import { createDateSchema, createNumberSchema } from "@/constants/validate"
import { DirectCostsField } from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"
import {
  adaptFormV2Metadata,
  safeCastingToFloatType
} from "@/modules/loan-application/services/formv2.services"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import * as z from "zod"
import { get } from "lodash"

export const capitalCollabDirectCostsFormSchema = z.object({
  id: z.string().optional(),
  [DirectCostsField.applicationId]: z.string().optional(),
  [DirectCostsField.directCosts]: z.array(
    z
      .object({
        directCostName: z.string().min(1),
        directCostDescription: z.string().min(1),
        startDate: createDateSchema(),
        overallRevenue: createNumberSchema({
          min: 1,
          max: 100,
          coerce: true
        }).optional()
      })
      .refine((obj) => obj.overallRevenue !== undefined)
  )
})

export type CapitalCollabDirectCostsFormValue = z.infer<
  typeof capitalCollabDirectCostsFormSchema
>

export const DIRECT_COSTS_DEFAULT_VALUE: CapitalCollabDirectCostsFormValue = {
  [DirectCostsField.directCosts]: []
}

export function serializeDirectCostsFormV2(
  response?: CapitalCollabDirectCostsFormValue
): Record<string, unknown> {
  return {
    [DirectCostsField.directCosts]: response?.directCosts?.map(
      (directCost) => ({
        directCostName: directCost.directCostName,
        directCostDescription: directCost.directCostDescription,
        startDate: directCost.startDate,
        overallRevenue: safeCastingToFloatType(directCost?.overallRevenue)
      })
    )
  }
}

export function deserializeDirectCostsFormV2(
  response?: FormV2Data
): CapitalCollabDirectCostsFormValue {
  return adaptFormV2Metadata<CapitalCollabDirectCostsFormValue>({
    schema: capitalCollabDirectCostsFormSchema,
    metadata: get(response, "metadata", {}),
    additionalFields: {
      id: get(response, "id", ""),
      [DirectCostsField.applicationId]: response?.applicationId
    }
  })
}
