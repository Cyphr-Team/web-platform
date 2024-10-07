import { FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  LoanReadyKYCFieldName,
  PERSONAL_CREDIT_SCORE_OPTIONS
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import { KYCInformationResponse } from "@/modules/loan-application/constants/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"

interface UseIndividualInformationDetail {
  kycFormData?: KYCInformationResponse
}
export const useIndividualInformationDetail = ({
  kycFormData
}: UseIndividualInformationDetail) => {
  const individualInformationDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    title: "Individual Information",
    financialApplicationFormData: [
      {
        id: "fullLegalName",
        title: "Full legal name:",
        content: kycFormData?.fullName
      },
      {
        id: "yourRole",
        title: "Your role:",
        content: kycFormData?.businessRole
      },
      {
        id: "residentAddress",
        title: "Resident address:",
        content: kycFormData?.addressLine1
      },
      {
        id: "emailAddress",
        title: "Email address:",
        content: kycFormData?.email
      },
      {
        id: "phoneNumber",
        title: "Phone number:",
        content: formatPhoneNumber(kycFormData?.phoneNumber ?? "N/A") || "N/A"
      },
      {
        id: "dateOfBirth",
        title: "Date of birth:",
        content: formatBirthday(kycFormData?.dateOfBirth)
      },
      {
        id: "ssn",
        title: "SSN:",
        content: kycFormData?.socialSecurityNumber
      },
      {
        id: "percentageOfBusinessOwnership",
        title: "Percentage of business ownership:",
        content: kycFormData?.businessOwnershipPercentage
          ? `${kycFormData?.businessOwnershipPercentage}%`
          : "N/A"
      },
      {
        id: "personalCreditScore",
        title: "Personal credit score:",
        content:
          PERSONAL_CREDIT_SCORE_OPTIONS.find(
            (credit) =>
              credit.value ===
              kycFormData?.metadata?.[
                LoanReadyKYCFieldName.PERSONAL_CREDIT_SCORE
              ]
          )?.label ?? "N/A"
      }
    ]
  }
  return { individualInformationDetail }
}
