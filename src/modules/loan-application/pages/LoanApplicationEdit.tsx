import { Progress } from "@/components/ui/progress"
import { LoadingOverlay } from "@/shared/atoms/LoadingOverlay"
import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import { Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"
import { useGetFormByStep } from "../hooks/useGetFormByStep"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "../providers"
import { LoanProgramDetailProvider } from "../providers/LoanProgramDetailProvider"

export const LoanApplicationEdit = () => {
  const { isFetchingDetails } = useBRLoanApplicationDetailsContext()
  const { step, percentComplete } = useLoanApplicationProgressContext()
  const { isSubmitting } = useLoanApplicationFormContext()
  const componentByStep = useGetFormByStep(step)

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
        indicatorClassName="after:hidden after:md:block after:content-[attr(data-percentvalue)] after:absolute after:right-0 after:bottom-2.5 after:text-xs after:text-text-secondary"
      />

      {isFetchingDetails ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader2 className="m-2 h-8 w-8 transition-all ease-out animate-spin text-primary" />
        </div>
      ) : (
        <LoanProgramDetailProvider>
          <div
            ref={containerRef}
            className="flex h-full overflow-auto flex-1 py-6 flex-col pt-8"
          >
            <LoadingOverlay isLoading={isSubmitting}>
              <div className="grid grid-cols-8 w-full">{componentByStep}</div>
            </LoadingOverlay>
          </div>
        </LoanProgramDetailProvider>
      )}
    </>
  )
}
