import { type CapitalCollabAdditionalOwnerFormValue } from "@/modules/loan-application/constants/form.kyc"
import { type Option } from "@/types/common.type"

export const enum CapitalCollabKYCFieldName {
  FULL_NAME = "fullName",
  BUSINESS_ROLE = "businessRole",
  ADDRESS_LINE_1 = "addressLine1",
  ADDRESS_LINE_2 = "addressLine2",
  BUSINESS_STATE = "businessState",
  BUSINESS_CITY = "businessCity",
  PHONE_NUMBER = "phoneNumber",
  EMAIL = "email",
  DATE_OF_BIRTH = "dateOfBirth",
  SOCIAL_SECURITY_NUMBER = "socialSecurityNumber",
  BUSINESS_ZIP_CODE = "businessZipCode",
  GOVERNMENT_FILE = "governmentFile",
  PERSONAL_CREDIT_SCORE = "personalCreditScore",
  BUSINESS_OWNERSHIP_PERCENTAGE = "businessOwnershipPercentage",
  ANNUAL_INCOME = "annualIncome",
  IS_BUSINESS_SOLELY_OWNED = "isBusinessSolelyOwned",
  ADDITIONAL_OWNERS = "additionalOwners"
}

export enum PersonalCreditScoreValue {
  Range1 = "range_1",
  Range2 = "range_2",
  Range3 = "range_3",
  Range4 = "range_4",
  Range5 = "range_5"
}

export const PERSONAL_CREDIT_SCORE_OPTIONS: Option<PersonalCreditScoreValue>[] =
  [
    { label: "Below 600", value: PersonalCreditScoreValue.Range1 },
    { label: "600-649", value: PersonalCreditScoreValue.Range2 },
    { label: "650-699", value: PersonalCreditScoreValue.Range3 },
    { label: "700-749", value: PersonalCreditScoreValue.Range4 },
    { label: "750 and above", value: PersonalCreditScoreValue.Range5 }
  ]

export const EMPTY_ADDITIONAL_OWNER_ITEM: CapitalCollabAdditionalOwnerFormValue =
  {
    [CapitalCollabKYCFieldName.FULL_NAME]: "",
    [CapitalCollabKYCFieldName.BUSINESS_ROLE]: "",
    [CapitalCollabKYCFieldName.ADDRESS_LINE_1]: "",
    [CapitalCollabKYCFieldName.ADDRESS_LINE_2]: "",
    [CapitalCollabKYCFieldName.BUSINESS_STATE]: "",
    [CapitalCollabKYCFieldName.BUSINESS_CITY]: "",
    [CapitalCollabKYCFieldName.PHONE_NUMBER]: "",
    [CapitalCollabKYCFieldName.EMAIL]: "",
    [CapitalCollabKYCFieldName.DATE_OF_BIRTH]: "",
    [CapitalCollabKYCFieldName.SOCIAL_SECURITY_NUMBER]: "",
    [CapitalCollabKYCFieldName.BUSINESS_ZIP_CODE]: "",
    [CapitalCollabKYCFieldName.GOVERNMENT_FILE]: [],
    [CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE]: "",
    [CapitalCollabKYCFieldName.BUSINESS_OWNERSHIP_PERCENTAGE]: "",
    [CapitalCollabKYCFieldName.ANNUAL_INCOME]: 0
  }
