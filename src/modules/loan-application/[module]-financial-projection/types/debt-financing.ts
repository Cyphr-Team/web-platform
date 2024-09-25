import {
  DebtFinancingField,
  DebtFinancingFormItemValue,
  DebtFinancingFormValue
} from "@/modules/loan-application/[module]-financial-projection/components/store/fp-debt-financing"

type IdType = {
  id: string
  financialProjectionSetupId: string
}

/**
 * Debt Financing Array
 */
export type DebtFinancingCommonForm = Pick<
  DebtFinancingFormValue,
  | DebtFinancingField.STARTING_PAID_IN_CAPITAL
  | DebtFinancingField.HAS_OUTSTANDING_LOANS
>
export type DebtFinancingForm = DebtFinancingFormItemValue
export type DebtFinancing = DebtFinancingForm & IdType
export type DebtFinancingCommon = DebtFinancingCommonForm & IdType
export type DebtFinancingMutateRequest = {
  financialProjectionSetupId: string | undefined
  startingPaidInCapital: number
  forms: DebtFinancingFormItemValue[]
}
export type DebtFinancingResponse = {
  financialProjectionSetupId: string
  commonForm: Omit<DebtFinancingCommon, "hasOutstandingLoans">
  loanForms: DebtFinancing[]
}

/**
 * Debt Financing Liability (Accounts Payable)
 */
export type DebtFinancingLiabilityForm = Pick<
  DebtFinancingFormValue,
  DebtFinancingField.PAYABLE_DAYS
>
export type DebtFinancingLiability = DebtFinancingLiabilityForm & IdType
export type DebtFinancingLiabilityMutateRequest = {
  financialProjectionSetupId: string | undefined
  payableDays: string
}
export type DebtFinancingLiabilityResponse = DebtFinancingLiability
