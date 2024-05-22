import { LoanDecisionEnum } from "@/modules/loan-application-management/constants/types/application"
import { Option } from "@/types/common.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import {
  ARTCAP_MENU,
  LOAN_APPLICATION_STEP_STATUS,
  LOAN_APPLICATION_STEPS
} from "."
import { BaseLoanProgramType } from "@/types/loan-program.type"

export interface KYBInformation {
  id: string | null
  loanApplicationId?: string
  businessLegalName: string
  businessStreetAddress: BusinessStreetAddress
  businessWebsite: string
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
  hasOtherSubstantialStackHolders: boolean
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
}

export interface CurrentLoanInformationResponse {
  id: string
  lenderName: string
  loanType: string
  outstandingLoanBalance: number
  monthlyPaymentAmount: number
  loanTermRemainingInMonths: number
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

export enum FORM_TYPE {
  KYB = "KYB",
  KYC = "KYC",
  FINANCIAL = "FINANCIAL",
  CURRENT_LOANS = "CURRENT_LOANS",
  OPERATING_EXPENSES = "OPERATING_EXPENSES"
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
  bankAccountPk?: string
  bankAccountName?: string
}

export interface LoanApplicationCashflowVerification {
  bankAccounts?: LoanApplicationBankAccount[]
}

export interface ApplicationStep {
  step: LOAN_APPLICATION_STEPS
  previousStep: LOAN_APPLICATION_STEPS
  nextStep: LOAN_APPLICATION_STEPS
  label: string
  status: LOAN_APPLICATION_STEP_STATUS
}

export interface ApplicationStepData {
  previousStep: LOAN_APPLICATION_STEPS
  nextStep: LOAN_APPLICATION_STEPS
  parent: ARTCAP_MENU
  label: string
}

export interface LoanApplicationStepsData {
  [key: string]: ApplicationStepData
}
