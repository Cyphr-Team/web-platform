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
import { cn } from "@/lib/utils"
import { isEnableChatSupport } from "@/utils/feature-flag.utils"
import { ChatSupportButton } from "@/modules/chat-support/components/ChatSupportButton"
import { isCyphrBank } from "@/utils/domain.utils"

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
        indicatorClassName="after:hidden after:md:block after:content-[attr(data-percentvalue)] after:absolute after:right-0 after:bottom-2.5 after:text-xs after:text-text-secondary"
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
            "flex h-full overflow-auto flex-1 py-6 flex-col pt-8",
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
