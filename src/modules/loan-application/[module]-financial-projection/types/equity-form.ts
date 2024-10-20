import { type FpEquityFinancingFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-equity-store"

export type FpEquityFinancingForm =
  FpEquityFinancingFormValue["equityFinancing"][number]

export type FpEquityFinancing = FpEquityFinancingForm & {
  id: string
  financialProjectionSetupId: string
}

export interface FpEquityFinancingFormMutateRequest {
  financialProjectionSetupId: string | undefined
  forms: FpEquityFinancingFormValue["equityFinancing"]
}

export interface FpEquityFinancingFormResponse {
  financialProjectionSetupId: string | undefined
  forms: FpEquityFinancingFormValue["equityFinancing"]
}
