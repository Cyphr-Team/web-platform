import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { formatPhoneNumber } from "@/utils"
import { formatBirthday } from "@/utils/date.utils"

export const useIndividualInformationDetail = () => {
  const { kycFormData } = useBRLoanApplicationDetailsContext()

  const individualInformationDetail = {
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
      }
    ]
  }
  return { individualInformationDetail }
}
