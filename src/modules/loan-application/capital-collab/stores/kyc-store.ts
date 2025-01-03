import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { renderAdditionalOwnerDetail } from "@/modules/loan-application/capital-collab/components/organisms/AdditionalOwnerDetail"
import {
  CapitalCollabKYCFieldName,
  PERSONAL_CREDIT_SCORE_OPTIONS
} from "@/modules/loan-application/capital-collab/constants/kyc"
import { BINARY_VALUES } from "@/modules/loan-application/constants/form"
import {
  type CapitalCollabAdditionalOwnerFormValue,
  type CapitalCollabOwnerFormValue
} from "@/modules/loan-application/constants/form.kyc"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { formatPhoneNumber, toCurrency } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"
import _ from "lodash"

interface UseIndividualInformationDetail {
  ownerInformationFormValue?: CapitalCollabOwnerFormValue
}

export const individualInformationDetailMapper = ({
  ownerInformationFormValue
}: UseIndividualInformationDetail) => {
  const individualInformationDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    title: "Individual Information",
    financialApplicationFormData: toIndividualOwnerDetail(
      ownerInformationFormValue
    )
  }

  const additionalOwnersInformationDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.ADDITIONAL_OWNER_INFORMATION,
    title: "Additional Owners",
    financialApplicationFormData: [],
    subChildren: renderAdditionalOwnerDetail({
      data: ownerInformationFormValue?.additionalOwners
    })
  }

  const ownerInformationDetail = _.isEqual(
    ownerInformationFormValue?.isBusinessSolelyOwned,
    BINARY_VALUES.NO
  )
    ? [individualInformationDetail, additionalOwnersInformationDetail]
    : [individualInformationDetail]

  return { ownerInformationDetail }
}

export const toIndividualOwnerDetail = (
  ownerInformationFormValue?: CapitalCollabOwnerFormValue
) => [
  {
    id: CapitalCollabKYCFieldName.FULL_NAME,
    title: "Full legal name:",
    content: ownerInformationFormValue?.fullName ?? "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.BUSINESS_ROLE,
    title: "Your role:",
    content: ownerInformationFormValue?.businessRole ?? "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.ADDRESS_LINE_1,
    title: "Resident address:",
    content: ownerInformationFormValue?.addressLine1 ?? "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.EMAIL,
    title: "Email address:",
    content: ownerInformationFormValue?.email ?? "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.PHONE_NUMBER,
    title: "Phone number:",
    content:
      formatPhoneNumber(ownerInformationFormValue?.phoneNumber ?? "N/A") ||
      "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.DATE_OF_BIRTH,
    title: "Date of birth:",
    content: formatBirthday(ownerInformationFormValue?.dateOfBirth)
  },
  {
    id: CapitalCollabKYCFieldName.SOCIAL_SECURITY_NUMBER,
    title: "SSN:",
    content: ownerInformationFormValue?.socialSecurityNumber
  },
  {
    id: CapitalCollabKYCFieldName.BUSINESS_OWNERSHIP_PERCENTAGE,
    title: "Percentage of business ownership:",
    content: ownerInformationFormValue?.businessOwnershipPercentage
      ? `${ownerInformationFormValue?.businessOwnershipPercentage}%`
      : "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE,
    title: "Personal credit score:",
    content:
      PERSONAL_CREDIT_SCORE_OPTIONS.find(
        (credit) =>
          credit.value ===
          ownerInformationFormValue?.[
            CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE
          ]
      )?.label ?? "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.ANNUAL_INCOME,
    title: "Annual income:",
    content: ownerInformationFormValue?.annualIncome
      ? toCurrency(ownerInformationFormValue?.annualIncome, 2)
      : "N/A"
  }
]

export const toAdditionalOwnerDetail = (
  owner: CapitalCollabAdditionalOwnerFormValue,
  index: number
) => [
  {
    id: "key",
    title: `ADDITIONAL OWNER ${index + 1}`,
    content: ""
  },
  {
    id: CapitalCollabKYCFieldName.FULL_NAME,
    title: "Full legal name:",
    content: owner?.fullName
  },
  {
    id: CapitalCollabKYCFieldName.BUSINESS_ROLE,
    title: "Your role:",
    content: owner?.businessRole
  },
  {
    id: CapitalCollabKYCFieldName.ADDRESS_LINE_1,
    title: "Resident address:",
    content: owner?.addressLine1
  },
  {
    id: CapitalCollabKYCFieldName.EMAIL,
    title: "Email address:",
    content: owner?.email
  },
  {
    id: CapitalCollabKYCFieldName.PHONE_NUMBER,
    title: "Phone number:",
    content: formatPhoneNumber(owner?.phoneNumber ?? "N/A") || "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.DATE_OF_BIRTH,
    title: "Date of birth:",
    content: formatBirthday(owner?.dateOfBirth)
  },
  {
    id: CapitalCollabKYCFieldName.SOCIAL_SECURITY_NUMBER,
    title: "SSN:",
    content: owner?.socialSecurityNumber
  },
  {
    id: CapitalCollabKYCFieldName.BUSINESS_OWNERSHIP_PERCENTAGE,
    title: "Percentage of business ownership:",
    content: owner?.businessOwnershipPercentage
      ? `${owner?.businessOwnershipPercentage}%`
      : "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE,
    title: "Personal credit score:",
    content:
      PERSONAL_CREDIT_SCORE_OPTIONS.find(
        (credit) =>
          credit.value ===
          owner?.[CapitalCollabKYCFieldName.PERSONAL_CREDIT_SCORE]
      )?.label ?? "N/A"
  },
  {
    id: CapitalCollabKYCFieldName.ANNUAL_INCOME,
    title: "Annual income:",
    content: owner?.annualIncome ? toCurrency(owner?.annualIncome, 2) : "N/A"
  }
]
