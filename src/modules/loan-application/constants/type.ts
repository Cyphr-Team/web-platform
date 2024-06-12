import { LoanDecisionEnum } from "@/modules/loan-application-management/constants/types/application"
import { Option } from "@/types/common.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { BaseLoanProgramType } from "@/types/loan-program.type"

export interface KYBInformation {
  id: string | null
  loanApplicationId?: string
  businessLegalName: string
  businessStreetAddress: BusinessStreetAddress
  businessWebsite?: string
  businessTin: string
}

export interface KYBInformationResponse {
  id: string
  loanApplicationId: string
  businessLegalName: string
  businessStreetAddress: BusinessStreetAddress
  businessWebsite: string
  businessTin: string
  createdAt: string
  updatedAt: string
}

interface BusinessStreetAddress {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
}

export interface KYCInformation {
  id: string | null
  loanApplicationId?: string
  fullName: string
  businessRole: string
  addressLine1: string
  addressLine2: string
  businessCity: string
  businessState: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: number
  hasOtherSubstantialStackHolders?: boolean
}

export interface KYCInformationResponse {
  id: string
  loanApplicationId: string
  fullName: string
  businessRole: string
  addressLine1: string
  addressLine2: string
  businessCity: string
  businessState: string
  businessZipCode: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  socialSecurityNumber: string
  businessOwnershipPercentage: number
  hasOtherSubstantialStackHolders: boolean
  createdAt: string
  updatedAt: string
}

export interface LoanProgramContactData {
  phone?: string
  location?: string
  mail?: string
}
export interface LoanProgramData {
  id: string
  type: string
  name: string
  loanAmountRange?: string
  amount?: string | number
  meta?: Record<string, string>
  startBtn?: string
  description?: string
  faqs?: Record<string, string | string[]>
  loanPurposes?: Option[]
  heroImage?: string
  contact?: LoanProgramContactData
  isUnderConstruction: boolean
}

export interface FinancialInformation {
  id: string | null
  loanApplicationId?: string
  incomeCategories: string[]
}

export interface FinancialInformationResponse {
  id: string
  loanApplicationId: string
  incomeCategories: string[]
  documents: string[]
  createdAt: string
  updatedAt: string
}

export interface CurrentLoansInformation {
  loanApplicationId?: string
  currentLoans: CurrentLoanInformationResponse[]
}

export interface CurrentLoansInformationData {
  lenderName: string
  loanType: string
  outstandingLoanBalance: number
  monthlyPaymentAmount: number
  loanTermRemainingInMonths: number
  annualInterestRate: number
}

export interface CurrentLoanInformationResponse {
  id: string
  lenderName: string
  loanType: string
  outstandingLoanBalance: number
  monthlyPaymentAmount: number
  loanTermRemainingInMonths: number
  annualInterestRate: number
}

export interface CurrentLoansInformationResponse {
  currentLoanForms: CurrentLoanInformationResponse[]
}

export interface OperatingExpensesInformation {
  id: string | null
  loanApplicationId?: string
  costOfGoodsSold: number
  rent: number
  salariesAndWages: number
  payrollTaxes: number
  salesAndMarketingExpenses: number
  accountingFees: number
  legalFees: number
  officeSupplies: number
  maintenanceAndRepairs: number
  utilities: number
  insurance: number
  duesAndSubscriptions: number
  travelAndEntertainment: number
  depreciation: number
  bankCharges: number
  otherOperatingExpenses: number
}

export interface OperatingExpensesInformationResponse {
  id: string
  costOfGoodsSold: number
  rent: number
  salariesAndWages: number
  payrollTaxes: number
  salesAndMarketingExpenses: number
  accountingFees: number
  legalFees: number
  officeSupplies: number
  maintenanceAndRepairs: number
  utilities: number
  insurance: number
  duesAndSubscriptions: number
  travelAndEntertainment: number
  depreciation: number
  bankCharges: number
  otherOperatingExpenses: number
}

export interface ConfirmationForm {
  loanApplicationId: string
  printName: string
}

