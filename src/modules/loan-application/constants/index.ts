import { Icons } from "@/components/ui/icons"
import { NavItem } from "@/types"
import { APP_PATH } from "@/constants"

export const navItems: NavItem[] = [
  {
    title: "Onboarding",
    href: APP_PATH.LOAN_APPLICATION.INDEX,
    icon: Icons.route,
    label: "Onboarding"
  }
]

export const TEXTS = {
  title: "ARTCap Express Loan Application",
  supportingText: `Submit the following form if you are an artist or creative seeking $1,000 - $10,000 in business financing and you live in either Missouri, Kansas, or Texas. \n
  If you do not meet these requirements and you are still interested in acquiring a loan, please contact info@altcap.org or call (833) 549-2890.\n
  The information you provide in this application will be reviewed by our lending team and held strictly confidential.`,
  buttonText: `Start Application Process`
}

export type ProgressType = {
  title: string
  content: string
  status: LOAN_APPLICATION_STEP_STATUS
  step: LOAN_APPLICATION_STEPS
}

export enum LOAN_APPLICATION_STEPS {
  BUSINESS_INFORMATION = 1,
  OWNER_INFORMATION = 2,
  FINANCIAL_INFORMATION = 3,
  CONFIRMATION = 4
}

export enum LOAN_APPLICATION_STEP_STATUS {
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
  CURRENT = "CURRENT"
}

export const STEPS: ProgressType[] = [
  {
    title: "Business Information",
    content: "Enter your business information",
    status: LOAN_APPLICATION_STEP_STATUS.CURRENT,
    step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
  },
  {
    title: "Owner Information",
    content: "Enter business owner information",
    status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE,
    step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION
  },
  {
    title: "Financial Information",
    content: "Report your income and cash flow",
    status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE,
    step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION
  },
  {
    title: "Confirmation",
    content: "Submit to verify your information",
    status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE,
    step: LOAN_APPLICATION_STEPS.CONFIRMATION
  }
]
