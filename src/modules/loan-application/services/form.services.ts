import { toPattern } from "@/components/ui/mask-input"
import {
  SBB_KYB_FORM_FIELDS,
  type SbbKybFormPartOneValue,
  type SbbKybFormPartTwoValue,
  sbbKybFormSchemaPartOne,
  sbbKybFormSchemaPartTwo
} from "../components/organisms/loan-application-form/kyb/sbb/const"

import {
  type CurrentLoansInformationResponse,
  type KYBInformation,
  type KYBInformationResponse,
  type KYCInformation,
  type KYCInformationResponse,
  type OperatingExpensesInformationResponse
} from "../constants/type"
import { isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils.ts"
import { get, set, without } from "lodash"
import { SBB_KYC_FIELD_NAMES } from "../components/organisms/loan-application-form/kyc/sbb/const"
import {
  launchKCOwnerFormSchema,
  loanReadyOwnerFormSchema,
  ownerFormSchema
} from "@/modules/loan-application/constants/form.kyc.ts"
import {
  type IBusinessFormValue,
  type IOwnerFormValue
} from "@/modules/loan-application/constants/form.ts"
import {
  businessFormSchema,
  type BusinessFormValue,
  launchKCBusinessFormSchema,
  loanReadyBusinessFormSchema
} from "@/modules/loan-application/constants/form.kyb.ts"
import {
  getStateCode,
  getStateName
} from "@/modules/loan-application/hooks/utils/useSelectCities.ts"

export const formatKybForm = (rawData: IBusinessFormValue): KYBInformation => {
  const formattedForm: KYBInformation = {
    ...(rawData as BusinessFormValue),
    businessStreetAddress: {
      addressLine1: rawData.addressLine1,
      addressLine2: get(rawData, "addressLine2", ""),
      city: rawData.city,
      state: getStateCode(rawData.state),
      postalCode: rawData.postalCode
    },
    businessWebsite: rawData.businessWebsite.length
      ? rawData.businessWebsite
      : undefined
  }

  if (isLaunchKC()) {
    /**
     * function "without" act like Omit, but it's for string[]. For example
     * A = [a, b, c, d]
     * B = [c, d]
     * C = without(A, ...B)
     * => C = [a, b]
     * */
    // launchKcKybMetadata get the field that only contains in LaunchKC Kyb form
    const launchKcKybMetadata = without(
      Object.keys(launchKCBusinessFormSchema.shape),
      ...Object.keys(businessFormSchema.shape)
    )

    return formatMetadataFromSchema(
      launchKcKybMetadata,
      formattedForm
    ) as KYBInformation
  }

  if (isLoanReady()) {
    const loanReadyKybMetadata = without(
      Object.keys(loanReadyBusinessFormSchema.shape),
      ...Object.keys(businessFormSchema.shape)
    )

    return formatMetadataFromSchema(
      loanReadyKybMetadata,
      formattedForm
    ) as KYBInformation
  }

  return formattedForm
}

export const formatKycForm = (rawData: IOwnerFormValue): KYCInformation => {
  const formattedForm = {
    ...rawData,
    businessOwnershipPercentage: Number(rawData.businessOwnershipPercentage)
  }

  if (isLaunchKC()) {
    const launchKcKycMetadata = without(
      Object.keys(launchKCOwnerFormSchema.shape),
      ...Object.keys(ownerFormSchema.shape)
    )

    return {
      ...(formatMetadataFromSchema(
        launchKcKycMetadata,
        formattedForm
      ) as KYCInformation),
      fullName: `${rawData?.firstName} ${rawData?.lastName}`
    }
  }

  if (isLoanReady()) {
    const loanReadyKycMetadata = without(
      Object.keys(loanReadyOwnerFormSchema.shape),
      ...Object.keys(ownerFormSchema.shape)
    )

    return formatMetadataFromSchema(
      loanReadyKycMetadata,
      formattedForm
    ) as KYCInformation
  }

  if (isSbb()) {
    const firstName = get(
      rawData,
      [SBB_KYC_FIELD_NAMES.METADATA, SBB_KYC_FIELD_NAMES.FIRST_NAME],
      ""
    )
    const lastName = get(
      rawData,
      [SBB_KYC_FIELD_NAMES.METADATA, SBB_KYC_FIELD_NAMES.LAST_NAME],
      ""
    )

    return {
      ...formattedForm,
      fullName: `${firstName} ${lastName}`
    }
  }

  return formattedForm
}

export const reverseFormatKybForm = (rawData: KYBInformationResponse) => {
  const formInformation = {
    id: rawData.id,
    businessLegalName: rawData.businessLegalName,
    addressLine1: rawData.businessStreetAddress?.addressLine1 ?? "",
    addressLine2: rawData.businessStreetAddress?.addressLine2 ?? "",
    city: rawData.businessStreetAddress?.city ?? "",
    state: getStateName(rawData.businessStreetAddress?.state) ?? "",
    postalCode: rawData.businessStreetAddress?.postalCode ?? "",
    businessWebsite: rawData.businessWebsite ?? "",
    businessTin: rawData.businessTin ?? ""
  }

  return {
    ...formInformation,
    /**
     * To reduce the effort for implementing redundant work on both BE API and FE UI
     * Metadata is implemented to help us @see KYBInformation["metadata"]
     * "metadata" only contain data when we submit this field to BE @see formatKybForm
     */
    ...get(rawData, "metadata", {})
  }
}

export const reverseFormatKycForm = (rawData: KYCInformationResponse) => {
  const formInformation = {
    id: rawData.id,
    fullName: rawData.fullName,
    businessRole: rawData.businessRole,
    addressLine1: rawData.addressLine1,
    addressLine2: rawData.addressLine2,
    businessCity: rawData.businessCity,
    businessState: rawData.businessState,
    businessZipCode: rawData.businessZipCode,
    email: rawData.email,
    phoneNumber: rawData.phoneNumber,
    dateOfBirth: rawData.dateOfBirth,
    socialSecurityNumber: rawData.socialSecurityNumber,
    governmentFile: [],
    businessOwnershipPercentage: rawData.businessOwnershipPercentage
      ? rawData.businessOwnershipPercentage.toString()
      : ""
  }

  if (isLaunchKC() || isLoanReady()) {
    return {
      ...formInformation,
      ...get(rawData, "metadata", {})
    }
  }
  if (isSbb()) {
    return {
      ...formInformation,
      metadata: get(rawData, "metadata", {})
    }
  }

  return formInformation
}

export const reverseFormatCurrentLoansForm = (
  rawData: CurrentLoansInformationResponse
) => {
  return {
    hasOutstandingLoans: rawData.currentLoanForms.length > 0 ? "true" : "false",
    currentLoans: rawData.currentLoanForms ?? []
  }
}

export const reverseFormatOperatingExpensesForm = (
  rawData: OperatingExpensesInformationResponse
) => {
  return {
    id: rawData.id,
    costOfGoodsSold: rawData.costOfGoodsSold,
    rent: rawData.rent,
    salariesAndWages: rawData.salariesAndWages,
    payrollTaxes: rawData.payrollTaxes,
    salesAndMarketingExpenses: rawData.salesAndMarketingExpenses,
    accountingFees: rawData.accountingFees,
    legalFees: rawData.legalFees,
    officeSupplies: rawData.officeSupplies,
    maintenanceAndRepairs: rawData.maintenanceAndRepairs,
    utilities: rawData.utilities,
    insurance: rawData.insurance,
    duesAndSubscriptions: rawData.duesAndSubscriptions,
    travelAndEntertainment: rawData.travelAndEntertainment,
    depreciation: rawData.depreciation,
    bankCharges: rawData.bankCharges,
    otherOperatingExpenses: rawData.otherOperatingExpenses
  }
}

const formatMetadataFromSchema = (
  metadataFields: string[],
  rawData: object
) => {
  // mustHaveFields contain all field that required in the object
  const mustHaveFields = without(Object.keys(rawData), ...metadataFields)
  // define a new empty form object
  const newForm: Record<string, string | object> = {}

  // convert all must have from rawData
  mustHaveFields.forEach((field) => {
    set(newForm, field, get(rawData, field, ""))
  })
  // convert all addition into metadata
  metadataFields.forEach((field) => {
    set(newForm, `metadata.${field}`, get(rawData, field))
  })

  /**
   * Let's say that we have two object A and B.
   * Kyb = { id: "1", fullName: "Phuc Nguyen" }
   * Kyc = { id: "1", firstName: "Phuc", lastName: "Nguyen" }
   * Then we want to convert object Kyb to object Kyc.
   *
   * Let's define a type BASE = Kyb & Kyc
   * we want to cast the type Kyb => BASE, but it fails because Kyb is missing
   * fields firstName and lastName
   *
   * Solution: cast to unknown and then cast to BASE
   * But this solution has drawbacks, the unknown mean JS engine doesn't know
   * anything about the newForm, so it's really hard for us to handle type and
   * possibly cause unwanted behavior. But I think we both understand and know
   * how to deal with this problem
   * */
  return newForm as unknown
}

/**
 * Because the SBB KYB form has a different structure with the normal KYB form
 * so we need to convert the response data to two different forms
 * SbbKybFormPartOneValue and SbbKybFormPartTwoValue
 * */
export const reverseFormatSbbKybForm = (rawData: KYBInformationResponse) => {
  const formInformation = {
    id: rawData.id,
    businessLegalName: rawData.businessLegalName,
    addressLine1: rawData.businessStreetAddress?.addressLine1 ?? "",
    addressLine2: rawData.businessStreetAddress?.addressLine2 ?? "",
    city: rawData.businessStreetAddress?.city ?? "",
    state: getStateName(rawData.businessStreetAddress?.state) ?? "",
    postalCode: rawData.businessStreetAddress?.postalCode ?? "",
    businessWebsite: rawData.businessWebsite ?? "",
    businessTin: rawData.businessTin ? toPattern(rawData?.businessTin) : ""
  }

  return {
    ...getSbbKybMetadata(rawData),
    ...formInformation
  }
}

const getSbbKybMetadata = (rawData: KYBInformationResponse) => {
  const sbbKybFormPartOneValues = Object.keys(
    sbbKybFormSchemaPartOne._def.schema.shape
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]:
        key === SBB_KYB_FORM_FIELDS.BUSINESS_TIN
          ? toPattern(get(rawData.metadata, key, ""))
          : get(rawData.metadata, key, "")
    }),
    {}
  )

  const sbbKybFormPartTwoValues = Object.keys(
    sbbKybFormSchemaPartTwo._def.schema.shape
  ).reduce(
    (acc, key) => ({
      ...acc,
      [key]: get(rawData.metadata, key, "")
    }),
    {}
  )

  return {
    sbbKybFormPartOneValues: {
      ...sbbKybFormPartOneValues,
      id: rawData.id
    } as SbbKybFormPartOneValue,
    sbbKybFormPartTwoValues: {
      ...sbbKybFormPartTwoValues,
      id: rawData.id
    } as SbbKybFormPartTwoValue
  }
}
