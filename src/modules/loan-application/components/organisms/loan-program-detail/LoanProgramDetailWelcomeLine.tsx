import { Skeleton } from "@/components/ui/skeleton"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"
import { sanitizeDOM } from "@/utils/file.utils"

export const LoanProgramDetailWelcomeLine = () => {
  const { isLoading, loanProgramDetails } = useLoanProgramDetailContext()

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        {isLoading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          loanProgramDetails?.name
        )}
      </h2>
      <div className="text-xl whitespace-pre-wrap">
        {isLoading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizeDOM(loanProgramDetails?.description)
            }}
          />
        )}
      </div>
    </section>
  )
}
