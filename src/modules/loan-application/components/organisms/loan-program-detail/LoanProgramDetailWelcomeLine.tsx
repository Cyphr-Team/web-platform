import { Skeleton } from "@/components/ui/skeleton"
import { useLoanProgramDetailContext } from "@/modules/loan-application/providers"

export const LoanProgramDetailWelcomeLine = () => {
  const { loanProgramInfo, isLoading } = useLoanProgramDetailContext()

  return (
    <section>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">
        {isLoading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          loanProgramInfo?.name
        )}
      </h2>
      <div className="text-xl whitespace-pre-wrap">
        {isLoading ? (
          <Skeleton className="w-full h-8" />
        ) : (
          loanProgramInfo?.description
        )}
      </div>
    </section>
  )
}
