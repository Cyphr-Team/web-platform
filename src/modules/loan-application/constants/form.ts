import { EDecisionStatus, EPersonaStatus } from "@/types/kyc"
import type jsPDF from "jspdf"
import * as z from "zod"
import {
  type SbbKybFormPartOneValue,
  type SbbKybFormPartTwoValue
} from "../components/organisms/loan-application-form/kyb/sbb/const"
import { type SbbKycFormValue } from "../components/organisms/loan-application-form/kyc/sbb/const"
import { type DocumentUploadedResponse } from "./type"
import type {
  DefaultLoanRequestFormValue,
  KccLoanRequestFormValue
} from "./form[v2]"
import { type CurrentLoanFormsV2Value } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import {
  ACCEPTED_FILE_TYPES,
  type LaunchKCOwnerFormValue,
  type LoanReadyOwnerFormValue,
  type OwnerFormValue
} from "@/modules/loan-application/constants/form.kyc.ts"
import {
  type BusinessFormValue,
  type LaunchKCBusinessFormValue,
  type LoanReadyBusinessFormValue
} from "@/modules/loan-application/constants/form.kyb.ts"

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

// region form zod schema validation definition

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

export const currentLoansFormSchema = z.object({
  id: z.string().optional(),
  hasOutstandingLoans: z.string().min(1, { message: "This field is required" }),
  currentLoans: z.array(LoanItemFormSchema)
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

// endregion

// region form type declaration

export type ReviewApplicationValue = z.infer<typeof reviewApplicationSchema>

export type DisclaimerAndDisclosureFormValue = z.infer<
  typeof disclaimerAndDisclosureFormSchema
>

export type IdentityVerificationValue = z.infer<
  ReturnType<typeof createIdentityVerificationSchema>
>

export type FinancialFormValue = z.infer<typeof financialFormSchema>

export type ConfirmationFormValue = z.infer<typeof confirmationFormSchema>

export type ESignFormValue = z.infer<typeof eSignFormSchema>

export type LoanRequestFormValue = z.infer<typeof loanRequestFormSchema>

export type CurrentLoansFormValue = z.infer<typeof currentLoansFormSchema>

export type OperatingExpensesFormValue = z.infer<
  typeof operatingExpensesFormSchema
>

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

// endregion

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
  LoanReadyBusinessFormValue

export type IOwnerFormValue = OwnerFormValue &
  LaunchKCOwnerFormValue &
  SbbKycFormValue &
  LoanReadyOwnerFormValue

export type ICurrentLoanFormValue = CurrentLoansFormValue &
  CurrentLoanFormsV2Value
