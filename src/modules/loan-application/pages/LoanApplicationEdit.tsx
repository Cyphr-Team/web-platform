import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import { Loader2 } from "lucide-react"
import { AlertFinishFormBeforeLeave } from "../components/molecules/alerts/AlertFinishFormRequest"
import { LoanApplicationStepNavigate } from "../components/organisms/LoanApplicationStepNavigate"
import { LoanProgramDetailProvider } from "../providers/LoanProgramDetailProvider"
import { PlaidProvider } from "../providers/PlaidProvider"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../providers"
import { LoanType } from "@/types/loan-program.type"
import { useMemo } from "react"
import { getFormStrategy } from "../services/form.services"
import { LoadingOverlay } from "@/shared/atoms/LoadingOverlay"
import { isLoanReady } from "@/utils/domain.utils"

export const LoanApplicationEdit = () => {
  const { isFetchingDetails, loanProgramDetails } =
    useBRLoanApplicationDetailsContext()
  const { step } = useLoanApplicationProgressContext()
  const { isSubmitting } = useLoanApplicationFormContext()
  const loanType = isLoanReady()
    ? LoanType.READINESS
    : loanProgramDetails?.type ?? LoanType.MICRO
  const formStrategy = useMemo(() => getFormStrategy(loanType), [loanType])

  formStrategy.generateComponents()

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
              <LoadingOverlay isLoading={isSubmitting}>
                <div className="grid grid-cols-8 w-full">
                  {formStrategy.getFormComponent(step)?.component}
                </div>
              </LoadingOverlay>
            </div>
            <AlertFinishFormBeforeLeave />
          </LoanProgramDetailProvider>
        </PlaidProvider>
      )}
    </>
  )
}
