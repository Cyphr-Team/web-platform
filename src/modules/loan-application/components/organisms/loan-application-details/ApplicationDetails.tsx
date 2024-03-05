import { FinancialFormDetails } from "../../molecules/loan-application-details/FinancialFormDetails"
import { KybFormDetails } from "../../molecules/loan-application-details/KybFormDetails"
import { KycFormDetails } from "../../molecules/loan-application-details/KycFormDetails"
import { LoanRequestDetails } from "../../molecules/loan-application-details/LoanRequestDetails"

export const ApplicationDetails = () => {
  return (
    <div className="grid grid-cols-4 ">
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Application</h3>
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-4">
          <LoanRequestDetails />
          <KybFormDetails />
          <KycFormDetails />
          <FinancialFormDetails />
        </div>
      </div>
    </div>
  )
}
