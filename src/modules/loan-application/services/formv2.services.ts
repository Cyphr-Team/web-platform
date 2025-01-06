import { type FormV2Data } from "./../types/form.v2"
import {
  BINARY_VALUES,
  type ILoanRequestFormValue
} from "@/modules/loan-application/constants/form.ts"
import { get, isEmpty } from "lodash"
import { type ZodSchema } from "zod"
import { type CurrentLoanFormsV2Value } from "@/modules/loan-application/components/organisms/loan-application-form/current-loan/CurrentLoanFormV2.tsx"
import { type FORM_TYPE } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { type ApplicationSummary } from "@/modules/loan-application-management/constants/types/loan-summary.type.ts"
import { EIN_PATTERN, SSN_PATTERN } from "@/constants"
import { toPattern } from "@/components/ui/mask-input.tsx"

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

/**
 * Find singular FormV2 data given form type and application summary.
 * @param {FORM_TYPE} formType - Type of form.
 * @param {ApplicationSummary} applicationSummary - Summary of loan application.
 * @returns {FormV2Data} Form v2 data.
 *
 * NOTES:
 *  #1 - This function adapts Deserializer for FormV2 data, therefore we won't need to declare preFormatter again.
 *  #2 - `id` and `applicationId` are not meant to be used as part of the response data but are required.
 * Sample usage: useGetCapitalCollabAdminApplicationDetails.ts
 */
export function findSingularFormV2Data(
  formType: FORM_TYPE,
  applicationSummary?: ApplicationSummary
): FormV2Data {
  return {
    id: "",
    applicationId: "",
    formType,
    metadata: get(
      findSingularFormData(formType, applicationSummary),
      "forms[0].metadata",
      {}
    )
  }
}

export function findSingularFormMetadata(
  formType: FORM_TYPE,
  applicationSummary?: ApplicationSummary
) {
  return get(
    findSingularFormData(formType, applicationSummary),
    "forms[0].metadata",
    {}
  )
}

export function findSingularFormData(
  formType: FORM_TYPE,
  applicationSummary?: ApplicationSummary
) {
  return applicationSummary?.forms?.find((form) => form.formType === formType)
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
    hasOutstandingLoans:
      currentLoans.length > 0 ? BINARY_VALUES.YES : BINARY_VALUES.NO,
    currentLoans:
      currentLoans.length > 0
        ? currentLoans.map((loan) => ({
            ...loan,
            // TODO: Required for parsing, should be removed after roll out form v2
            id: loan.id ?? ""
          }))
        : [],
    additionalFields: {
      loanApplicationId: applicationId ?? "",
      id: formId
    }
  }
}

export function preFormatBusinessInformationForm(
  formMetaData: Record<string, unknown>
) {
  const ein = get(formMetaData, "ein", "") as string

  return {
    ...formMetaData,
    addressLine1: get(formMetaData, "businessStreetAddressLine1", ""),
    addressLine2: get(formMetaData, "businessStreetAddressLine2", ""),
    city: get(formMetaData, "businessStreetAddressCity", ""),
    state: get(formMetaData, "businessStreetAddressState", ""),
    postalCode: get(formMetaData, "businessStreetAddressZipCode", ""),
    businessTin: toPattern(ein, EIN_PATTERN)
  }
}

export function preFormatOwnerInformationForm(
  formMetaData: Record<string, unknown>
) {
  const socialSecurityNumber = get(
    formMetaData,
    "socialSecurityNumber",
    ""
  ) as string

  return {
    ...formMetaData,
    businessOwnershipPercentage: get(
      formMetaData,
      "businessOwnershipPercentage",
      ""
    )?.toString(),
    // Format because the form schema requires this format for the input
    socialSecurityNumber: toPattern(socialSecurityNumber, SSN_PATTERN)
  }
}

export function preFormatLaunchKCOwnerInformationForm(
  formMetaData: Record<string, unknown>
) {
  const socialSecurityNumber = get(
    formMetaData,
    "socialSecurityNumber",
    ""
  ) as string

  return {
    ...formMetaData,
    areFullTimeFounder: get(formMetaData, "areFullTimeFounder", false)
      ? BINARY_VALUES.YES
      : BINARY_VALUES.NO,
    areFounderOrCoFounder: get(formMetaData, "areFounderOrCoFounder", false)
      ? BINARY_VALUES.YES
      : BINARY_VALUES.NO,
    businessOwnershipPercentage: get(
      formMetaData,
      "businessOwnershipPercentage",
      ""
    )?.toString(),
    socialSecurityNumber: toPattern(socialSecurityNumber, SSN_PATTERN)
  }
}

export function safeCastingToFloatType(value: string | number | undefined) {
  return parseFloat(value?.toString() ?? "0")
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
  try {
    if (isEmpty(metadata)) {
      return {} as Output
    }

    if (preFormat !== undefined) {
      metadata = preFormat()
    }

    return schema.parse({
      ...metadata,
      ...additionalFields
    }) as Output
  } catch (error) {
    throw new Error(`Error adapting form v2 metadata: ${error}`)
  }
}
// endregion
