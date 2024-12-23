import { Skeleton } from "@/components/ui/skeleton"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { isCapitalCollab, isLaunchKC, isLoanReady } from "@/utils/domain.utils"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils"
import { sanitizeDOM } from "@/utils/file.utils"

export function LoanProgramDetailWelcomeLine() {
  const { isLoading, loanProgramDetails } = useLoanProgramDetailContext()

  const getWelcomeMessage = () => {
    if (isLaunchKC()) {
      return `Welcome to ${loanProgramDetails?.name}`
    }

    if (isLoanReady() && isEnableLoanReadyV2()) {
      return "Welcome to LoanReady: Your Path to Small Business Success"
    }

    if (isCapitalCollab()) {
      return "Welcome to Capital Collab: Your Business Funding Partner. Your Path to Smarter Financing Starts Here"
    }

    return loanProgramDetails?.name
  }

  const getDescription = () => {
    if (isLoanReady() && isEnableLoanReadyV2()) {
      return "Ready to grow your business? LoanReady is here to help you assess, prepare, and succeed in your funding journey."
    }

    return loanProgramDetails?.description
  }

  return (
    <section>
      <h2 className="mb-6 text-[2rem] font-semibold">
        {isLoading ? <Skeleton className="h-8 w-full" /> : getWelcomeMessage()}
      </h2>
      <div className="whitespace-pre-wrap text-base">
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizeDOM(getDescription())
            }}
            className="text-justify"
          />
        )}
      </div>
    </section>
  )
}
