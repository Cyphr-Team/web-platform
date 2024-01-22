import { LOAN_APPLICATION_STEPS } from "../../constants"
import { useLoanApplicationContext } from "../../providers"
import { PlaidProvider } from "../../providers/PlaidProvider"
import { BusinessInformationForm } from "../organisms/BusinessInformationForm"
import { ConfirmationForm } from "../organisms/ConfirmationForm"
import { FinancialInformationForm } from "../organisms/FinancialInformationForm"
import { OwnerInformationForm } from "../organisms/OwnerInformationForm"
import { ProgressSteps } from "../organisms/ProgressSteps"

export const Component = () => {
  const { step } = useLoanApplicationContext()

  return (
    <PlaidProvider>
      <div className={`flex flex-col w-full gap-6 md:flex-row max-w-screen-xl`}>
        <ProgressSteps />
        {step === LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION && (
          <BusinessInformationForm />
        )}{" "}
        {step === LOAN_APPLICATION_STEPS.OWNER_INFORMATION && (
          <OwnerInformationForm />
        )}
        {step === LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION && (
          <FinancialInformationForm />
        )}
        {step === LOAN_APPLICATION_STEPS.CONFIRMATION && <ConfirmationForm />}
      </div>
    </PlaidProvider>
  )
}
