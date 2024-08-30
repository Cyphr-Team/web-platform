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
  [INPUT_GROUP.DOCUMENTATION]: [],
  [INPUT_GROUP.REVIEW_AND_SIGN]: ["Review Application", "Sign and Submit"]
}

export const enum STEP {
  // INPUT_GROUP.APPLICATION
  LOAN_REQUEST = "Loan Request",
  BUSINESS_INFORMATION = "Business Information",
  BUSINESS_PLAN = "Business Plan",
  CASH_FLOW_VERIFICATION = "Cash Flow Verification",

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
