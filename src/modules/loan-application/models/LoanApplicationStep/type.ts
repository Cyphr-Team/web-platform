enum FORM_TYPE {
  KYB = "kyb",
  KYC = "kyc",
  FINANCIAL = "financial",
  CASH_FLOW = "cash_flow",
  IDENTITY_VERIFICATION = "identity_verification",
  REVIEW_APPLICATION = "review_application",
  CURRENT_LOAN = "current_loan",
  OPERATING_EXPENSES = "operating_expenses",
  PRODUCT_SERVICE = "product_service",
  MARKET_OPPORTUNITY = "market_opportunity",
  BUSINESS_MODEL = "business_model",
  EXECUTION = "execution",
  DOCUMENT_UPLOADS = "document_uploads",
  LAUNCH_KC_FIT = "launch_kc_fit",
  PRE_QUALIFICATION = "pre_qualification"
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
  E_SIGN = "eSignForm",
  IDENTITY_VERIFICATION = "identityVerificationForm",
  REVIEW_APPLICATION = "reviewApplication",
  PRODUCT_SERVICE = "productServiceForm",
  MARKET_OPPORTUNITY = "marketOpportunityForm",
  BUSINESS_MODEL = "businessModelForm",
  EXECUTION = "executionForm",
  DOCUMENT_UPLOADS = "documentUploadForm",
  LAUNCH_KC_FIT = "launchKcFitForm",
  PRE_QUALIFICATION = "preQualification"
}

enum STEP_MENU {
  PRE_QUALIFICATION = "PRE-QUALIFICATION",
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
