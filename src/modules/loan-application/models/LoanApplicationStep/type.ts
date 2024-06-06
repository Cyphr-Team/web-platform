enum FORM_TYPE {
  KYB = "KYB",
  KYC = "KYC",
  FINANCIAL = "FINANCIAL",
  CURRENT_LOANS = "CURRENT_LOANS",
  OPERATING_EXPENSES = "OPERATING_EXPENSES"
}

enum LOAN_APPLICATION_STEPS {
  LOAN_REQUEST = "loanRequest",
  BUSINESS_INFORMATION = "businessInformation",
  OWNER_INFORMATION = "ownerInformationForm",
  FINANCIAL_INFORMATION = "financialInformationForm",
  CASH_FLOW_VERIFICATION = "cashFlowVerification",
  CURRENT_LOANS = "currentLoansForm",
  OPERATING_EXPENSES = "operatingExpensesForm",
  CONFIRMATION = "confirmationForm",
  IDENTITY_VERIFICATION = "identityVerificationForm",
  REVIEW_APPLICATION = "reviewApplication"
}

enum STEP_MENU {
  APPLICATION = "APPLICATION",
  SIGNATURE = "VERIFY AND SIGN"
}

enum LOAN_APPLICATION_STEP_STATUS {
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
  CURRENT = "CURRENT"
}

export {
  STEP_MENU,
  LOAN_APPLICATION_STEPS,
  LOAN_APPLICATION_STEP_STATUS,
  FORM_TYPE
}

interface ILoanApplicationStep {
  step: LOAN_APPLICATION_STEPS
  parent: STEP_MENU
  label: string
  formType: FORM_TYPE | null
  status: LOAN_APPLICATION_STEP_STATUS
}

export type { ILoanApplicationStep }
