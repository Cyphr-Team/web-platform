import { Icons } from "@/components/ui/icons"
import { NavItem } from "@/types/common.type"
import { APP_PATH } from "@/constants"
import { Bell } from "lucide-react"
import { getSubdomain } from "@/utils/domain.utils"
import { Institution } from "@/constants/tenant.constants"
import { LoanApplicationStepsData } from "./type"
import { isEnableCashFlowV2 } from "@/utils/feature-flag.utils"

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.list,
    icon: Icons.home,
    label: "Home"
  },
  {
    title: "Applications",
    href: APP_PATH.LOAN_APPLICATION.APPLICATIONS.index,
    icon: Icons.folderCheck,
    label: "Applications"
  },
  {
    title: "Notifications",
    href: APP_PATH.LOAN_APPLICATION.NOTIFICATION.list,
    icon: Bell,
    label: "Notifications"
  },
  {
    title: "Settings",
    href: APP_PATH.LOAN_APPLICATION.SETTINGS,
    icon: Icons.setting,
    label: "Settings",
    className: "mt-auto mb-3"
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

export type PlaidInfo = {
  accessToken: string
  itemId: string
  requestId: string
  products: string[]
  error?: string
}

export type SetAccessTokenRequest = {
  publicToken: string
}

export type LinkToken = {
  linkToken: string
  error?: LinkTokenError
}

export type LinkTokenError = {
  errorMessage: string
  errorCode: string
  errorType: string
}

export enum LOAN_APPLICATION_STEPS {
  LOAN_REQUEST = "loanRequest",
  BUSINESS_INFORMATION = "businessInformation",
  OWNER_INFORMATION = "ownerInformationForm",
  FINANCIAL_INFORMATION = "financialInformationForm",
  CURRENT_LOANS = "currentLoansForm",
  OPERATING_EXPENSES = "operatingExpensesForm",
  CONFIRMATION = "confirmationForm"
}

export enum LOAN_APPLICATION_STEP_STATUS {
  INCOMPLETE = "INCOMPLETE",
  COMPLETE = "COMPLETE",
  CURRENT = "CURRENT"
}

export enum ARTCAP_MENU {
  APPLICATION = "APPLICATION",
  SIGNATURE = "SIGNATURE"
}

export const LOAN_APPLICATION_STEP_DATA_DEFAULT = {
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: {
    previousStep: "" as unknown as LOAN_APPLICATION_STEPS,
    nextStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    label: "Loan Request",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    nextStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    label: "Business Information",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    nextStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
    label: "Owner Information",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    nextStep: LOAN_APPLICATION_STEPS.CONFIRMATION,
    label: "Financial Information",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.CONFIRMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
    nextStep: "" as unknown as LOAN_APPLICATION_STEPS,
    label: "Signature and Submission",
    parent: ARTCAP_MENU.SIGNATURE
  }
}

export const LOAN_APPLICATION_STEP_DATA_LOAN_READY = {
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: {
    previousStep: "" as unknown as LOAN_APPLICATION_STEPS,
    nextStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    label: "Loan Request",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    nextStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    label: "Business Information",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    nextStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
    label: "Individual Information",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    nextStep: isEnableCashFlowV2()
      ? LOAN_APPLICATION_STEPS.CURRENT_LOANS
      : LOAN_APPLICATION_STEPS.CONFIRMATION,
    label: "Cash Flow Verification",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.CONFIRMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
    nextStep: "" as unknown as LOAN_APPLICATION_STEPS,
    label: "Review and Sign",
    parent: ARTCAP_MENU.SIGNATURE
  }
}

export const LOAN_APPLICATION_STEP_DATA_CYPHRV2 = {
  [LOAN_APPLICATION_STEPS.LOAN_REQUEST]: {
    previousStep: "" as unknown as LOAN_APPLICATION_STEPS,
    nextStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    label: "Loan Request",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.LOAN_REQUEST,
    nextStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    label: "Business Information",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.OWNER_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    nextStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
    label: "Individual Information",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION]: {
    previousStep: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    nextStep: isEnableCashFlowV2()
      ? LOAN_APPLICATION_STEPS.CURRENT_LOANS
      : LOAN_APPLICATION_STEPS.CONFIRMATION,
    label: "Cash Flow Verification",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.CURRENT_LOANS]: {
    previousStep: LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
    nextStep: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
    label: "Current Loans",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.OPERATING_EXPENSES]: {
    previousStep: LOAN_APPLICATION_STEPS.CURRENT_LOANS,
    nextStep: LOAN_APPLICATION_STEPS.CONFIRMATION,
    label: "Operating Expenses",
    parent: ARTCAP_MENU.APPLICATION
  },
  [LOAN_APPLICATION_STEPS.CONFIRMATION]: {
    previousStep: isEnableCashFlowV2()
      ? LOAN_APPLICATION_STEPS.OPERATING_EXPENSES
      : LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION,
    nextStep: "" as unknown as LOAN_APPLICATION_STEPS,
    label: "Review and Sign",
    parent: ARTCAP_MENU.SIGNATURE
  }
}

const getLoanApplicationStep = (): LoanApplicationStepsData => {
  if (getSubdomain() === Institution.LoanReady)
    return LOAN_APPLICATION_STEP_DATA_LOAN_READY
  if (getSubdomain() === Institution.CyphrV2)
    return LOAN_APPLICATION_STEP_DATA_CYPHRV2
  return LOAN_APPLICATION_STEP_DATA_DEFAULT
}

export const LOAN_APPLICATION_STEP_DATA = getLoanApplicationStep()

export const STEPS: ProgressType[] = [
  {
    title: "Loan Request",
    content: "",
    status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE,
    step: LOAN_APPLICATION_STEPS.LOAN_REQUEST
  },
  {
    title: "Business Information",
    content: "Enter your business information",
    status: LOAN_APPLICATION_STEP_STATUS.INCOMPLETE,
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

export const getConfirmationTexts = (tenant: string) => {
  return [
    {
      title: "I understand",
      content: `that the submission of an application for financing with ${tenant} does not mean that ${tenant} will finance or provide any financial services whatsoever. I further understand that approval to finance will come only after all supporting forms have been signed and approved by ${tenant}.`
    },
    {
      title: "I certify",
      content: `the accuracy of the information provided and understand that ${tenant} will be relying on the accuracy of this information when evaluating the company’s application. By submitting this application either by mail, fax, or electronically, the company and the guarantor(s) signing on the Company’s behalf below, each authorize ${tenant} to request all credit reports to verify the validity and accuracy of all information contained herein as well as the reporting to credit agencies. I consent to ${tenant}’s filing of one or more Initial Financing Statements against me or the undersigned company in any or all Uniform Commercial Code jurisdictions, which reflect the collateral as “all assets.”`
    },
    {
      title: "I understand",
      content: `that my signature below authorizes ${tenant} to discuss my loan application and documentation with ${tenant} partners to better serve me.`
    },
    {
      title: "I understand",
      content: `that my signature below authorizes ${tenant} to run an OFAC (Office of Foreign Assets Control) search in order to comply with the Department of Treasury`
    }
  ]
}

export const ENDPOINTS = {
  PLAID: {
    INFO: "api/plaid/info",
    SET_ACCESS_TOKEN: "api/plaid/set-access-token",
    CREATE_PUBLIC_TOKEN: "api/plaid/create-public-token",
    CREATE_PAYMENT_TOKEN: "api/plaid/create-payment-token",
    CREATE_LINK_TOKEN: "api/plaid/create-link-token",
    CREATE_LINK_TOKEN_FOR_PAYMENT: "api/plaid/create-link-token-for-payment"
  }
}

export type PlaidAction = {
  type: "SET_STATE"
  state: Partial<PlaidState>
}

export interface PlaidState {
  linkSuccess: boolean
  isItemAccess: boolean
  isPaymentInitiation: boolean
  linkToken: string | null
  accessToken: string | null
  itemId: string | null
  isError: boolean
  backend: boolean
  products: string[]
  linkTokenError: {
    errorMessage: string
    errorCode: string
    errorType: string
  }
}

export const REGEX_PATTERN = {
  PHONE: /^\d{10}$/,
  ZIP_CODE: /^\d{5}(?:[-\s]\d{4})?$/,
  SSN: /^\d{9}$/,
  EIN: /^\d{9}$/,
  WEBSITE: /^(http|https):\/\/[^ "]+$/
}
