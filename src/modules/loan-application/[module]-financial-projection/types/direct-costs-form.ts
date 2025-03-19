import { type DirectCostsFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/direct-costs-store"

export type DirectCostsForm = DirectCostsFormValue["directCosts"][number]

export type DirectCosts = DirectCostsForm & {
  id: string
  financialProjectionSetupId: string
}

export interface DirectCostsFormMutateRequest {
  financialProjectionSetupId: string | undefined
  forms: DirectCostsFormValue["directCosts"]
}

export interface DirectCostsFormResponse {
  financialProjectionSetupId: string | undefined
  forms: DirectCostsFormValue["directCosts"]
}
