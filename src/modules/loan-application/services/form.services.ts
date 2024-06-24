import { BusinessFormValue, OwnerFormValue } from "../constants/form"
import {
  CurrentLoansInformationResponse,
  KYBInformationResponse,
  KYCInformationResponse,
  OperatingExpensesInformationResponse
} from "../constants/type"
import { getStateCode, getStateName } from "../hooks/useSelectCities"

export const formatKybForm = (rawData: BusinessFormValue) => {
  return {
    ...rawData,
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

export const formatKycForm = (rawData: OwnerFormValue) => {
  return {
    ...rawData,
    hasOtherSubstantialStackHolders: undefined,
    businessOwnershipPercentage: Number(rawData.businessOwnershipPercentage)
  }
}

export const reverseFormatKybForm = (rawData: KYBInformationResponse) => {
  return {
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
}

export const reverseFormatKycForm = (
  rawData: KYCInformationResponse
): OwnerFormValue => {
  return {
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
