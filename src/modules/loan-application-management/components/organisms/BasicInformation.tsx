import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { Skeleton } from "@/components/ui/skeleton"
import { toCurrency } from "@/utils"
import { Badge } from "@/components/ui/badge"
import { ChangeApplicationStatusButton } from "../atoms/ChangeApplicationStatusButton"
import { getUseOfLoan } from "../../services"
import { isKccBank, isLaunchKC, isSbb } from "@/utils/domain.utils"

function BasicInformationSkeleton() {
  return (
    <div className="flex w-full gap-3xl px-4xl">
      <Skeleton className="h-8 w-96" />
    </div>
  )
}

export function BasicInformation() {
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
    <div className="flex w-full flex-1 flex-wrap items-center justify-between gap-2 px-4xl lg:gap-4">
      <div className="flex flex-1 flex-wrap items-center gap-2 lg:gap-4">
        <h1 className="whitespace-nowrap text-3xl font-semibold">
          {isSbb() ? businessName : applicationTitle}
        </h1>
        {!isKccBank() && !isLaunchKC() && !isSbb() && (
          <div className="flex flex-wrap gap-2">
            <Badge className="h-7 border px-lg py-xs">
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
