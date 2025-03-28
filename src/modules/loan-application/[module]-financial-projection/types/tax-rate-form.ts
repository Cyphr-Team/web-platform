import { type ExpenseTaxRateFormValue } from "@/modules/loan-application/[module]-financial-projection/components/store/fp-expense-tax-rate-store"

export interface ExpenseTaxRateFormMutateRequest {
  financialProjectionSetupId: string | undefined
  incomeTaxRate: ExpenseTaxRateFormValue["incomeTaxRate"]
}

export interface ExpenseTaxRateFormResponse {
  financialProjectionSetupId: string | undefined
  incomeTaxRate: ExpenseTaxRateFormValue["incomeTaxRate"]
}
