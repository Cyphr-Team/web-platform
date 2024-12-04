import { type ILoanRequestFormValue } from "@/modules/loan-application/constants/form.ts"
import { get } from "lodash"
import { type ZodSchema } from "zod"
import { type CurrentLoanFormsV2Value } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import { type FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { type ApplicationSummary } from "@/modules/loan-application-management/constants/types/loan-summary.type.ts"

// Region Utils for Loan Request
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
// endregion

export function findSingularFormMetadata(
  formType: FORM_TYPE,
  applicationSummary?: ApplicationSummary
) {
  return get(
    applicationSummary?.forms?.find((form) => form.formType === formType),
    "forms[0].metadata",
    {}
  )
}

export function preFormatCurrentLoanForm(
  formMetaData: Record<string, unknown>,
  applicationId?: string | undefined,
  formId?: string | undefined
) {
  const currentLoans = get(
    formMetaData,
    "currentLoans",
    []
  ) as CurrentLoanFormsV2Value[]

  return {
    ...formMetaData,
    hasOutstandingLoans: (currentLoans.length > 0).toString(),
    currentLoans: currentLoans.map((loan: Record<string, unknown>) => ({
      ...(loan as CurrentLoanFormsV2Value),
      id: ""
    })),
    additionalFields: {
      loanApplicationId: applicationId ?? "",
      id: formId
    }
  }
}

/**
 * Utils for Form V2. This is a generic function to adapt metadata to a specific schema
 * @param schema - Zod schema
 * @param metadata - Metadata from the form v2
 * @param preFormat - Custom format function to format metadata before parsing
 * @param additionalFields - Additional fields to include in the metadata.
 * These fields are not part of the response data but are required
 * to correctly parse the form data based on the schema.
 * The schema is used to determine the structure of form data for submission
 * and parsing, so additional fields provide supplemental information
 * necessary for schema-based parsing.
 * Ex: additionalFields: { loanApplicationId: "", "formId": "" }
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
// endregion
