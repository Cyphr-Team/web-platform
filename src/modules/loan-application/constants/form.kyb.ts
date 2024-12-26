import * as z from "zod"
import {
  createStringSchema,
  createWebsiteSchema
} from "@/constants/validate.ts"
import { REGEX_PATTERN } from "@/modules/loan-application/constants/index.ts"
import { CapitalCollabKYBFieldName } from "@/modules/loan-application/capital-collab/constants/kyb"
import { isPossiblePhoneNumber } from "react-phone-number-input"
import {
  BINARY_VALUES,
  yesNoSchema
} from "@/modules/loan-application/constants/form"

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

export const capitalCollabBusinessFormSchema = businessFormSchema
  .extend({
    [CapitalCollabKYBFieldName.DBA]: z.string().optional(),
    [CapitalCollabKYBFieldName.BUSINESS_STAGE]: z
      .string()
      .min(1, "Business stage is required"),
    [CapitalCollabKYBFieldName.BUSINESS_DESCRIPTION]: z
      .string()
      .min(1, "Business description is required"),
    [CapitalCollabKYBFieldName.BUSINESS_WEBSITE]: createWebsiteSchema({
      fieldName: "Business website"
    }),
    [CapitalCollabKYBFieldName.BUSINESS_INCEPTION_DATE]: z
      .string()
      .min(1, "Business inception date is required"),
    [CapitalCollabKYBFieldName.BUSINESS_MORE_THAN_ONE_BANK_ACCOUNT]:
      yesNoSchema,
    [CapitalCollabKYBFieldName.PROPERTY_LEASE_OR_OWN]: z
      .string()
      .min(1, "Property lease or own is required"),
    [CapitalCollabKYBFieldName.PROPERTY_PAYMENT]: z
      .number()
      .min(1, "Property payment is required"),
    [CapitalCollabKYBFieldName.LANDLORD_NAME]: z
      .string()
      .min(1, "Landlord name is required"),
    [CapitalCollabKYBFieldName.LANDLORD_PHONE]: z
      .string({ required_error: "Phone number is required" })
      .refine((data) => isPossiblePhoneNumber(data), {
        message: "Phone number is invalid"
      }),
    [CapitalCollabKYBFieldName.BALANCE_DAILY_OR_WEEKLY]: yesNoSchema,
    [CapitalCollabKYBFieldName.BALANCE_TOTAL]: z
      .number()
      .min(1, "Balance is required"),
    [CapitalCollabKYBFieldName.CREDIT_CARD_THREE_MONTHS]: yesNoSchema,
    [CapitalCollabKYBFieldName.CREDIT_CARD_AVERAGE_VOLUME]: z.coerce
      .number()
      .optional(),
    [CapitalCollabKYBFieldName.CREDIT_CARD_PROCESSOR]: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (
      data[CapitalCollabKYBFieldName.CREDIT_CARD_THREE_MONTHS] ===
      BINARY_VALUES.YES
    ) {
      if (data[CapitalCollabKYBFieldName.CREDIT_CARD_AVERAGE_VOLUME] === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Credit card average volume must be greater than 0",
          path: [CapitalCollabKYBFieldName.CREDIT_CARD_AVERAGE_VOLUME]
        })
      }

      if (
        !data[CapitalCollabKYBFieldName.CREDIT_CARD_PROCESSOR] ||
        data[CapitalCollabKYBFieldName.CREDIT_CARD_PROCESSOR].length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Credit card processor is required",
          path: [CapitalCollabKYBFieldName.CREDIT_CARD_PROCESSOR]
        })
      }
    } else return true
  })

export type BusinessFormValue = z.infer<typeof businessFormSchema>

export type LaunchKCBusinessFormValue = z.infer<
  typeof launchKCBusinessFormSchema
>

export type LoanReadyBusinessFormValue = z.infer<
  typeof loanReadyBusinessFormSchema
>

export type CapitalCollabBusinessFormValue = z.infer<
  typeof capitalCollabBusinessFormSchema
>
