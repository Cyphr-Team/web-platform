import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { KybLienDetails } from "../molecules/LienDetails"
import { KybState } from "../molecules/KybState"
import { KybInsights } from "../molecules/KybInsights"
import { KybReport } from "../molecules/KybReport"
import { SkeletonCard } from "@/components/ui/skeleton"

export const ComponentSkeleton = () => {
  return (
    <div className="flex gap-3xl w-full h-full">
      <SkeletonCard />
      <div className="flex flex-col gap-y-3xl flex-1 overflow-auto">
        <SkeletonCard className="w-full" />
        <div className="grid grid-cols-2 gap-x-3xl">
          <SkeletonCard className="w-full" />
          <SkeletonCard className="w-full" />
        </div>
      </div>
    </div>
  )
}

export const Component = () => {
  const { loanKybDetail, isLoading } = useLoanApplicationDetailContext()

  if (isLoading) return <ComponentSkeleton />

  return (
    <div className="lg:flex gap-3xl w-full">
      <KybInsights insights={loanKybDetail?.insights} />
      <div className="flex flex-col gap-y-3xl flex-1">
        <KybReport loanKybDetail={loanKybDetail} />
        <div className="flex flex-wrap gap-3xl">
          <KybState registrationStatus={loanKybDetail?.registrationStatus} />
          <KybLienDetails lienDetails={loanKybDetail?.liens} />
        </div>
      </div>
    </div>
  )
}