export interface ConfirmationFormResponse {
  id: string
  loanApplicationId: string
  printName: string
  createdAt: string
  updatedAt: string
}

export interface DocumentUpload {
  formId: string
  formType: string
  files: File[]
}

export interface UserLoanApplicationDetailsResponse {
  id: string
  loanProgram: BaseLoanProgramType
  applicantId: string
  businessId: string
  status: LoanApplicationStatus
  progress: number
  ocrolusBookId: string
  decision: LoanDecisionEnum
  decisionNote: string
  createdAt: string
  updatedAt: string
}

export interface DocumentUploadedResponse {
  id: string
  formId: string
  type: string
  url: string
  urlExpiredAt: string
  originFileName: string
  fullPathFileName: string
  createdAt: string
  updatedAt: string
}

export interface LoanApplicationBankAccount {
  institutionName?: string
  bankAccountPk?: string
  bankAccountName?: string
  connectedOn?: string
}

export interface LoanApplicationCashflowVerification {
  bankAccounts?: LoanApplicationBankAccount[]
}

export type OperatingExpensesFieldDataType = {
  name:
    | "costOfGoodsSold"
    | "rent"
    | "salariesAndWages"
    | "payrollTaxes"
    | "salesAndMarketingExpenses"
    | "accountingFees"
    | "legalFees"
    | "officeSupplies"
    | "maintenanceAndRepairs"
    | "utilities"
    | "insurance"
    | "duesAndSubscriptions"
    | "travelAndEntertainment"
    | "depreciation"
    | "bankCharges"
    | "otherOperatingExpenses"
  title: string
  subtitle: string
}[]

export const OPERATING_EXPENSES_FIELD_DATA: OperatingExpensesFieldDataType = [
  {
    name: "costOfGoodsSold",
    title: "Cost of Goods Sold (COGS)",
    subtitle: "Direct costs related to producing goods or services"
  },
  {
    name: "rent",
    title: "Rent",
    subtitle: "The cost of leasing office space or facilities"
  },
  {
    name: "salariesAndWages",
    title: "Salaries and Wages",
    subtitle: "Payments to employees and contractors"
  },
  {
    name: "payrollTaxes",
    title: "Payroll Taxes",
    subtitle:
      "Contributions for Social Security, Medicare, and unemployment insurance"
  },
  {
    name: "salesAndMarketingExpenses",
    title: "Sales and Marketing Expenses",
    subtitle: "Costs related to promoting and selling"
  },
  {
    name: "accountingFees",
    title: "Accounting Fees",
    subtitle: "Fees paid to accountants for financial services"
  },
  {
    name: "legalFees",
    title: "Legal Fees",
    subtitle: "Fees paid to lawyers for legal services"
  },
  {
    name: "officeSupplies",
    title: "Office Supplies",
    subtitle: "Expenses for stationery, printer ink, etc."
  },
  {
    name: "maintenanceAndRepairs",
    title: "Maintenance and Repairs",
    subtitle: "Costs incurred for maintaining equipment or facilities"
  },
  {
    name: "utilities",
    title: "Utilities",
    subtitle: "Electricity, water, and other utilities bills"
  },
  {
    name: "insurance",
    title: "Insurance",
    subtitle: "Costs to cover against unexpected damage"
  },
  {
    name: "duesAndSubscriptions",
    title: "Dues and Subscriptions",
    subtitle: "Recurring fees such as software licenses, membership dues, etc."
  },
  {
    name: "travelAndEntertainment",
    title: "Travel and Entertainment",
    subtitle: "Costs such as airfare, lodging, meals, transportation, etc"
  },
  {
    name: "depreciation",
    title: "Depreciation",
    subtitle: "The periodic conversion of assets' value into an expense"
  },
  {
    name: "bankCharges",
    title: "Bank Charges",
    subtitle: "Fees associated with banking services"
  },
  {
    name: "otherOperatingExpenses",
    title: "Other Operating Expenses",
    subtitle: "Expenses not already captured in the above categories"
  }
]
export interface PlaidItemInfo {
  plaidAccessToken: string
  itemId: string
  institutionId: string
  requestId: string
}
