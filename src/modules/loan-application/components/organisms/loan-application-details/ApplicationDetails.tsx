import { FinancialFormDetails } from "../../molecules/loan-application-details/FinancialFormDetails"
import { KybFormDetails } from "../../molecules/loan-application-details/KybFormDetails"
import { KycFormDetails } from "../../molecules/loan-application-details/KycFormDetails"
import { LoanRequestDetails } from "../../molecules/loan-application-details/LoanRequestDetails"
import { CashFlowTable } from "./CashFlowTable"
import { isLoanReady } from "@/utils/domain.utils"
import { cn } from "@/lib/utils"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { CurrentLoanFormDetails } from "@/modules/loan-application/components/molecules/loan-application-details/CurrentLoanFormDetails.tsx"
import { OperatingExpensesFormDetails } from "@/modules/loan-application/components/molecules/loan-application-details/OperatingExpenseFormDetails.tsx"

export const ApplicationDetails = () => {
  const {
    kybFormData,
    kycFormData,
    currentLoanFormData,
    operatingExpensesFormData
  } = useBRLoanApplicationDetailsContext()
  console.log(kybFormData)
  console.log(kycFormData)
  console.log(currentLoanFormData)
  console.log(operatingExpensesFormData)
  return (
    <div className={cn("flex flex-col gap-2", "md:grid md:grid-cols-4")}>
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Application</h3>
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-4">
          <LoanRequestDetails />
          <KybFormDetails kybFormData={kybFormData} />
          <KycFormDetails kycFormData={kycFormData} />
          <CurrentLoanFormDetails currentLoanFormData={currentLoanFormData} />
          <OperatingExpensesFormDetails
            operatingExpensesFormData={operatingExpensesFormData}
          />
          <FinancialFormDetails />
          {isLoanReady() && <CashFlowTable />}
        </div>
      </div>
    </div>
  )
}
