import { type ILoanRequestFormValue } from "@/modules/loan-application/constants/form.ts"
import { get } from "lodash"
import { type ZodSchema } from "zod"

/**
 * Utils for Loan Request
 */
export const mapLoanRequestDataToV2 = (rawData: ILoanRequestFormValue) => {
  return {
    loanAmount: rawData?.loanAmount,
    proposeUseOfLoan: rawData?.proposeUseOfLoan
  }
}

export const mapMetadataToLoanRequest = (
  metadata: Record<string, unknown> | undefined
) => {
  return {
    loanAmount: get(metadata, "loanAmount", 0) as number,
    proposeUseOfLoan: get(metadata, "proposeUseOfLoan", "other") as string
  }
}

/**
 * Utils for Form V2. This is a generic function to adapt metadata to a specific schema
 * @param schema - Zod schema
 * @param metadata - Metadata from the form v2
 * @param preFormat - Custom format function to format metadata before parsing
 * @param additionalFields - Additional fields to be added to the metadata
 */
export function adaptFormV2Metadata<Output>({
  schema,
  metadata,
  preFormat,
  additionalFields
}: {
  schema: ZodSchema
  metadata: Record<string, unknown>
  preFormat?: () => Record<string, unknown>
  additionalFields?: Record<string, unknown>
}): Output {
  if (preFormat !== undefined) {
    metadata = preFormat()
  }

  return schema.parse({
    ...metadata,
    ...additionalFields
  }) as Output
}
