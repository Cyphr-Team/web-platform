import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"

export const useBusinessInformationDetail = () => {
  const { kybFormData } = useBRLoanApplicationDetailsContext()
  const businessInformationDetail = {
    id: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    title: "Business Information",
    financialApplicationFormData: [
      {
        id: "businessLegalName",
        title: "Business legal name:",
        content: kybFormData?.businessLegalName
      },
      {
        id: "businessTradeName",
        title: "Business trade name/DBA:",
        content: "Latte JR LLC"
      },
      {
        id: "businessStreetAddress",
        title: "Business street address:",
        content: kybFormData?.businessStreetAddress.addressLine1
      },
      {
        id: "employeeIdentificationNumber",
        title: "Employee Identification Number (EIN):",
        content: toPattern(kybFormData?.businessTin ?? "", EIN_PATTERN)
      },
      {
        id: "businessWebsite",
        title: "Business website:",
        content: kybFormData?.businessWebsite
      },
      {
        id: "businessStage",
        title: "Business stage:",
        content:
          "Idea stage:Conceptualization and validation of the business idea"
      },
      {
        id: "businessDescription",
        title: "Business description:",
        content: kybFormData?.metadata?.companyDescription
      }
    ]
  }
  return { businessInformationDetail }
}
