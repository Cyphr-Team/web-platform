import { CriteriaName } from "@/modules/assessment/interface/Rating/type.ts"
import { LoanDecisionEnum } from "@/modules/loan-application-management/constants/types/application"
import { Option } from "@/types/common.type"
import { LoanApplicationStatus } from "@/types/loan-application.type"
import { BaseLoanProgramType } from "@/types/loan-program.type"
import { SBB_KYB_FORM_FIELDS } from "../components/organisms/loan-application-form/kyb/sbb/const"
import { FORM_TYPE } from "../models/LoanApplicationStep/type"
import { SbbKycMetadata } from "../components/organisms/loan-application-form/kyc/sbb/const"

export interface KYBInformation {
  id: string | null
  loanApplicationId?: string
  businessLegalName: string
  businessStreetAddress: BusinessStreetAddress
  businessWebsite?: string
  businessTin: string
  metadata?: Partial<{
    // field for launchKC
    yearFounded: string
    legalStructure: string
    primaryIndustry: string
    primaryIndustryOther: string
    companyDescription: string

    // field for SBB part 1
    [SBB_KYB_FORM_FIELDS.DBA]: string
    [SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY]: string
    [SBB_KYB_FORM_FIELDS.PARENT_COMPANY]: string
    [SBB_KYB_FORM_FIELDS.INDUSTRY_TYPE]: string
    [SBB_KYB_FORM_FIELDS.YEARS_IN_OPERATION]: string
    [SBB_KYB_FORM_FIELDS.CUSTOMER_TYPE]: string
    [SBB_KYB_FORM_FIELDS.TOTAL_NUMBER_OF_EMPLOYEES]: string
    [SBB_KYB_FORM_FIELDS.NUMBER_OF_W2_EMPLOYEES]: string
    [SBB_KYB_FORM_FIELDS.INVOLVED_IN_WEAPONS_SALES]: string
    [SBB_KYB_FORM_FIELDS.IS_HOLDING_COMPANY]: string
    [SBB_KYB_FORM_FIELDS.OWNED_BY_TRUST]: string
    [SBB_KYB_FORM_FIELDS.CBD_RELATED_BUSINESS]: string
    [SBB_KYB_FORM_FIELDS.MARIJUANA_RELATED_BUSINESS]: string
    [SBB_KYB_FORM_FIELDS.POLITICAL_ORG_CONTRIBUTOR]: string

    // field for SBB part 2
    [SBB_KYB_FORM_FIELDS.EXPECTED_ANNUAL_SALES]: string
    [SBB_KYB_FORM_FIELDS.EXPECTED_DEPOSITED_AMOUNT]: string
    [SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES]: string
    [SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_AMOUNT]: number
    [SBB_KYB_FORM_FIELDS.PAYMENT_METHODS]: string[]
    [SBB_KYB_FORM_FIELDS.IS_SELF_DIRECTED_IRA_ACCOUNT]: string
    [SBB_KYB_FORM_FIELDS.MONTHLY_DEPOSIT_AMOUNT]: string
    [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_PAYMENTS]: string
    [SBB_KYB_FORM_FIELDS.WILL_SEND_WIRE_TRANSFERS]: string
    [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_WIRE_TRANSFERS]: string
    [SBB_KYB_FORM_FIELDS.WILL_SEND_ELECTRONIC_TRANSFERS]: string
    [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_ELECTRONIC_TRANSFERS]: string
    [SBB_KYB_FORM_FIELDS.IS_MONEY_SERVICE_BUSINESS]: string
    [SBB_KYB_FORM_FIELDS.IS_OWNS_AND_OPERATES_ATMS]: string
    [SBB_KYB_FORM_FIELDS.IS_INVOLVED_IN_GAMBLING]: string
    [SBB_KYB_FORM_FIELDS.IS_ALLOW_THIRD_PARTY_SLOT_MACHINES]: string
    [SBB_KYB_FORM_FIELDS.IS_SENIOR_FOREIGN_POLITICAL_FIGURE]: string
  }>
}

