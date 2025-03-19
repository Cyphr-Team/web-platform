import { Progress } from "@/components/ui/progress"
import { LoadingOverlay } from "@/shared/atoms/LoadingOverlay"
import { ApplicationDetailsHeader } from "@/shared/molecules/ApplicationDetailsHeader"
import { Loader2 } from "lucide-react"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { isEnableChatSupport } from "@/utils/feature-flag.utils"
import { ChatSupportButton } from "@/modules/chat-support/components/ChatSupportButton"
import { isCyphrBank } from "@/utils/domain.utils"
import { useGetFormByStep } from "@/modules/loan-application/hooks/utils/useGetFormByStep.tsx"
import {
  useBRLoanApplicationDetailsContext,
  useLoanApplicationFormContext,
  useLoanApplicationProgressContext
} from "@/modules/loan-application/providers"
import { LoanProgramDetailProvider } from "@/modules/loan-application/providers/LoanProgramDetailProvider.tsx"

export function Component() {
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
        className="relative z-30 h-2 overflow-visible rounded-none bg-background-disabled"
        indicatorClassName="after:absolute after:bottom-2.5 after:right-0 after:hidden after:text-xs after:text-text-secondary after:content-[attr(data-percentvalue)] after:md:block"
        value={percentComplete}
      />

      {isFetchingDetails ? (
        <div className="flex size-full items-center justify-center">
          <Loader2 className="m-2 size-8 animate-spin text-primary transition-all ease-out" />
        </div>
      ) : null}
      <LoanProgramDetailProvider>
        <div
          ref={containerRef}
          className={cn(
            "flex h-full flex-1 flex-col overflow-auto py-6 pt-8",
            isFetchingDetails && "hidden"
          )}
        >
          <LoadingOverlay isLoading={isSubmitting}>
            <div className="grid w-full grid-cols-8">{componentByStep}</div>
            {(isEnableChatSupport() || isCyphrBank()) && <ChatSupportButton />}
          </LoadingOverlay>
        </div>
      </LoanProgramDetailProvider>
    </>
  )
}

Component.displayName = "LoanApplicationEdit"

export default Component
