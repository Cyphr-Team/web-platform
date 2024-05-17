import { Card } from "@/components/ui/card"
import { TextInputDisplay } from "../../atoms/TextInputDisplay"
import { CurrentLoansInformationResponse } from "@/modules/loan-application/constants/type"
import { toCurrency } from "@/utils"

interface CurrentLoanFormDetailsProps {
  currentLoanFormData?: CurrentLoansInformationResponse
}

export const CurrentLoanFormDetails: React.FC<CurrentLoanFormDetailsProps> = ({
  currentLoanFormData
}) => {
  return (
    <Card className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto">
      <h5 className="text-lg font-semibold">Current Loans</h5>
      {currentLoanFormData?.currentLoanForms.map((loanForm, index) => (
        <div key={index} className="grid grid-cols-6 gap-y-2xl gap-x-4xl">
          <div className="col-span-6 text-1xl font-semibold">
            Loan #{index + 1}:
          </div>
          <TextInputDisplay
            className="col-span-3"
            label="Lender name"
            value={loanForm.lenderName}
          />
          <TextInputDisplay
            className="col-span-2"
            label="Loan type"
            value={loanForm.loanType}
          />
          <TextInputDisplay
            className="col-span-3"
            label="Outstanding loan balance"
            value={toCurrency(loanForm.outstandingLoanBalance)}
          />
          <TextInputDisplay
            className="col-span-2"
            label="Monthly payment amount"
            value={toCurrency(loanForm.monthlyPaymentAmount)}
          />
          <TextInputDisplay
            className="col-span-3"
            label="Loan term remaining (in months)"
            value={loanForm.loanTermRemainingInMonths.toString()}
          />
        </div>
      ))}
    </Card>
  )
}
