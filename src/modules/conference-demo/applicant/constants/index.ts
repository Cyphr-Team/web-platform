export const enum INPUT_GROUP {
  APPLICATION = "APPLICATION",
  REVIEW_AND_SIGN = "REVIEW AND SIGN"
}

export const GROUPED_STEP_ITEM = {
  [INPUT_GROUP.APPLICATION]: [
    "Loan Request",
    "Business Information",
    "Business Plan",
    "Cash Flow Verification"
  ],
  [INPUT_GROUP.REVIEW_AND_SIGN]: ["Review Application", "Sign and Submit"]
}

export const enum SCREEN {
  // INPUT_GROUP.APPLICATION
  LOAN_REQUEST = "Loan Request",
  BUSINESS_INFORMATION = "Business Information",
  BUSINESS_PLAN = "Business Plan",
  CASH_FLOW_VERIFICATION = "Cash Flow Verification",

  // INPUT_GROUP.REVIEW_AND_SIGN
  REVIEW_APPLICATION = "Review Application",
  REVIEW_AND_SUBMIT = "Sign and Submit"
}
