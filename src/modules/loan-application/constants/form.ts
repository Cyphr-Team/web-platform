import { SSN_REGEX, phoneRegex } from "@/constants"
import * as z from "zod"
import { REGEX_PATTERN } from "."
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "application/pdf"]

export const ownerFormSchema = z.object({
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
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(new RegExp(phoneRegex), "Enter a valid phone number!"),
  email: z.string().email({ message: "Enter a valid email address" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  socialSecurityNumber: z.string().regex(new RegExp(SSN_REGEX), {
    message: "Social security number is required"
  }),
  businessOwnershipPercentage: z
    .string()
    .min(1, { message: "Ownership percent is required" }),
  hasOtherSubstantialStackHolders: z
    .string()
    .min(1, { message: "This field is required" }),
  governmentFile: z.custom<File[]>().refine(
    (fileList) => {
      if (fileList) {
        if (fileList.length === 0) return false
        const fileArray = Array.from(fileList)

        return ACCEPTED_FILE_TYPES.includes(fileArray[0].type)
      }
      return false
    },
    {
      message: "Please choose PNG, JPG, PDF format files only"
    }
  )
})

export const businessFormSchema = z.object({
  businessLegalName: z.string().min(1, { message: "Name is required" }),
  businessWebsite: z.string().min(1, { message: "Enter a valid website" }),
  addressLine1: z.string().min(3, { message: "Address line 1 is required" }),
  addressLine2: z.string(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  postalCode: z
    .string()
    .min(1, { message: "Zip code is required" })
    .regex(REGEX_PATTERN.ZIP_CODE, "Enter a valid zip code"),
  businessTin: z.string().min(1, { message: "EIN is required" })
})

export const financialFormSchema = z.object({
  cashflow: z.string().array().min(1, { message: "This field is required" }),
  w2sFile: z
    .custom<File[]>()
    .refine((file) => file && ACCEPTED_FILE_TYPES.includes(file[0]?.type), {
      message: "Please choose PNG, JPG, PDF format files only"
    })
})

export const confirmationFormSchema = z.object({
  signature: z.string().min(1, { message: "Signature is required" }),
  name: z.string().min(1, { message: "Print name is required" }),
  signatureDate: z.string().min(1)
})

export const loanRequestFormSchema = z.object({
  loanAmount: z.number().gt(0),
  loanTermInMonth: z.number().gt(1),
  proposeUseOfLoan: z.string().min(1)
})

export type BusinessFormValue = z.infer<typeof businessFormSchema>

export type OwnerFormValue = z.infer<typeof ownerFormSchema>

export type FinancialFormValue = z.infer<typeof financialFormSchema>

export type ConfirmationFormValue = z.infer<typeof confirmationFormSchema>

export type LoanRequestFormValue = z.infer<typeof loanRequestFormSchema>
