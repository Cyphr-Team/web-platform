import { EDecisionStatus, EPersonaStatus } from "@/types/kyc"
import type jsPDF from "jspdf"
import { isPossiblePhoneNumber } from "react-phone-number-input"
import * as z from "zod"
import { REGEX_PATTERN } from "."
import {
  type SbbKybFormPartOneValue,
  type SbbKybFormPartTwoValue
} from "../components/organisms/loan-application-form/kyb/sbb/const"
import { type SbbKycFormValue } from "../components/organisms/loan-application-form/kyc/sbb/const"
import { type DocumentUploadedResponse, type PlaidItemInfo } from "./type"
import { LoanReadyKYCFieldName } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import {
  createStringSchema,
  createWebsiteSchema
} from "@/constants/validate.ts"
import type {
  DefaultLoanRequestFormValue,
  KccLoanRequestFormValue
} from "./form[v2]"

const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "application/pdf"]

export const ZodFileTypeFactory = (
  acceptedFileTypes: string[] = ACCEPTED_FILE_TYPES,
  message = "Please choose PNG, JPG, PDF format files only"
) => {
  return z.custom<File[]>().refine(
    (files) => {
      if (files?.length) {
        let checkResult = true

        // assert all file type
        files.forEach((file) => {
          checkResult = checkResult && acceptedFileTypes.includes(file.type)
        })

        return files && checkResult
      }

      return true
    },
    {
      message
    }
  )
}

