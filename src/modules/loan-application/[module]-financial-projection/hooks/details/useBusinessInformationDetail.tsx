import { toPattern } from "@/components/ui/mask-input"
import { EIN_PATTERN } from "@/constants"
import { type FinancialApplicationDetailData } from "@/modules/loan-application/[module]-financial-projection/hooks/type"
import { BUSINESS_STAGE_OPTIONS } from "@/modules/loan-application/components/organisms/loan-application-form/kyb/loanready/const"
import { formatBusinessStreetAddress } from "@/modules/loan-application/constants"
import { type LoanReadyBusinessFormValue } from "@/modules/loan-application/constants/form.kyb"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type"

interface UseBusinessInformationDetailProps {
  businessInformationFormValue?: LoanReadyBusinessFormValue
}

export const useBusinessInformationDetail = ({
  businessInformationFormValue
}: UseBusinessInformationDetailProps) => {
  const businessInformationDetail: FinancialApplicationDetailData = {
    id: LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION,
    title: "Business Information",
    financialApplicationFormData: [
      {
        id: "businessLegalName",
        title: "Business legal name:",
        content: businessInformationFormValue?.businessLegalName
      },
      {
        id: "businessTradeName",
        title: "Business trade name/DBA:",
        content: businessInformationFormValue?.dba
      },
      {
        id: "businessStreetAddress",
        title: "Business street address:",
        content: formatBusinessStreetAddress({
          addressLine1: businessInformationFormValue?.addressLine1 ?? "",
          addressLine2: businessInformationFormValue?.addressLine2 ?? "",
          city: businessInformationFormValue?.city ?? "",
          state: businessInformationFormValue?.state ?? "",
          postalCode: businessInformationFormValue?.postalCode ?? ""
        })
      },
      {
        id: "employeeIdentificationNumber",
        title: "Employee Identification Number (EIN):",
        content: toPattern(
          businessInformationFormValue?.businessTin ?? "",
          EIN_PATTERN
        )
      },
      {
        id: "businessWebsite",
        title: "Business website:",
        content: businessInformationFormValue?.businessWebsite
      },
      {
        id: "businessStage",
        title: "Business stage:",
        content: BUSINESS_STAGE_OPTIONS.find(
          (stage) => stage.value === businessInformationFormValue?.businessStage
        )?.label
      },
      {
        id: "businessDescription",
        title: "Business description:",
        content: businessInformationFormValue?.businessDescription
      }
    ]
  }

  return { businessInformationDetail }
}
