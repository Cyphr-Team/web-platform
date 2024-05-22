import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import { LoanType } from "@/types/loan-program.type"
import { Loader2 } from "lucide-react"
import { useEffect, useMemo, useRef } from "react"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../providers"
import { LoanProgramDetailProvider } from "../providers/LoanProgramDetailProvider"
import { PlaidProvider } from "../providers/PlaidProvider"
import { getFormStrategy } from "../services/form.services"
import { LoadingOverlay } from "@/shared/atoms/LoadingOverlay"
import { isKccBank, isLoanReady } from "@/utils/domain.utils"
import { Progress } from "@/components/ui/progress"

export const LoanApplicationEdit = () => {
  const { isFetchingDetails, loanProgramDetails } =
    useBRLoanApplicationDetailsContext()
  const { step, percentComplete } = useLoanApplicationProgressContext()
  const { isSubmitting } = useLoanApplicationFormContext()
  const getLoanType = () => {
    if (isLoanReady()) {
      return LoanType.READINESS
    }
    if (isKccBank()) {
      return LoanType.LENDERS_FORUM
    }
    return loanProgramDetails?.type ?? LoanType.MICRO
  }

  const loanType = getLoanType()
  const formStrategy = useMemo(() => getFormStrategy(loanType), [loanType])
  /**
   * Implement scroll to top when navigate step
   */
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.scrollTop = 0
  }, [step])

  return (
    <>
      <ApplicationDetailsHeader />
      <Progress
        value={percentComplete}
        className="h-2 rounded-none bg-background-disabled overflow-visible z-30 relative"
        indicatorClassName="after:hidden after:md:block after:content-[attr(attr-percentValue)] after:absolute after:right-0 after:bottom-2.5 after:text-xs after:text-text-secondary"
      />

      {isFetchingDetails ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="m-2 h-8 w-8 transition-all ease-out animate-spin text-primary" />
        </div>
      ) : (
        <PlaidProvider>
          <LoanProgramDetailProvider>
            <div
              ref={containerRef}
              className="flex h-full overflow-auto flex-1 py-6 flex-col pt-8"
            >
              <LoadingOverlay isLoading={isSubmitting}>
                <div className="grid grid-cols-8 w-full">
                  {formStrategy.getFormComponent(step)?.component}
                </div>
              </LoadingOverlay>
            </div>
          </LoanProgramDetailProvider>
        </PlaidProvider>
      )}
    </>
  )
}
