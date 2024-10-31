import { formatToISOString, validFormat } from "@/utils/date.utils"
import * as z from "zod"
import { compareDesc } from "date-fns"
import { VALIDATION_PATTERNS } from "@/constants/index.ts"

// $1,000,000,000,000 (1 trillion dollars) is a substantial amount to handle on our financial platform
export const MAX_CURRENCY_AMOUNT = 1_000_000_000_000

// Set rough longest forecasting year limit for Financial Projection
export const LONGEST_FORECASTING_YEAR = 2050

export interface CustomErrorMessages {
  required?: string
  invalidType?: string
  min?: string
  max?: string
}

interface NumberSchemaOptions {
  min?: number
  max?: number
  coerce?: boolean
  customErrors?: CustomErrorMessages
}

interface StringSchemaOptions {
  fieldName?: string
}

export const createNumberSchema = (options: NumberSchemaOptions = {}) => {
  const {
    min = 0,
    max = MAX_CURRENCY_AMOUNT,
    coerce = false,
    customErrors = {}
  } = options

  const baseSchema = (coerce ? z.coerce : z).number({
    required_error: customErrors.required || "Value is required",
    invalid_type_error: customErrors.invalidType || "Value must be a number"
  })

  return baseSchema
    .min(min, customErrors.min || `Value must be at least ${min}`)
    .max(max, customErrors.max || `Value must not exceed ${max}`)
}

export const createDateSchema = () => {
  return z
    .string()
    .min(1, "This field is required")
    .refine(
      (value) => {
        /**
         * 7 is length of (MM/YYYY).
         * For example
         * "12/2022".length = 7 => valid
         * "12/20".length   = 5 => invalid
         * "12/2".length    = 4 => invalid
         * */
        if (!validFormat(value) || value.length < 7) {
          return false
        }

        const date = formatToISOString(value)
        const lower = compareDesc(new Date(1900, 1, 1), new Date(date))
        const upper = compareDesc(
          new Date(date),
          new Date(LONGEST_FORECASTING_YEAR, 1, 1)
        )

        return lower !== 0 && lower !== -1 && upper !== 0 && upper !== -1
      },
      {
        message: "This is not a valid date"
      }
    )
}

export const createCommonStringSchema = (options: StringSchemaOptions = {}) => {
  const { fieldName = "This field" } = options

  return z
    .string()
    .min(1, `${fieldName} is required`)
    .max(100, `${fieldName} must be less than 100 characters`)
}

export const createStringSchema = (options: StringSchemaOptions = {}) => {
  const { fieldName = "This field" } = options

  return createCommonStringSchema(options).regex(
    VALIDATION_PATTERNS.LEGAL_STRING,
    `${fieldName} must contain only letters, numbers, spaces, and the following characters: - & ' , .`
  )
}

/**
 * Note: we can use z.url(), but in some cases the http(s) is optional
 * so using the regex patterns below is more appropriate for flexible URL validation.
 */
export const createWebsiteSchema = (options: StringSchemaOptions = {}) => {
  const { fieldName = "Website" } = options

  return createCommonStringSchema(options).regex(
    VALIDATION_PATTERNS.WEBSITE_URL,
    `${fieldName} must be a valid website URL (e.g. example.com)`
  )
}
