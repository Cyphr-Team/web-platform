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
    status: LOAN_APPLICATION_STEP_STATUS.COMPLETE,
    step: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION
  },
  {
    title: "Owner Information",
    content: "Enter business owner information",
    status: LOAN_APPLICATION_STEP_STATUS.COMPLETE,
    step: LOAN_APPLICATION_STEPS.OWNER_INFORMATION
  },
  {
    title: "Financial Information",
    content: "Report your income and cash flow",
    status: LOAN_APPLICATION_STEP_STATUS.COMPLETE,
    step: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION
  },
  {
    title: "Confirmation",
    content: "Submit to verify your information",
    status: LOAN_APPLICATION_STEP_STATUS.CURRENT,
    step: LOAN_APPLICATION_STEPS.CONFIRMATION
  }
]

export const CONFIRMATION_TEXTS = [
  {
    title: "I understand",
    content: `that the submission of an application for financing with AltCap does not mean that AltCap will finance or provide any financial services whatsoever. I further understand that approval to finance will come only after all supporting forms have been signed and approved by AltCap.`
  },
  {
    title: "I certify",
    content: `the accuracy of the information provided and understand that AltCap will be relying on the accuracy of this information when evaluating the company’s application. By submitting this application either by mail, fax, or electronically, the company and the guarantor(s) signing on the Company’s behalf below, each authorize AltCap to request all credit reports to verify the validity and accuracy of all information contained herein as well as the reporting to credit agencies. I consent to AltCap’s filing of one or more Initial Financing Statements against me or the undersigned company in any or all Uniform Commercial Code jurisdictions, which reflect the collateral as “all assets.”`
  },
  {
    title: "I understand",
    content: `that my signature below authorizes AltCap to discuss my loan application and documentation with AltCap partners to better serve me.`
  },
  {
    title: "I understand",
    content: `that my signature below authorizes AltCap to run an OFAC (Office of Foreign Assets Control) search in order to comply with the Department of Treasury`
  }
]