export const ownerFormSchema = z.object({
  id: z.string().nullable(),
  fullName: z.string().min(1, { message: "Name is required" }),
  addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
  addressLine2: z.string(),
  businessRole: z.string().min(1, {
    message: "Role is required"
  }),
  businessCity: z.string().min(1, { message: "City is required" }),
  businessState: z.string().min(1, { message: "State is required" }),
  businessZipCode: z
    .string()
    .min(1, { message: "Zip code is required" })
    .regex(REGEX_PATTERN.ZIP_CODE, "Enter a valid zip code"),
  phoneNumber: z
    .string({ required_error: "Phone number is required" })
    .refine((data) => isPossiblePhoneNumber(data), {
      message: "Phone number is invalid"
    }),
  email: z.string().email({ message: "Enter a valid email address" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  /**
   * Min 11 mean 9 numbers and 2 dashes '-'
   * refer: SSN_PATTERN
   */
  socialSecurityNumber: z.string().min(11, { message: "SSN/ITIN is required" }),
  businessOwnershipPercentage: z
    .string()
    .min(1, { message: "Ownership percent is required" }),
  hasOtherSubstantialStackHolders: z.string(),
  governmentFile: z.custom<File[]>().refine(
    (fileList) => {
      if (fileList?.length) {
        const fileArray = Array.from(fileList)

        return ACCEPTED_FILE_TYPES.includes(fileArray[0].type)
      }

      return true
    },
    {
      message: "Please choose PNG, JPG, PDF format files only"
    }
  )
})

export const launchKCOwnerFormSchema = ownerFormSchema.extend({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  genderIdentity: z.string().min(1, { message: "Gender identity is required" }),
  preferredPronoun: z
    .string()
    .min(1, { message: "Preferred pronoun is required" }),
  racialIdentification: z
    .string()
    .min(1, { message: "Racial identification is required" }),
  ethnicIdentification: z
    .string()
    .min(1, { message: "Ethnic identification is required" }),
  areFounderOrCoFounder: z
    .string()
    .min(1, { message: "This field is required" }),
  areFullTimeFounder: z.string().min(1, { message: "This field is required" })
})

export const loanReadyOwnerFormSchema = ownerFormSchema.extend({
  [LoanReadyKYCFieldName.PERSONAL_CREDIT_SCORE]: z
    .string()
    .min(1, "Persona credit score is required"),
  businessOwnershipPercentage: z.coerce.string()
})

export const kansasCityOwnerFormSchema = ownerFormSchema.extend({
  businessRole: z.string(),
  residentStreetAddress: z.string(),
  title: z.string(),
  genderIdentity: z.string(),
  racialIdentification: z.string(),
  ethnicIdentification: z.string(),
  personalCreditScore: z.string()
})

export const businessFormSchema = z.object({
  id: z.string(),
  businessLegalName: createStringSchema({
    fieldName: "Business legal name"
  }),
  businessWebsite: createWebsiteSchema({ fieldName: "Business website" }),
  addressLine1: z.string().min(3, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z
    .string()
    .min(1, { message: "Zip code is required" })
    .regex(REGEX_PATTERN.ZIP_CODE, "Enter a valid zip code"),
  /**
   * Min 10 mean 9 numbers and 1 dashes '-'
   * refer: EIN_PATTERN
   */
  businessTin: z.string().min(10, { message: "EIN is required" })
})

export const launchKCBusinessFormSchema = businessFormSchema.extend({
  // in the future we should use [FIELD_NAMES.YEAR_FOUNDED] pattern instead of yearFounded
  // it provide single truth for us to reduce unwanted error
  yearFounded: z
    .string()
    .min(1, { message: "Year founded is required" })
    .refine(
      (value) => {
        const inputYear = parseInt(value)
        const currentYear = new Date().getFullYear()

        return 1900 < inputYear && inputYear <= currentYear
      },
      { message: "Invalid year" }
    ),
  legalStructure: z.string().min(1, { message: "Legal structure is required" }),
  primaryIndustry: z
    .string()
    .min(1, { message: "Primary industry is required" }),
  primaryIndustryOther: z.string(),
  companyDescription: z
    .string()
    .min(1, { message: "Company description is required" })
    .max(255, { message: "Company description is too long" })
})

export const kansasCityBusinessFormSchema = businessFormSchema.extend({
  dba: z.string(),
  otherRelatedBusiness: z.string(),
  anyOtherOwnerOver20Percentage: z.string(),
  typeOfBusiness: z.string(),
  numberOfFullTimeEmployee: z.string(),
  numberOfPartTimeEmployee: z.string(),
  tenNinetyNineContractorOrOther: z.string()
})

export const loanReadyBusinessFormSchema = businessFormSchema.extend({
  dba: z.string().optional(),
  businessStage: z.string().min(1, "Business stage is required"),
  businessDescription: z.string().min(1, "Business description is required"),
  businessWebsite: createWebsiteSchema({
    fieldName: "Business website"
  })
})

export type LoanReadyBusinessFormValue = z.infer<
  typeof loanReadyBusinessFormSchema
>

export const financialFormSchema = z.object({
  id: z.string(),
  incomeCategories: z
    .string()
    .array()
    .min(1, { message: "This field is required" }),
  w2sFile: z.custom<File[]>().refine(
    (file) => {
      if (file?.length) {
        return file && ACCEPTED_FILE_TYPES.includes(file[0]?.type)
      }

      return true
    },
    {
      message: "Please choose PNG, JPG, PDF format files only"
    }
  )
})

export const confirmationFormSchema = z.object({
  printName: z.string().min(1, { message: "Print name is required" }),
  signatureDate: z.string()
})

/**
 * documentId, sessionId to support flow E-Sign
 */
export const eSignFormSchema = z.object({
  documentId: z.string().optional(),
  sessionId: z.string().optional()
})

export const loanRequestFormSchema = z.object({
  id: z.string(),
  loanAmount: z.number().gt(0),
  loanTermInMonth: z.number().gt(1),
  proposeUseOfLoan: z
    .string()
    .min(1, { message: "Proposed used of loan is required" }),
  applicationId: z.string().optional(),
  requestingInstitution: z.string().optional()
})

const LoanItemFormSchema = z.object({
  id: z.string(),
  lenderName: z.string().min(1, { message: "Lender name is required" }),
  loanType: z.string().min(1, { message: "Loan type is required" }),
  outstandingLoanBalance: z
    .number()
    .min(1, { message: "Balance must be higher than 0" }),
  monthlyPaymentAmount: z
    .number()
    .min(1, { message: "Payment must be higher than 0" }),
  loanTermRemainingInMonths: z.number(),
  annualInterestRate: z
    .number({ invalid_type_error: "Interest rate must not be blank" })
    .min(0.01, { message: "Interest rate must be higher than 0" })
    .max(50, { message: "Interest rate must not be higher than 50" })
})

const SBBLoanItemFormSchema = z.object({
  id: z.string(),
  lenderName: z.string().min(1, { message: "Lender name is required" }),
  loanType: z.string().min(1, { message: "Loan type is required" }),
  outstandingLoanBalance: z
    .number()
    .min(1, { message: "Balance must be higher than 0" }),
  monthlyPaymentAmount: z.number(),
  loanTermRemainingInMonths: z.number(),
  annualInterestRate: z
    .number({ invalid_type_error: "Interest rate must not be blank" })
    .min(0.01, { message: "Interest rate must be higher than 0" })
    .max(50, { message: "Interest rate must not be higher than 50" })
})

const KansasCityLoanItemFormSchema = LoanItemFormSchema.extend({
  id: z.string(),
  lenderName: z.string().min(1, { message: "Lender name is required" }),
  loanType: z.string().min(1, { message: "Loan type is required" }),
  originalLoanAmount: z
    .number()
    .min(1, { message: "Original loan amount must be higher than 0" }),
  monthlyPaymentAmount: z.number(),
  loanTermRemainingInMonths: z.number(),
  annualInterestRate: z
    .number({ invalid_type_error: "Interest rate must not be blank" })
    .min(0.01, { message: "Interest rate must be higher than 0" })
    .max(50, { message: "Interest rate must not be higher than 50" })
})

export const currentLoansFormSchema = z.object({
  hasOutstandingLoans: z.string().min(1, { message: "This field is required" }),
  currentLoans: z.array(LoanItemFormSchema)
})

export const sbbCurrentLoansFormSchema = z.object({
  hasOutstandingLoans: z.string().min(1, { message: "This field is required" }),
  currentLoans: z.array(SBBLoanItemFormSchema)
})

export const kansasCityCurrentLoansFormSchema = z.object({
  hasOutstandingLoans: z.string().min(1, { message: "This field is required" }),
  currentLoans: z.array(KansasCityLoanItemFormSchema)
})

export const operatingExpensesFormSchema = z.object({
  id: z.string().nullable(),
  costOfGoodsSold: z.number().min(0, { message: "This value is required" }),
  rent: z.number().min(0, { message: "This value is required" }),
  salariesAndWages: z.number().min(0, { message: "This value is required" }),
  payrollTaxes: z.number().min(0, { message: "This value is required" }),
  salesAndMarketingExpenses: z
    .number()
    .min(0, { message: "This value is required" }),
  accountingFees: z.number().min(0, { message: "This value is required" }),
  legalFees: z.number().min(0, { message: "This value is required" }),
  officeSupplies: z.number().min(0, { message: "This value is required" }),
  maintenanceAndRepairs: z
    .number()
    .min(0, { message: "This value is required" }),
  utilities: z.number().min(0, { message: "This value is required" }),
  insurance: z.number().min(0, { message: "This value is required" }),
  duesAndSubscriptions: z
    .number()
    .min(0, { message: "This value is required" }),
  travelAndEntertainment: z
    .number()
    .min(0, { message: "This value is required" }),
  depreciation: z.number().min(0, { message: "This value is required" }),
  bankCharges: z.number().min(0, { message: "This value is required" }),
  otherOperatingExpenses: z
    .number()
    .min(0, { message: "This value is required" })
})

export const createIdentityVerificationSchema = () => {
  return z.object({
    /**
     * This is use for the flow:
     *  1. The client open the Persona Inquiry but didn't finish it
     *  2. The client save draft - save & close -> we have applicationId now, we also link the inquiryId to this application
     *  3. The client go back to the application and continue the persona Inquiry -> should send the applicationId to server
     */
    applicationId: z.string().optional(),
    smartKycId: z.string().optional(),
    inquiryId: z.string(),
    status: z.string().refine((status) => {
      return (
        status.toLowerCase() === EPersonaStatus.COMPLETED.toLowerCase() ||
        status.toLowerCase() === EDecisionStatus.APPROVED.toLowerCase()
      )
    })
  })
}

export const reviewApplicationSchema = z.object({
  isReviewed: z.boolean(),
  pdf: z.custom<jsPDF>().optional(),
  totalPage: z.number().optional()
})

export type ReviewApplicationValue = z.infer<typeof reviewApplicationSchema>

export type FinancialProjectionReviewApplicationValue = z.infer<
  typeof reviewApplicationSchema
>

export const cashFlowSchema = z.object({
  /**
   * This is use for the flow:
   *  1. The client confirm the understand checkbox but have not finished the bank account connection
   *  2. The client save draft - save & close -> we have applicationId now, we also link the application id to the plaid items of each bank
   *  3. The client go back to the application and connect more bank account, the connected bank account should be shown
   */
  applicationId: z.string().optional(),
  plaidItemInfo: z.custom<PlaidItemInfo[]>()
})

export const assigningJudgeFormSchema = z.object({
  user: z.object({
    value: z.string().min(1, "User id is required"),
    label: z.string().min(1, "User email is required")
  })
})

export const preQualificationSchema = z.object({
  applicationId: z.string().nullable(),
  isCompanyBasedInUs: z.boolean(),
  foundingTeamEligibleToWorkInUs: z.boolean(),
  isForProfitTechCompany: z.boolean(),
  hasMvpWithRevenueUnderOneMillion: z.boolean(),
  willingToOperateInKansasCityMo: z.string()
})

export const productServiceFormSchema = z.object({
  id: z.string().nullable(),
  loanApplicationId: z.string().nullable(),
  businessType: z.string().min(1, { message: "This field is required" }),
  solutionFocus: z.string().min(1, { message: "This field is required" }),
  businessValue: z.string().min(1, { message: "This field is required" }),
  proofOfMarket: z.string().min(1, { message: "This field is required" }),
  intellectualProperty: z.string().min(1, { message: "This field is required" })
})

export const marketOpportunityFormSchema = z.object({
  id: z.string().nullable(),
  loanApplicationId: z.string().nullable(),
  marketTarget: z.string().min(1, { message: "This field is required" }),
  competitor: z.string().min(1, { message: "This field is required" }),
  potentialCustomer: z.string().min(1, { message: "This field is required" })
})

export const businessModelFormSchema = z.object({
  id: z.string().nullable(),
  loanApplicationId: z.string().nullable(),
  description: z.string().min(1, { message: "This field is required" }),
  totalRevenueRange: z.string().min(1, { message: "This field is required" }),
  lastMonthRevenueRange: z
    .string()
    .min(1, { message: "This field is required" }),
  lastYearRevenueRange: z
    .string()
    .min(1, { message: "This field is required" }),
  annualPayroll: z
    .number()
    .gt(0, { message: "Annual payroll must be greater than zero" })
    .lte(10e16, { message: "Annual payroll is too large" }),
  scalePlan: z.string().min(1, { message: "This field is required" })
})

export const executionFormSchema = z.object({
  id: z.string().nullable(),
  loanApplicationId: z.string().nullable(),
  monthlyExpenseRange: z.string().min(1, { message: "This field is required" }),
  growthMetric: z.string().min(1, { message: "This field is required" }),
  recentMilestone: z.string().min(1, { message: "This field is required" }),
  nextMilestone: z.string().min(1, { message: "This field is required" }),
  greatestChallenge: z.string().min(1, { message: "This field is required" }),
  businessStage: z.string().min(1, { message: "This field is required" }),
  businessModels: z.array(z.string()),
  businessModelsOtherText: z.string().optional(),
  partnershipTypes: z.array(z.string()),
  fundingSources: z.array(
    z.object({
      id: z.string().optional(),
      sourceType: z.string().min(1, { message: "This field is required" }),
      amount: z
        .string()
        .min(1, { message: "This field is required" })
        .refine((value) => parseInt(value) > 0, {
          message: "Amount must be greater than zero"
        })
    })
  ),
  founders: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, { message: "This field is required" }),
      jobType: z.string().min(1, { message: "This field is required" }),
      background: z.string().min(1, { message: "This field is required" }),
      skill: z.string().min(1, { message: "This field is required" })
    })
  )
})

