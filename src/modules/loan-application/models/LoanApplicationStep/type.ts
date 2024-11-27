enum FORM_TYPE {
  LOAN_REQUEST = "loan_request", // Used in API request
  CONFIRMATION = "confirmationForm",
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
  LAUNCHKC_FIT = "launchkc_fit",
  PRE_QUALIFICATION = "pre_qualification",
  BUSINESS_EIN_LETTER = "business_ein_letter",
  CERTIFICATE_OF_GOOD_STANDING = "certificate_of_good_standing",
  FICTITIOUS_NAME_CERTIFICATION = "fictitious_name_certification",
  ARTICLES_OF_ORGANIZATION = "articles_of_organization_and_operating_agreement",
  BY_LAWS = "by_laws",
  //
  FORECASTING_SETUP = "forecasting_setup",
  FINANCIAL_STATEMENTS = "financial_statements",
  // ==== REVENUE AND EXPENSES ====
  REVENUE = "revenue",
  PEOPLE = "people",
  DIRECT_COSTS = "direct_cost",
  FP_OPERATING_EXPENSES = "fp_operating_expenses",
  TAX_RATES = "tax_rates",
  // ==== ASSETS AND LIABILITIES ====
  ASSETS = "assets",
  LIABILITIES = "liabilities",
  DEBT_FINANCING = "debt_financing",
  EQUITY = "equity"
}

enum LOAN_APPLICATION_STEPS {
  // TODO() : Change this step to create application
  LOAN_REQUEST = "loanRequest",
  // TODO() : Change this step to Loan Request
  LOAN_REQUEST_V2 = "loanRequestV2",
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
  LAUNCH_KC_BUSINESS_DOCUMENTS = "documentUploadForm",
  LAUNCH_KC_FIT = "launchKcFitForm",
  PRE_QUALIFICATION = "preQualification",
  BUSINESS_EIN_LETTER = "businessEINLetter",
  CERTIFICATE_GOOD_STANDING = "certificateOfGoodStanding",
  FICTITIOUS_NAME_CERTIFICATION = "fictitiousNameCertification",
  ARTICLES_OF_ORGANIZATION = "articlesOfOrganizationAndOperatingAgreement",
  BY_LAWS = "bylaws",
  DISCLAIMER_AND_DISCLOSURE = "disclaimerAndDisclosure",

  // SBB
  PRIVACY_POLICY = "privacyPolicy",
  PATRIOT_ACT = "patriotAct",
  SBB_BUSINESS_INFORMATION_PART_ONE = "sbbBusinessInformationPartOne",
  SBB_BUSINESS_INFORMATION_PART_TWO = "sbbBusinessInformationPartTwo",

  // financial projection
  // ==== FORECASTING_SETUP ====
  FORECASTING_SETUP = "forecastingSetup",
  FINANCIAL_STATEMENTS = "financialStatements",
  // ==== REVENUE AND EXPENSES ====
  REVENUE = "revenue",
  PEOPLE = "people",
  DIRECT_COSTS = "directCosts",
  FP_OPERATING_EXPENSES = "fpOperatingExpenses",
  TAX_RATES = "taxRates",
  // ==== ASSETS AND LIABILITIES ====
  ASSETS = "assets",
  DEBT_FINANCING = "debtFinancing",
  EQUITY = "equity"
}

// ENUMS FOR PLATFORM
enum STEP_MENU {
  PRE_APPLICATION = "PRE-APPLICATION DISCLOSURES",
  PRE_QUALIFICATION = "PRE-QUALIFICATION",
  APPLICATION = "APPLICATION",
  FORECASTING_SETUP = "FORECASTING SETUP",
  REVENUE_AND_EXPENSES = "REVENUE AND EXPENSES",
  ASSETS_AND_LIABILITIES = "ASSETS AND LIABILITIES",
  DOCUMENTATION = "DOCUMENTATION",
  SIGNATURE = "REVIEW AND SIGN"
}

// ENUMS OVERRIDING FOR LOAN READY
enum STEP_MENU_LOAN_READY {
  APPLICATION = "ASSESSMENTS",
  SIGNATURE = "VERIFY AND SIGN"
}

enum LOAN_APPLICATION_STEP_STATUS {
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
  CURRENT = "CURRENT"
}

export {
  STEP_MENU,
  STEP_MENU_LOAN_READY,
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS,
  FORM_TYPE
}

interface ILoanApplicationStep {
  step: LOAN_APPLICATION_STEPS
  parent: STEP_MENU | STEP_MENU_LOAN_READY
  label: string
  formType: FORM_TYPE | null
  status: LOAN_APPLICATION_STEP_STATUS
}

export type { ILoanApplicationStep }
