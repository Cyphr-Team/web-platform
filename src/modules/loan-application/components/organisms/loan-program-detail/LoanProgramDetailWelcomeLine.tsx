import { Skeleton } from "@/components/ui/skeleton"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { isLaunchKC } from "@/utils/domain.utils"
import { sanitizeDOM } from "@/utils/file.utils"

export const LoanProgramDetailWelcomeLine = () => {
  const { isLoading, loanProgramDetails } = useLoanProgramDetailContext()

  const welcomeMessage = isLaunchKC()
    ? `Welcome to ${loanProgramDetails?.name}`
    : loanProgramDetails?.name

  return (
    <section>
      <h2 className="text-[2rem] font-semibold mb-6">
        {isLoading ? <Skeleton className="w-full h-8" /> : welcomeMessage}
      </h2>
      <div className="text-base whitespace-pre-wrap">
        {isLoading ? (
          <Skeleton className="w-full h-8" />
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
