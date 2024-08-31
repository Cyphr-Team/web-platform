export const enum INPUT_GROUP {
  APPLICATION = "APPLICATION",
  REVIEW_AND_SIGN = "REVIEW AND SIGN",
  DOCUMENTATION = "DOCUMENTATION"
}

export const enum STEP {
  // INPUT_GROUP.APPLICATION
  LOAN_REQUEST = "Loan Request",
  BUSINESS_INFORMATION = "Business Information",
  BUSINESS_PLAN = "Business Plan",
  CASH_FLOW_VERIFICATION = "Cash Flow Verification",

  // INPUT_GROUP.DOCUMENTATION
  BUSINESS_EIN_LETTER = "Business EIN Letter",
  CERTIFICATE_OF_GOOD_STANDING = "Certificate of Good Standing",
  FICTITIOUS_NAME_CERTIFICATION = "Fictitious Name Certification",
  ARTICLES_OF_ORGANIZATION = "Articles of Organization and Operating Agreement",
  BY_LAWS = "By laws",

  // INPUT_GROUP.REVIEW_AND_SIGN
  REVIEW_APPLICATION = "Review Application",
  REVIEW_AND_SUBMIT = "Sign and Submit"
}

export type Progress = {
  [key in STEP]: StepStatus
}

export type StepStatus = {
  isFinish: boolean
  group: INPUT_GROUP
}

export const YES_NO_OPTIONS = [
  {
    label: "Yes",
    value: "YES"
  },
  {
    label: "No",
    value: "NO"
  }
]

export const ACCEPTED_FILE_TYPES = ["application/pdf"]
