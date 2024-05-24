import {
  FORM_TYPE,
  ILoanApplicationStep,
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS,
  STEP_MENU
} from "./type"

export interface ILoanApplicationStepStrategy {
  _buildSteps(): this
}

export class LoanApplicationStep {
  #steps: ILoanApplicationStep[] = []

  _build_LoanRequestStep(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
        formType: null,
        label: "Loan Request",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]

    return this
  }

  _build_BusinessInformationStep(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
        formType: FORM_TYPE.KYB,
        label: "Business Information",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]
    return this
  }

  _build_OwnerInformationStep(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
        formType: FORM_TYPE.KYC,
        label: "Individual Information",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]
    return this
  }

  _build_CashFlowVerification(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
        formType: FORM_TYPE.FINANCIAL,
        label: "Cash Flow Verification",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]

    return this
  }

  _build_FinancialInformationStep(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
        formType: FORM_TYPE.FINANCIAL,
        label: "Financial Information",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]

    return this
  }

  _build_CurrentLoansStep(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
        formType: FORM_TYPE.CURRENT_LOANS,
        label: "Current Loans",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]

    return this
  }

  _build_OpertaingExpensesStep(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.OPERATING_EXPENSES,
        formType: FORM_TYPE.OPERATING_EXPENSES,
        label: "Operating Expenses",
        parent: STEP_MENU.APPLICATION,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]

    return this
  }

  _build_ConfirmationStep(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.CONFIRMATION,
        formType: null,
        label: "Review and Sign",
        parent: STEP_MENU.SIGNATURE,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]

    return this
  }

  _build_IdentityVerificationStep(): this {
    this.#steps = [
      ...this.#steps,
      {
        step: LOAN_APPLICATION_STEPS.IDENTITY_VERIFICATION,
        formType: null,
        label: "Identity Verification",
        parent: STEP_MENU.SIGNATURE,
        status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE
      }
    ]

    return this
  }

  getSteps(): ILoanApplicationStep[] {
    return this.#steps
  }
}
