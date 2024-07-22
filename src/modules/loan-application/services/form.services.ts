import {
  businessFormSchema,
  BusinessFormValue,
  IBusinessFormValue,
  IOwnerFormValue,
  launchKCBusinessFormSchema,
  launchKCOwnerFormSchema,
  ownerFormSchema
} from "../constants/form"
import {
  CurrentLoansInformationResponse,
  KYBInformation,
  KYBInformationResponse,
  KYCInformation,
  KYCInformationResponse,
  OperatingExpensesInformationResponse
} from "../constants/type"
import { getStateCode, getStateName } from "../hooks/useSelectCities"
import { isLaunchKC } from "@/utils/domain.utils.ts"
import { get, set, without } from "lodash"

export const formatKybForm = (rawData: IBusinessFormValue): KYBInformation => {
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

    return formatFromSchema(launchKcKybMetadata, rawData) as KYBInformation
  }

  // base case
  return {
    ...(rawData as BusinessFormValue),
    businessStreetAddress: {
      addressLine1: rawData.addressLine1,
      addressLine2: rawData.addressLine2,
      city: rawData.city,
      state: getStateCode(rawData.state),
      postalCode: rawData.postalCode
    },
    businessWebsite: rawData.businessWebsite.length
      ? rawData.businessWebsite
      : undefined
  }
}

export const formatKycForm = (rawData: IOwnerFormValue): KYCInformation => {
  if (isLaunchKC()) {
    const launchKcKycMetadata = without(
      Object.keys(launchKCOwnerFormSchema.shape),
      ...Object.keys(ownerFormSchema.shape)
    )

    return {
      ...(formatFromSchema(launchKcKycMetadata, rawData) as KYCInformation),
      fullName: `${rawData?.firstName} ${rawData?.lastName}`
    }
  }

  return {
    ...rawData,
    hasOtherSubstantialStackHolders: undefined,
    businessOwnershipPercentage: Number(rawData.businessOwnershipPercentage)
  }
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

  if (isLaunchKC()) {
    return {
      ...formInformation,
      yearFounded: get(rawData, "metadata.yearFounded", ""),
      legalStructure: get(rawData, "metadata.legalStructure", ""),
      primaryIndustry: get(rawData, "metadata.primaryIndustry", ""),
      primaryIndustryOther: get(rawData, "metadata.primaryIndustryOther", ""),
      companyDescription: get(rawData, "metadata.companyDescription", "")
    }
  }

  return formInformation
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
    hasOtherSubstantialStackHolders:
      rawData.hasOtherSubstantialStackHolders.toString(),
    businessOwnershipPercentage: rawData.businessOwnershipPercentage
      ? rawData.businessOwnershipPercentage.toString()
      : ""
  }
  if (isLaunchKC()) {
    return {
      ...formInformation,
      firstName: get(rawData, "metadata.firstName", ""),
      lastName: get(rawData, "metadata.lastName", ""),
      genderIdentity: get(rawData, "metadata.genderIdentity", ""),
      preferredPronoun: get(rawData, "metadata.preferredPronoun", ""),
      racialIdentification: get(rawData, "metadata.racialIdentification", ""),
      ethnicIdentification: get(rawData, "metadata.ethnicIdentification", ""),
      areFullTimeFounder: get(rawData, "metadata.areFullTimeFounder", ""),
      areFounderOrCoFounder: get(rawData, "metadata.areFounderOrCoFounder", "")
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

const formatFromSchema = (metadataFields: string[], rawData: object) => {
  // mustHaveFields contain all field that required in the object
  const mustHaveFields = without(Object.keys(rawData), ...metadataFields)
  // define a new empty form object
  const newForm: { [key: string]: string | object } = {}
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
