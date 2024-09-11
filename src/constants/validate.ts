import { validFormat } from "@/utils/date.utils"
import * as z from "zod"

// $1,000,000,000,000 (1 trillion dollars) is a substantial amount to handle on our financial platform
export const MAX_CURRENCY_AMOUNT = 1_000_000_000_000

export type CustomErrorMessages = {
  required?: string
  invalidType?: string
  min?: string
  max?: string
}

export const createNumberSchema = (
  options: {
    min?: number
    max?: number
    customErrors?: CustomErrorMessages
  } = {}
) => {
  const { min = 0, max = MAX_CURRENCY_AMOUNT, customErrors = {} } = options

  return z
    .number({
      required_error: customErrors.required || "Value is required",
      invalid_type_error: customErrors.invalidType || "Value must be a number"
    })
    .min(min, customErrors.min || `Value must be at least ${min}`)
    .max(max, customErrors.max || `Value must not exceed ${max}`)
}

export const createDateSchema = () => {
  return z
    .string()
    .min(1, "This field is required")
    .refine((value) => validFormat(value), {
      message: "This is not a valid date"
    })
}