export const documentUploadsFormSchema = z.object({
  id: z.string().nullable(),
  executiveSummary: z.custom<File[]>().refine(
    (file) => {
      if (file?.length) {
        return file && ACCEPTED_FILE_TYPES.includes(file[0]?.type)
      }

      return true
    },
    {
      message: "Please choose PNG, JPG, PDF format files only"
    }
  ),
  pitchDeck: z.custom<File[]>().refine(
    (file) => {
      if (file?.length) {
        return file && ACCEPTED_FILE_TYPES.includes(file[0]?.type)
      }

      return true
    },
    {
      message: "Please choose PNG, JPG, PDF format files only"
    }
  ),
  uploadedExecutiveSummary: z.custom<DocumentUploadedResponse[]>().nullable(),
  uploadedPitchDesk: z.custom<DocumentUploadedResponse[]>().nullable()
})

export const launchKcFitFormSchema = z.object({
  id: z.string().nullable(),
  loanApplicationId: z.string().nullable(),
  referralSource: z.string().min(1, { message: "This field is required" }),
  businessLocation: z.string().min(1, { message: "This field is required" }),
  founderTies: z.string().min(1, { message: "This field is required" }),
  locationChoiceReason: z
    .string()
    .min(1, { message: "This field is required" }),
  impact: z.string().min(1, { message: "This field is required" }),
  equityInclusion: z.string().min(1, { message: "This field is required" }),
  applied: z.boolean(),
  progress: z.string()
})

