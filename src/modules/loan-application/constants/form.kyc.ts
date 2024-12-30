import * as z from "zod"
import { REGEX_PATTERN } from "@/modules/loan-application/constants/index.ts"
import { isPossiblePhoneNumber } from "react-phone-number-input/min"
import { LoanReadyKYCFieldName } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const.tsx"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import { CapitalCollabKYCFieldName } from "@/modules/loan-application/capital-collab/constants/kyc"

export const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "application/pdf"
]

export const ownerFormSchema = z.object({
  id: z.string().optional(),
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  addressLine1: z.string().min(1, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
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
  // TODO(PhucNguyen): fix the type here to number
  businessOwnershipPercentage: z
    .string()
    .min(1, { message: "Ownership percent is required" }),
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
  // TODO(PhucNguyen): fix the type here to number
  businessOwnershipPercentage: z.coerce.string()
})

export const capitalCollabAdditionalOwnerFormSchema = ownerFormSchema.extend({
  [CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE]: z
    .string()
    .min(1, "Persona credit score is required"),
  [CapitalCollabKYCFieldName.BUSINESS_OWNERSHIP_PERCENTAGE]: z.coerce.string(),
  [CapitalCollabKYCFieldName.ANNUAL_INCOME]: z.coerce
    .number()
    .min(1, "Annual income is required")
})

export const capitalCollabOwnerFormSchema = ownerFormSchema
  .extend({
    [CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE]: z
      .string()
      .min(1, "Persona credit score is required"),
    [CapitalCollabKYCFieldName.BUSINESS_OWNERSHIP_PERCENTAGE]:
      z.coerce.string(),
    [CapitalCollabKYCFieldName.ANNUAL_INCOME]: z.coerce
      .number()
      .min(1, "Annual income is required"),
    [CapitalCollabKYCFieldName.IS_BUSINESS_SOLELY_OWNED]: z
      .string()
      .min(1, "Additional owners is required"),
    [CapitalCollabKYCFieldName.ADDITIONAL_OWNERS]: z.array(z.any())
  })
  .superRefine((data, ctx) => {
    if (
      data[CapitalCollabKYCFieldName.IS_BUSINESS_SOLELY_OWNED] ===
      BINARY_VALUES.NO
    ) {
      const debtFinancingResult = z
        .array(capitalCollabAdditionalOwnerFormSchema)
        .min(1)
        .safeParse(data[CapitalCollabKYCFieldName.ADDITIONAL_OWNERS])

      if (!debtFinancingResult.success) {
        debtFinancingResult.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: issue.message,
            path: [CapitalCollabKYCFieldName.ADDITIONAL_OWNERS, ...issue.path]
          })
        })
      }
    }
  })

export type OwnerFormValue = z.infer<typeof ownerFormSchema>

export type LaunchKCOwnerFormValue = z.infer<typeof launchKCOwnerFormSchema>

export type LoanReadyOwnerFormValue = z.infer<typeof loanReadyOwnerFormSchema>

export type CapitalCollabAdditionalOwnerFormValue = z.infer<
  typeof capitalCollabAdditionalOwnerFormSchema
>

export type CapitalCollabOwnerFormValue = z.infer<
  typeof capitalCollabOwnerFormSchema
>
