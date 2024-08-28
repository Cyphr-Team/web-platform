enum FORM_TYPE {
  LOAN_REQUEST = "loanRequest",
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
  LAUNCH_KC_FIT = "launch_kc_fit",
  PRE_QUALIFICATION = "pre_qualification",
  BUSINESS_EIN_LETTER = "business_ein_letter",
  CERTIFICATE_OF_GOOD_STANDING = "certificate_of_good_standing",
  FICTITIOUS_NAME_CERTIFICATION = "fictitious_name_certification",
  ARTICLES_OF_ORGANIZATION = "articles_of_organization_and_operating_agreement",
  BY_LAWS = "by_laws"
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
  LAUNCH_KC_BUSINESS_DOCUMENTS = "documentUploadForm",
  LAUNCH_KC_FIT = "launchKcFitForm",
  PRE_QUALIFICATION = "preQualification",
  BUSINESS_EIN_LETTER = "businessEINLetter",
  CERTIFICATE_GOOD_STANDING = "certificateOfGoodStanding",
  FICTITIOUS_NAME_CERTIFICATION = "fictitiousNameCertification",
  ARTICLES_OF_ORGANIZATION = "articlesOfOrganizationAndOperatingAgreement",
  BY_LAWS = "bylaws",

  // SBB
  PRIVACY_POLICY = "privacyPolicy",
  PATRIOT_ACT = "patriotAct",
  SBB_BUSINESS_INFORMATION_PART_ONE = "sbbBusinessInformationPartOne",
  SBB_BUSINESS_INFORMATION_PART_TWO = "sbbBusinessInformationPartTwo"
}

enum STEP_MENU {
  PRE_APPLICATION = "PRE-APPLICATION DISCLOSURES",
  PRE_QUALIFICATION = "PRE-QUALIFICATION",
  APPLICATION = "APPLICATION",
  DOCUMENTATION = "DOCUMENTATION",
  SIGNATURE = "REVIEW AND SIGN"
}

enum LOAN_APPLICATION_STEP_STATUS {
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
  CURRENT = "CURRENT"
}

export {
  STEP_MENU,
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS,
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
