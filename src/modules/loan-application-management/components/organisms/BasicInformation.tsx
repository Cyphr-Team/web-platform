import { LoanInformationCard } from "../atoms/LoanInformationCard"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { SkeletonCard } from "@/components/ui/skeleton"

const BasicInformationSkeleton = () => {
  return (
    <div className="flex w-full px-4xl gap-3xl">
      <div className="flex space-x-xl">
        <SkeletonCard isCircle className="flex flex-row" />
      </div>
      <div className="flex gap-xl md:gap-2xl lg:gap-3xl flex-1">
        <SkeletonCard numberOfLines={0} className="flex-1 w-auto" />
        <SkeletonCard numberOfLines={0} className="flex-1 w-auto" />
        <SkeletonCard numberOfLines={0} className="flex-1 w-auto" />
      </div>
    </div>
  )
}

export const BasicInformation = () => {
  const { isLoading, loanKybDetail, loanApplicationDetails } =
    useLoanApplicationDetailContext()

  if (isLoading) return <BasicInformationSkeleton />

  return (
    <div className="flex gap-xl md:gap-2xl lg:gap-3xl flex-1 w-full px-4xl">
      <LoanInformationCard
        title="Business Name"
        content={loanKybDetail?.businessName?.value ?? "N/A"}
      />
      <LoanInformationCard
        title="Loan Program"
        content={loanApplicationDetails?.loanProgram?.name ?? "N/A"}
      />
      <LoanInformationCard
        title="Loan Amount Requested"
        content={loanApplicationDetails?.loanAmount?.toLocaleString() ?? "N/A"}
      />
      <LoanInformationCard
        title="Proposed Use of Loan"
        content={loanApplicationDetails?.proposeUseOfLoan ?? "N/A"}
      />
    </div>
  )
}
