import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import { useBRLoanApplicationDetailsContext } from "../providers/BRLoanApplicationDetailsProvider"
import { Loader2 } from "lucide-react"
import { AlertFinishFormBeforeLeave } from "../components/molecules/alerts/AlertFinishFormRequest"
import { LoanApplicationStepNavigate } from "../components/organisms/LoanApplicationStepNavigate"
import { LoanProgramDetailProvider } from "../providers/LoanProgramDetailProvider"
import { PlaidProvider } from "../providers/PlaidProvider"
// import { useLoanApplicationProgressContext } from "../providers"
// import { getFormStrategy } from "@/utils/domain.utils"

export const LoanApplicationEdit = () => {
  const { isFetchingDetails } = useBRLoanApplicationDetailsContext()
  // const { step } = useLoanApplicationProgressContext()
  // const strategy = getFormStrategy()
  // const forms = strategy.formsComponents

  return (
    <>
      <ApplicationDetailsHeader />
      {isFetchingDetails ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="m-2 h-8 w-8 transition-all ease-out animate-spin text-primary" />
        </div>
      ) : (
        <PlaidProvider>
          <LoanProgramDetailProvider>
            <div className="flex h-full overflow-auto flex-1 py-6 pt-0 flex-col">
              <div className="pt-2 sticky top-0 z-10 bg-white shadow-md mb-4 px-2">
                <LoanApplicationStepNavigate />
              </div>
              <div className="grid grid-cols-8">
                {/**
                   forms.forEach((form) => {
                  if (step == form.step) {
                    form.component
                  }
                })
                   */}
              </div>
            </div>
            <AlertFinishFormBeforeLeave />
          </LoanProgramDetailProvider>
        </PlaidProvider>
      )}
    </>
  )
}
