import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { BUSINESS_STAGE_OPTIONS } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import { formatBusinessStreetAddress } from "@/modules/loan-application/constants"
import { type KYBInformationResponse } from "@/modules/loan-application/constants/type"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface UseBusinessInformationDetailProps {
  kybFormData?: KYBInformationResponse
}

export const useBusinessInformationDetail = ({
  kybFormData
}: UseBusinessInformationDetailProps) => {
  const businessInformationDetail: FinancialApplicationDetailData = {
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
        content: formatBusinessStreetAddress(kybFormData?.businessStreetAddress)
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
        content: BUSINESS_STAGE_OPTIONS.find(
          (stage) => stage.value === kybFormData?.metadata?.businessStage
        )?.label
      },
      {
        id: "businessDescription",
        title: "Business description:",
        content: kybFormData?.metadata?.businessDescription
      }
    ]
  }

  return { businessInformationDetail }
}
