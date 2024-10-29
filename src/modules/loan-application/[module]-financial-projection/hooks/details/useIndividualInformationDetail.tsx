import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import {
  LoanReadyKYCFieldName,
  PERSONAL_CREDIT_SCORE_OPTIONS
} from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import { type LoanReadyOwnerFormValue } from "@/modules/loan-application/constants/form"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"

interface UseIndividualInformationDetail {
  ownerInformationFormValue?: LoanReadyOwnerFormValue
}

export const useIndividualInformationDetail = ({
  ownerInformationFormValue
}: UseIndividualInformationDetail) => {
  const individualInformationDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.OWNER_INFORMATION,
    title: "Individual Information",
    financialApplicationFormData: [
      {
        id: "fullLegalName",
        title: "Full legal name:",
        content: ownerInformationFormValue?.fullName
      },
      {
        id: "yourRole",
        title: "Your role:",
        content: ownerInformationFormValue?.businessRole
      },
      {
        id: "residentAddress",
        title: "Resident address:",
        content: ownerInformationFormValue?.addressLine1
      },
      {
        id: "emailAddress",
        title: "Email address:",
        content: ownerInformationFormValue?.email
      },
      {
        id: "phoneNumber",
        title: "Phone number:",
        content:
          formatPhoneNumber(ownerInformationFormValue?.phoneNumber ?? "N/A") ||
          "N/A"
      },
      {
        id: "dateOfBirth",
        title: "Date of birth:",
        content: formatBirthday(ownerInformationFormValue?.dateOfBirth)
      },
      {
        id: "ssn",
        title: "SSN:",
        content: ownerInformationFormValue?.socialSecurityNumber
      },
      {
        id: "percentageOfBusinessOwnership",
        title: "Percentage of business ownership:",
        content: ownerInformationFormValue?.businessOwnershipPercentage
          ? `${ownerInformationFormValue?.businessOwnershipPercentage}%`
          : "N/A"
      },
      {
        id: "personalCreditScore",
        title: "Personal credit score:",
        content:
          PERSONAL_CREDIT_SCORE_OPTIONS.find(
            (credit) =>
              credit.value ===
              ownerInformationFormValue?.[
                LoanReadyKYCFieldName.PERSONAL_CREDIT_SCORE
              ]
          )?.label ?? "N/A"
      }
    ]
  }

  return { individualInformationDetail }
}
