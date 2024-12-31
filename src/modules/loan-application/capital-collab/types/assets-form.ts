import { type CapitalCollabAssetsFormValue } from "@/modules/loan-application/capital-collab/stores/assets-store"
import { type AssetsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"

export type AssetsLongTermForm = AssetsFormValue["longTermAssets"][number]

export type Assets = AssetsLongTermForm & {
  id: string
  financialProjectionSetupId: string
}

export interface AssetsLongTermFormMutateRequest {
  financialProjectionSetupId: string | undefined
  forms: CapitalCollabAssetsFormValue["longTermAssets"]
}

export interface AssetsLongTermFormResponse {
  financialProjectionSetupId: string | undefined
  forms: CapitalCollabAssetsFormValue["longTermAssets"]
}

export interface AssetsCurrentFormMutateRequest {
  financialProjectionSetupId: string | undefined
  receivableDays: CapitalCollabAssetsFormValue["receivableDays"]
}

export interface AssetsCurrentFormResponse {
  financialProjectionSetupId: string | undefined
  receivableDays: CapitalCollabAssetsFormValue["receivableDays"]
}
