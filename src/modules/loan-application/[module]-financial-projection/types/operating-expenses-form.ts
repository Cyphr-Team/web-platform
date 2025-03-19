import { type FpOperatingExpensesFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-operating-expenses-store"

export type FpOperatingExpensesForm =
  FpOperatingExpensesFormValue["operatingExpenses"][number]

export type FpOperatingExpenses = FpOperatingExpensesForm & {
  id: string
  financialProjectionSetupId: string
}

export interface FpOperatingExpensesFormMutateRequest {
  financialProjectionSetupId: string | undefined
  forms: FpOperatingExpensesFormValue["operatingExpenses"]
}

export interface FpOperatingExpensesFormResponse {
  financialProjectionSetupId: string | undefined
  forms: FpOperatingExpensesFormValue["operatingExpenses"]
}
