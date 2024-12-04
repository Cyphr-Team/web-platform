import * as z from "zod"
import {
  createStringSchema,
  createWebsiteSchema
} from "@/constants/validate.ts"
import { REGEX_PATTERN } from "@/modules/loan-application/constants/index.ts"

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

export const loanReadyBusinessFormSchema = businessFormSchema.extend({
  dba: z.string().optional(),
  businessStage: z.string().min(1, "Business stage is required"),
  businessDescription: z.string().min(1, "Business description is required"),
  businessWebsite: createWebsiteSchema({
    fieldName: "Business website"
  })
})

export type BusinessFormValue = z.infer<typeof businessFormSchema>

export type LaunchKCBusinessFormValue = z.infer<
  typeof launchKCBusinessFormSchema
>

export type LoanReadyBusinessFormValue = z.infer<
  typeof loanReadyBusinessFormSchema
>
