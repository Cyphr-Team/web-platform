import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { SkeletonCard } from "@/components/ui/skeleton"
import { toCurrency } from "@/utils"
import { Badge } from "@/components/ui/badge"

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

  const loanAmount = loanApplicationDetails?.loanAmount
    ? toCurrency(loanApplicationDetails?.loanAmount, 0)
    : "$-"

  return (
    <div className="flex gap-2 lg:gap-4 flex-1 w-full px-4xl items-center flex-wrap">
      <h1 className="text-3xl font-semibold whitespace-nowrap">
        {loanKybDetail?.businessName?.value ?? ""}{" "}
        {!!loanKybDetail?.businessName?.value && "•"} {loanAmount}
      </h1>
      <div className="flex gap-2 flex-wrap">
        {loanKybDetail?.industryClassification?.map((item, index) => (
          <Badge key={index} className="py-xs px-lg border h-7">
            <p className="text-sm font-medium">{item}</p>
          </Badge>
        ))}
      </div>
    </div>
  )
}
