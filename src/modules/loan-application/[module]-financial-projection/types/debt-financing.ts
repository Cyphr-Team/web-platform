import {
  type DebtFinancingField,
  type DebtFinancingFormItemValue,
  type DebtFinancingFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"

interface IdType {
  id: string
  financialProjectionSetupId: string
}

/**
 * Debt Financing Array
 */
export type DebtFinancingCommonForm = Pick<
  DebtFinancingFormValue,
  | DebtFinancingField.StartingPaidInCapital
  | DebtFinancingField.PayableDays
  | DebtFinancingField.HasOutstandingLoans
>

export type DebtFinancingForm = DebtFinancingFormItemValue

export type DebtFinancing = DebtFinancingForm & IdType

export type DebtFinancingCommon = DebtFinancingCommonForm & IdType

export interface DebtFinancingMutateRequest {
  financialProjectionSetupId: string | undefined
  startingPaidInCapital: number
  forms: DebtFinancingFormItemValue[]
}

export interface DebtFinancingResponse {
  financialProjectionSetupId: string
  commonForm: Omit<DebtFinancingCommon, "hasOutstandingLoans">
  loanForms: DebtFinancing[]
}

/**
 * Debt Financing Liability (Accounts Payable)
 */
export type DebtFinancingLiabilityForm = Pick<
  DebtFinancingFormValue,
  DebtFinancingField.PayableDays
>

export type DebtFinancingLiability = DebtFinancingLiabilityForm & IdType

export interface DebtFinancingLiabilityMutateRequest {
  financialProjectionSetupId: string | undefined
  payableDays: string
}

export type DebtFinancingLiabilityResponse = DebtFinancingLiability