export const disclaimerAndDisclosureFormSchema = z.object({
  acknowledge: z.literal(true)
})

export const BINARY_VALUES = {
  YES: "yes",
  NO: "no"
}

export const YES_NO_OPTIONS = [
  { value: BINARY_VALUES.YES, label: "Yes" },
  { value: BINARY_VALUES.NO, label: "No" }
]

export const yesNoSchema = z
  .string()
  .refine((val) => YES_NO_OPTIONS.map((option) => option.value).includes(val), {
    message: "Invalid option, must be 'yes' or 'no'."
  })

export type DisclaimerAndDisclosureFormValue = z.infer<
  typeof disclaimerAndDisclosureFormSchema
>

export type IdentityVerificationValue = z.infer<
  ReturnType<typeof createIdentityVerificationSchema>
>

export type BusinessFormValue = z.infer<typeof businessFormSchema>

export type LaunchKCBusinessFormValue = z.infer<
  typeof launchKCBusinessFormSchema
>

export type KansasCityBusinessFormValue = z.infer<
  typeof kansasCityBusinessFormSchema
>

export type OwnerFormValue = z.infer<typeof ownerFormSchema>

export type LaunchKCOwnerFormValue = z.infer<typeof launchKCOwnerFormSchema>

export type KansasCityOwnerFormValue = z.infer<typeof kansasCityOwnerFormSchema>

