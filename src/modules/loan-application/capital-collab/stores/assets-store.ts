import * as z from "zod"
import { createDateSchema } from "@/constants/validate"
import { AssetsField } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"
import { get } from "lodash"
import { type FormV2Data } from "@/modules/loan-application/types/form.v2"
import { adaptFormV2Metadata } from "@/modules/loan-application/services/formv2.services"

export type CapitalCollabAssetsFormValue = z.infer<
  typeof capitalCollabAssetsFormSchema
>

export const capitalCollabAssetsFormSchema = z.object({
  id: z.string().optional(),
  [AssetsField.APPLICATION_ID]: z.string().optional(),
  [AssetsField.RECEIVABLE_DAYS]: z.string().optional(),
  [AssetsField.LONG_TERM_ASSETS]: z
    .array(
      z.object({
        name: z.string().min(1, "This field is required"),
        purchaseDate: createDateSchema(),
        cost: z.coerce.number().min(1, "This field is required"),
        usefulLife: z.string().min(1, "This field is required")
      })
    )
    .optional()
})

export const FP_ASSETS_DEFAULT_VALUE = {
  [AssetsField.APPLICATION_ID]: "",
  [AssetsField.RECEIVABLE_DAYS]: "",
  [AssetsField.LONG_TERM_ASSETS]: []
}

export function serializeAssetsFormV2(
  assetsData?: CapitalCollabAssetsFormValue
): Record<string, unknown> {
  return {
    receivableDays: assetsData?.receivableDays,
    longTermAssets: assetsData?.longTermAssets
  }
}

export function deserializeAssetsFormV2(
  response?: FormV2Data
): CapitalCollabAssetsFormValue {
  return adaptFormV2Metadata<CapitalCollabAssetsFormValue>({
    schema: capitalCollabAssetsFormSchema,
    metadata: get(response, "metadata", {}),
    additionalFields: {
      id: get(response, "id", ""),
      [AssetsField.APPLICATION_ID]: response?.applicationId
    }
  })
}
