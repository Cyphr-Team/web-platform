import { createDateSchema, createNumberSchema } from "@/constants/validate"
import { FpOperatingExpensesField } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"
import { adaptFormV2Metadata } from "@/modules/loan-application/services/formv2.services"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import * as z from "zod"
import { get } from "lodash"

export const capitalCollabOperatingExpensesFormSchema = z.object({
  id: z.string().optional(),
  [FpOperatingExpensesField.applicationId]: z.string().optional(),
  [FpOperatingExpensesField.operatingExpenses]: z.array(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      startDate: createDateSchema(),
      monthlyCost: createNumberSchema({ min: 1 })
    })
  )
})

export const FP_OPERATING_EXPENSES_DEFAULT_VALUE = {
  [FpOperatingExpensesField.operatingExpenses]: []
}

export type CapitalCollabOperatingExpensesFormValue = z.infer<
  typeof capitalCollabOperatingExpensesFormSchema
>

export function serializeOperatingExpensesFormV2(
  operatingExpensesData?: CapitalCollabOperatingExpensesFormValue
): Record<string, unknown> {
  return {
    operatingExpenses: operatingExpensesData?.operatingExpenses
  }
}

export function deserializeOperatingExpensesFormV2(
  response?: FormV2Data
): CapitalCollabOperatingExpensesFormValue {
  return adaptFormV2Metadata<CapitalCollabOperatingExpensesFormValue>({
    schema: capitalCollabOperatingExpensesFormSchema,
    metadata: get(response, "metadata", {}),
    additionalFields: {
      id: get(response, "id", ""),
      [FpOperatingExpensesField.applicationId]: response?.applicationId
    }
  })
}
