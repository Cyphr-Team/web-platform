import { LoanType } from "@/types/loan-program.type"
import { BusinessFormValue, OwnerFormValue } from "../constants/form"
import {
  KYBInformationResponse,
  KYCInformationResponse
} from "../constants/type"
import { getStateCode, getStateName } from "../hooks/useSelectCities"
import {
  CyphrV2LoanFormStrategy,
  MicroLoanFormStrategy,
  ReadinessLoanFormStrategy
} from "./form.strategy"

import {
  CyphrV2StepStrategy,
  MicroLoanStepStrategy,
  ReadinessStepStrategy
} from "./steps.strategy"
import { isEnableCashFlowV2 } from "@/utils/feature-flag.utils"
import { isCyphrBank } from "@/utils/domain.utils.ts"

export const formatKybForm = (rawData: BusinessFormValue) => {
  return {
    ...rawData,
    businessStreetAddress: {
      addressLine1: rawData.addressLine1,
      addressLine2: rawData.addressLine2,
      city: rawData.city,
      state: getStateCode(rawData.state),
      postalCode: rawData.postalCode
    }
  }
}

export const formatKycForm = (rawData: OwnerFormValue) => {
  return {
    ...rawData,
    hasOtherSubstantialStackHolders:
      rawData.hasOtherSubstantialStackHolders === "true",
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

export function getFormStrategy(loanType: LoanType) {
  switch (loanType) {
    case LoanType.MICRO:
      return isEnableCashFlowV2() && isCyphrBank()
        ? new CyphrV2LoanFormStrategy()
        : new MicroLoanFormStrategy()
    case LoanType.READINESS:
      return new ReadinessLoanFormStrategy()
    default:
      throw new Error("Unsupported loan type")
  }
}

export function getFormStepStrategy(loanType: LoanType) {
  switch (loanType) {
    case LoanType.MICRO:
      return isEnableCashFlowV2() && isCyphrBank()
        ? new CyphrV2StepStrategy()
        : new MicroLoanStepStrategy()
    case LoanType.READINESS:
      return new ReadinessStepStrategy()
    default:
      throw new Error("Unsupported loan type")
  }
}