export type KybMetadata = Partial<{
  // field for launchKC
  yearFounded: string
  legalStructure: string
  primaryIndustry: string
  primaryIndustryOther: string
  companyDescription: string

  // field for SBB part 1
  [SBB_KYB_FORM_FIELDS.DBA]: string
  [SBB_KYB_FORM_FIELDS.IS_SUBSIDIARY]: string
  [SBB_KYB_FORM_FIELDS.PARENT_COMPANY]: string
  [SBB_KYB_FORM_FIELDS.INDUSTRY_TYPE]: string
  [SBB_KYB_FORM_FIELDS.YEARS_IN_OPERATION]: string
  [SBB_KYB_FORM_FIELDS.CUSTOMER_TYPE]: string
  [SBB_KYB_FORM_FIELDS.TOTAL_NUMBER_OF_EMPLOYEES]: string
  [SBB_KYB_FORM_FIELDS.NUMBER_OF_W2_EMPLOYEES]: string
  [SBB_KYB_FORM_FIELDS.INVOLVED_IN_WEAPONS_SALES]: string
  [SBB_KYB_FORM_FIELDS.IS_HOLDING_COMPANY]: string
  [SBB_KYB_FORM_FIELDS.OWNED_BY_TRUST]: string
  [SBB_KYB_FORM_FIELDS.CBD_RELATED_BUSINESS]: string
  [SBB_KYB_FORM_FIELDS.MARIJUANA_RELATED_BUSINESS]: string
  [SBB_KYB_FORM_FIELDS.POLITICAL_ORG_CONTRIBUTOR]: string

  // field for SBB part 2
  [SBB_KYB_FORM_FIELDS.EXPECTED_ANNUAL_SALES]: string
  [SBB_KYB_FORM_FIELDS.EXPECTED_DEPOSITED_AMOUNT]: string
  [SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_ACTIVITIES]: string
  [SBB_KYB_FORM_FIELDS.ANTICIPATED_CASH_AMOUNT]: number
  [SBB_KYB_FORM_FIELDS.PAYMENT_METHODS]: string[]
  [SBB_KYB_FORM_FIELDS.IS_SELF_DIRECTED_IRA_ACCOUNT]: string
  [SBB_KYB_FORM_FIELDS.MONTHLY_DEPOSIT_AMOUNT]: string
  [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_PAYMENTS]: string
  [SBB_KYB_FORM_FIELDS.WILL_SEND_WIRE_TRANSFERS]: string
  [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_INTERNATIONAL_WIRE_TRANSFERS]: string
  [SBB_KYB_FORM_FIELDS.WILL_SEND_ELECTRONIC_TRANSFERS]: string
  [SBB_KYB_FORM_FIELDS.WILL_RECEIVE_ELECTRONIC_TRANSFERS]: string
  [SBB_KYB_FORM_FIELDS.IS_MONEY_SERVICE_BUSINESS]: string
  [SBB_KYB_FORM_FIELDS.IS_OWNS_AND_OPERATES_ATMS]: string
  [SBB_KYB_FORM_FIELDS.IS_INVOLVED_IN_GAMBLING]: string
  [SBB_KYB_FORM_FIELDS.IS_ALLOW_THIRD_PARTY_SLOT_MACHINES]: string
  [SBB_KYB_FORM_FIELDS.IS_SENIOR_FOREIGN_POLITICAL_FIGURE]: string
}>

export interface KYBInformationResponse {
  id: string
  loanApplicationId: string
  businessLegalName: string
  businessStreetAddress: BusinessStreetAddress
  businessWebsite: string
  businessTin: string
  createdAt: string
  updatedAt: string
  metadata?: KybMetadata
}

export interface BusinessStreetAddress {
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
  metadata?: Partial<
    {
      firstName: string
      lastName: string
      title: string
      genderIdentity: string
      preferredPronoun: string
      racialIdentification: string
      ethnicIdentification: string
      areFounderOrCoFounder: string
      areFullTimeFounder: string
    } & SbbKycMetadata
  >
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
  metadata?: Partial<
    {
      // LaunchKC Field
      firstName: string
      lastName: string
      title: string
      genderIdentity: string
      preferredPronoun: string
      racialIdentification: string
      ethnicIdentification: string
      areFounderOrCoFounder: string
      areFullTimeFounder: string
    } & SbbKycMetadata
  >
}

export interface LoanProgramContactData {
  phone?: string
  location?: string
  mail?: string
  name?: string
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
  metadata?: Partial<{
    originalLoanAmount: string
  }>
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

export interface BusinessDocumentsResponse {
  id: string
  loanApplicationId?: string
  executiveSummary: DocumentUploadedResponse
  pitchDeck: DocumentUploadedResponse
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

export interface LoanProgramFormsConfiguration {
  id: string
  loanProgramId: string
  forms: FORM_TYPE[]
  createdAt: string
  updatedAt: string
}

export interface PreQualificationResponse {
  isQualified: boolean
  applicationId: string
  loanProgramId: string
  isCompanyBasedInUs: boolean
  foundingTeamEligibleToWorkInUs: boolean
  isForProfitTechCompany: boolean
  hasMvpWithRevenueUnderOneMillion: boolean
  willingToOperateInKansasCityMo: string
}

export interface PreQualificationFormRequest {
  loanProgramId: string
  isCompanyBasedInUs: boolean
  foundingTeamEligibleToWorkInUs: boolean
  isForProfitTechCompany: boolean
  hasMvpWithRevenueUnderOneMillion: boolean
  willingToOperateInKansasCityMo: string
}

interface SBBUploadDocumentForm<T> {
  id: string // FORM ID
  loanApplicationId: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  businessEinLetter: T[]
  certificateOfGoodStanding: T[]
  fictitiousNameCertification: T[]
  articlesOfOrganizationAndOperatingAgreement: T[]
  byLaws: T[]
}

export interface SBBUploadDocumentRequest extends DocumentUpload {}

export interface SBBUploadDocumentFormResponse
  extends SBBUploadDocumentForm<DocumentUploadedResponse> {}

export interface SBBDeleteDocumentResponse
  extends SBBUploadDocumentForm<DocumentUploadedResponse> {}

export interface ApplicationCriteriaResponse {
  criteriaName: string
  ratingLevel: string
  description: string
}

export interface ApplicationScoreResponse {
  score: number
  ratingLevel: string
  category: string
  actionPlan: string
}

export const criteriaNameMapping: Record<string, CriteriaName> = {
  annualRevenue: CriteriaName.ANNUAL_REVENUE,
  businessAge: CriteriaName.BUSINESS_AGE,
  cashFlowStability: CriteriaName.CASH_FLOW_STABILITY,
  creditScore: CriteriaName.CREDIT_SCORE,
  debtToIncomeRatio: CriteriaName.DEBT_TO_INCOME_RATIO,
  employeeCount: CriteriaName.EMPLOYEE_COUNT,
  existingLoans: CriteriaName.EXISTING_LOANS,
  industryRisk: CriteriaName.INDUSTRY_RISK,
  loanAmount: CriteriaName.LOAN_AMOUNT,
  profitability: CriteriaName.PROFITABILITY
}
