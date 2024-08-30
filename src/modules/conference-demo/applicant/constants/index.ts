export const enum INPUT_GROUP {
  APPLICATION = "APPLICATION",
  REVIEW_AND_SIGN = "REVIEW AND SIGN",
  DOCUMENTATION = "DOCUMENTATION"
}

export const GROUPED_STEP_ITEM = {
  [INPUT_GROUP.APPLICATION]: [
    "Loan Request",
    "Business Information",
    "Business Plan",
    "Cash Flow Verification"
  ],
  [INPUT_GROUP.DOCUMENTATION]: [
    "Business EIN Letter",
    "Certificate of Good Standing",
    "Fictitious Name Certification",
    "Articles of Organization and Operating Agreement",
    "By laws"
  ],
  [INPUT_GROUP.REVIEW_AND_SIGN]: ["Review Application", "Sign and Submit"]
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

export const getStepFromLabel = (label: string): STEP => {
  const mapped: { [key: string]: STEP } = {
    "Loan Request": STEP.LOAN_REQUEST,
    "Business Information": STEP.BUSINESS_INFORMATION,
    "Business Plan": STEP.BUSINESS_PLAN,
    "Cash Flow Verification": STEP.CASH_FLOW_VERIFICATION,
    //
    "Business EIN Letter": STEP.BUSINESS_EIN_LETTER,
    "Certificate of Good Standing": STEP.CERTIFICATE_OF_GOOD_STANDING,
    "Fictitious Name Certification": STEP.FICTITIOUS_NAME_CERTIFICATION,
    "Articles of Organization and Operating Agreement":
      STEP.ARTICLES_OF_ORGANIZATION,
    "By laws": STEP.BY_LAWS,
    //
    "Review Application": STEP.REVIEW_APPLICATION,
    "Sign and Submit": STEP.REVIEW_AND_SUBMIT
  }
  return mapped[label]
}

export interface Progress extends Record<string, StepStatus> {
  [STEP.LOAN_REQUEST]: StepStatus
  [STEP.BUSINESS_INFORMATION]: StepStatus
  [STEP.BUSINESS_PLAN]: StepStatus
  [STEP.CASH_FLOW_VERIFICATION]: StepStatus
  //
  [STEP.BUSINESS_EIN_LETTER]: StepStatus
  [STEP.CERTIFICATE_OF_GOOD_STANDING]: StepStatus
  [STEP.FICTITIOUS_NAME_CERTIFICATION]: StepStatus
  [STEP.ARTICLES_OF_ORGANIZATION]: StepStatus
  [STEP.BY_LAWS]: StepStatus
  //
  [STEP.REVIEW_APPLICATION]: StepStatus
  [STEP.REVIEW_AND_SUBMIT]: StepStatus
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
