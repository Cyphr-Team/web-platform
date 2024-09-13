import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { Skeleton } from "@/components/ui/skeleton"
import { toCurrency } from "@/utils"
import { Badge } from "@/components/ui/badge"
import { ChangeApplicationStatusButton } from "../atoms/ChangeApplicationStatusButton"
import { getUseOfLoan } from "../../services"
import { isKccBank, isLaunchKC, isSbb } from "@/utils/domain.utils"

const BasicInformationSkeleton = () => {
  return (
    <div className="flex w-full px-4xl gap-3xl">
      <Skeleton className="w-96 h-8" />
    </div>
  )
}

export const BasicInformation = () => {
  const { isLoading, loanKybDetail, loanApplicationDetails, loanSummary } =
    useLoanApplicationDetailContext()

  if (isLoading) return <BasicInformationSkeleton />

  const loanAmount = loanApplicationDetails?.loanAmount
    ? toCurrency(loanApplicationDetails?.loanAmount, 0)
    : ""

  const businessName =
    loanKybDetail?.businessDetails?.name?.value ??
    loanSummary?.kybForm?.businessLegalName ??
    "---"

  const applicationTitle = [businessName, loanAmount]
    .filter((v) => !!v)
    .join(" • ")

  return (
    <div className="flex gap-2 lg:gap-4 flex-1 w-full px-4xl items-center flex-wrap justify-between">
      <div className="flex gap-2 lg:gap-4 flex-1 items-center flex-wrap">
        <h1 className="text-3xl font-semibold whitespace-nowrap">
          {isSbb() ? businessName : applicationTitle}
        </h1>
        {!isKccBank() && !isLaunchKC() && !isSbb() && (
          <div className="flex gap-2 flex-wrap">
            <Badge className="py-xs px-lg border h-7">
              <p className="text-sm font-medium">
                {getUseOfLoan(loanApplicationDetails?.proposeUseOfLoan)}
              </p>
            </Badge>
          </div>
        )}
      </div>

      <ChangeApplicationStatusButton />
    </div>
  )
}