export type LoanReadyOwnerFormValue = z.infer<typeof loanReadyOwnerFormSchema>

export type FinancialFormValue = z.infer<typeof financialFormSchema>

export type ConfirmationFormValue = z.infer<typeof confirmationFormSchema>

export type ESignFormValue = z.infer<typeof eSignFormSchema>

export type LoanRequestFormValue = z.infer<typeof loanRequestFormSchema>

export type CurrentLoansFormValue = z.infer<typeof currentLoansFormSchema>

export type SbbCurrentLoansFormValue = z.infer<typeof sbbCurrentLoansFormSchema>

export type KansasCityCurrentLoansFormValue = z.infer<
  typeof kansasCityCurrentLoansFormSchema
>

export type OperatingExpensesFormValue = z.infer<
  typeof operatingExpensesFormSchema
>

export type CashFlowFormValue = z.infer<typeof cashFlowSchema>

export type AssigningJudgeFormValue = z.infer<typeof assigningJudgeFormSchema>

export type PreQualificationFormValue = z.infer<typeof preQualificationSchema>

export type ProductServiceFormValue = z.infer<typeof productServiceFormSchema>

export type MarketOpportunityFormValue = z.infer<
  typeof marketOpportunityFormSchema
>

export type BusinessModelFormValue = z.infer<typeof businessModelFormSchema>

export type ExecutionFormValue = z.infer<typeof executionFormSchema>

export type DocumentUploadsFormValue = z.infer<typeof documentUploadsFormSchema>

export type LaunchKCFitFormValue = z.infer<typeof launchKcFitFormSchema>

/**
 * Export type for provider, this use for centralize possible field of all form.
 * I use polymorphism approach for multiple schema form value.
 * In Typescript, I use type intersection to easily handle missing or addition field
 * */
export type ILoanRequestFormValue = DefaultLoanRequestFormValue &
  KccLoanRequestFormValue

export type IBusinessFormValue = BusinessFormValue &
  LaunchKCBusinessFormValue &
  SbbKybFormPartOneValue &
  SbbKybFormPartTwoValue &
  KansasCityBusinessFormValue &
  LoanReadyBusinessFormValue

export type IOwnerFormValue = OwnerFormValue &
  LaunchKCOwnerFormValue &
  KansasCityOwnerFormValue &
  SbbKycFormValue &
  LoanReadyOwnerFormValue

export type ICurrentLoanFormValue = CurrentLoansFormValue &
  SbbCurrentLoansFormValue &
  KansasCityCurrentLoansFormValue
