import { Icons } from "@/components/ui/icons.tsx"
import { APP_PATH } from "@/constants"

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
  ARTICLES_OF_ORGANIZATION = "Articles of Organization",
  BANK_STATEMENTS = "Bank Statements",

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

export const DASHBOARD_NAV_ITEM = [
  {
    title: "Applications",
    href: APP_PATH.CONFERENCE_DEMO.applicant.list,
    icon: Icons.folderCheck,
    label: "Applications"
  }
]

export const ACCEPTED_FILE_TYPES = ["application/pdf"]
