import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import { useBRLoanApplicationDetailsContext } from "../providers/BRLoanApplicationDetailsProvider"
import { Loader2 } from "lucide-react"
import { LoanRequest } from "../components/layouts/LoanRequest"
import { AlertFinishFormBeforeLeave } from "../components/molecules/alerts/AlertFinishFormRequest"
import { BusinessInformationForm } from "../components/organisms/BusinessInformationForm"
import { ConfirmationForm } from "../components/organisms/ConfirmationForm"
import { FinancialInformationForm } from "../components/organisms/FinancialInformationForm"
import { LoanApplicationStepNavigate } from "../components/organisms/LoanApplicationStepNavigate"
import { OwnerInformationForm } from "../components/organisms/OwnerInformationForm"
import { LOAN_APPLICATION_STEPS } from "../constants"
import { LoanProgramDetailProvider } from "../providers/LoanProgramDetailProvider"
import { PlaidProvider } from "../providers/PlaidProvider"
import { useLoanApplicationProgressContext } from "../providers"
import { isLoanReady } from "@/utils/domain.utils"
import { CashFlowVerificationForm } from "../components/organisms/CashFlowVerificationForm"
import { LoanApplicationFormProvider } from "../providers/LoanApplicationFormProvider"

export const LoanApplicationEdit = () => {
  const { isFetchingDetails } = useBRLoanApplicationDetailsContext()
  const { step } = useLoanApplicationProgressContext()

  return (
    <>
      <ApplicationDetailsHeader />
      {isFetchingDetails ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="m-2 h-8 w-8 transition-all ease-out animate-spin text-primary" />
        </div>
      ) : (
        <PlaidProvider>
          <LoanApplicationFormProvider>
            <LoanProgramDetailProvider>
              <div className="flex h-full overflow-auto flex-1 py-6 pt-0 flex-col">
                <div className="pt-2 sticky top-0 z-10 bg-white shadow-md mb-4 px-2">
                  <LoanApplicationStepNavigate />
                </div>
                <div className="grid grid-cols-8">
                  {step === LOAN_APPLICATION_STEPS.LOAN_REQUEST && (
                    <LoanRequest />
                  )}
                  {step === LOAN_APPLICATION_STEPS.BUSINESS_INFORMATION && (
                    <BusinessInformationForm />
                  )}
                  {step === LOAN_APPLICATION_STEPS.OWNER_INFORMATION && (
                    <OwnerInformationForm />
                  )}
                  {step === LOAN_APPLICATION_STEPS.FINANCIAL_INFORMATION &&
                    (!isLoanReady() ? (
                      <FinancialInformationForm />
                    ) : (
                      <CashFlowVerificationForm />
                    ))}
                  {step === LOAN_APPLICATION_STEPS.CONFIRMATION && (
                    <ConfirmationForm />
                  )}
                </div>
              </div>
              <AlertFinishFormBeforeLeave />
            </LoanProgramDetailProvider>
          </LoanApplicationFormProvider>
        </PlaidProvider>
      )}
    </>
  )
}
