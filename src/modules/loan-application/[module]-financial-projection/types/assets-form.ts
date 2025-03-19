import { type AssetsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-assets-store"

export type AssetsLongTermForm = AssetsFormValue["longTermAssets"][number]

export type Assets = AssetsLongTermForm & {
  id: string
  financialProjectionSetupId: string
}

export interface AssetsLongTermFormMutateRequest {
  financialProjectionSetupId: string | undefined
  forms: AssetsFormValue["longTermAssets"]
}

export interface AssetsLongTermFormResponse {
  financialProjectionSetupId: string | undefined
  forms: AssetsFormValue["longTermAssets"]
}

export interface AssetsCurrentFormMutateRequest {
  financialProjectionSetupId: string | undefined
  receivableDays: AssetsFormValue["receivableDays"]
}

export interface AssetsCurrentFormResponse {
  financialProjectionSetupId: string | undefined
  receivableDays: AssetsFormValue["receivableDays"]
}
