import * as z from "zod"
import { REGEX_PATTERN } from "."
import { isPossiblePhoneNumber } from "react-phone-number-input"
import { PlaidItemInfo } from "./type"
import { isEnableNewInquiryPersonaKycCreatingLogic } from "../../../utils/feature-flag.utils"
import { EPersonaStatus } from "../../../types/kyc"
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "application/pdf"]

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
  businessZipCode: z.string().min(1, { message: "Zip code is required" }),
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

export const businessFormSchema = z.object({
  id: z.string(),
  businessLegalName: z.string().min(1, { message: "Name is required" }),
  businessWebsite: z.string(),
  addressLine1: z.string().min(3, { message: "Address line 1 is required" }),
  addressLine2: z.string(),
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

export const loanRequestFormSchema = z.object({
  id: z.string(),
  loanAmount: z.number(),
  loanTermInMonth: z.number().gt(1),
  proposeUseOfLoan: z.string().min(1)
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
    .max(100, { message: "Interest rate must not be higher than 100" })
})

export const currentLoansFormSchema = z.object({
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
      if (isEnableNewInquiryPersonaKycCreatingLogic()) {
        return status.toLowerCase() === EPersonaStatus.COMPLETED.toLowerCase()
      } else {
        return true // Accept any status when new logic is not enabled
      }
    })
  })
}

export const reviewApplicationSchema = z.object({
  isReviewed: z.boolean()
})

export type ReviewApplicationValue = z.infer<typeof reviewApplicationSchema>

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

export type IdentityVerificationValue = z.infer<
  ReturnType<typeof createIdentityVerificationSchema>
>

export type BusinessFormValue = z.infer<typeof businessFormSchema>

export type OwnerFormValue = z.infer<typeof ownerFormSchema>

export type FinancialFormValue = z.infer<typeof financialFormSchema>

export type ConfirmationFormValue = z.infer<typeof confirmationFormSchema>

export type LoanRequestFormValue = z.infer<typeof loanRequestFormSchema>

export type CurrentLoansFormValue = z.infer<typeof currentLoansFormSchema>

export type OperatingExpensesFormValue = z.infer<
  typeof operatingExpensesFormSchema
>

export type CashFlowFormValue = z.infer<typeof cashFlowSchema>
