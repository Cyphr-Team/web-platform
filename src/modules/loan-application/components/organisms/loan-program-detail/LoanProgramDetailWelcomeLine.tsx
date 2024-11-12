import { Skeleton } from "@/components/ui/skeleton"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { isLaunchKC } from "@/utils/domain.utils"
import { sanitizeDOM } from "@/utils/file.utils"

export function LoanProgramDetailWelcomeLine() {
  const { isLoading, loanProgramDetails } = useLoanProgramDetailContext()

  const welcomeMessage = isLaunchKC()
    ? `Welcome to ${loanProgramDetails?.name}`
    : loanProgramDetails?.name

  return (
    <section>
      <h2 className="mb-6 text-[2rem] font-semibold">
        {isLoading ? <Skeleton className="h-8 w-full" /> : welcomeMessage}
      </h2>
      <div className="whitespace-pre-wrap text-base">
        {isLoading ? (
          <Skeleton className="h-8 w-full" />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizeDOM(loanProgramDetails?.description)
            }}
            className="text-justify"
          />
        )}
      </div>
    </section>
  )
}
