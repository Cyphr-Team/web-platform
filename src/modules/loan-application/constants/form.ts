import { phoneRegex } from "@/constants"
import * as z from "zod"
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg", "application/pdf"]

export const ownerFormSchema = z.object({
  name: z.string().min(6, { message: "Name must be at least 6 characters" }),
  address: z.string().min(1, { message: "Address is required" }),
  role: z.string().min(1, {
    message: "Role is required"
  }),
  phone: z.string().regex(phoneRegex, "Enter a valid phone number!"),
  email: z.string().email({ message: "Enter a valid email address" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  ssn: z.string().min(1, { message: "Social security number is required" }),
  ownership: z.string().min(1, { message: "Ownership percent is required" }),
  cooperate: z.string().min(1, { message: "Cooperate is required" }),
  governmentFile: z
    .any()
    .refine((file) => file && ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Please choose PNG, JPG, PDF format files only"
    })
})

export const businessFormSchema = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
  website: z.string().url()
})

export const financialFormSchema = z.object({
  cashflow: z.string().array(),
  w2sFile: z
    .any()
    .refine((file) => file && ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Please choose PNG, JPG, PDF format files only"
    })
})

export const confirmationFormSchema = z.object({
  signature: z.string().min(1),
  name: z.string().min(6, { message: "Name must be at least 6 characters" }),
  signatureDate: z.string().min(1)
})

export type BusinessFormValue = z.infer<typeof businessFormSchema>

export type OwnerFormValue = z.infer<typeof ownerFormSchema>

export type FinancialFormValue = z.infer<typeof financialFormSchema>

export type ConfirmationFormValue = z.infer<typeof confirmationFormSchema>
