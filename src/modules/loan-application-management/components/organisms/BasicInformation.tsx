import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"
import { Skeleton } from "@/components/ui/skeleton"
import { toCurrency } from "@/utils"
import { Badge } from "@/components/ui/badge"
import { ChangeApplicationStatusButton } from "../atoms/ChangeApplicationStatusButton"
import { getUseOfLoan } from "../../services"
import { isKccBank, isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils"
import {
  isEnableFormV2,
  isEnableLoanReadyV2
} from "@/utils/feature-flag.utils.ts"
import { type UseOfLoan } from "@/types/loan-application.type.ts"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { CustomLabelKey } from "@/utils/crumb.utils"

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

  const businessName =
    loanKybDetail?.businessDetails?.name?.value ??
    loanSummary?.kybForm?.businessLegalName ??
    "---"

  const breadcrumbs = useBreadcrumb({
    customLabel: {
      [CustomLabelKey.loanApplicationDetail]: businessName
    },
    ids: {
      [CustomLabelKey.loanApplicationDetail]: loanApplicationDetails?.id ?? ""
    }
  })

  if (isLoading) return <BasicInformationSkeleton />

  const loanAmount = isEnableFormV2()
    ? loanSummary?.loanRequestForm?.amount
    : loanApplicationDetails?.loanAmount

  const proposeUseOfLoan = (
    isEnableFormV2()
      ? loanSummary?.loanRequestForm?.proposeUseOfLoan
      : loanApplicationDetails?.proposeUseOfLoan
  ) as UseOfLoan

  const applicationTitle = [businessName, toCurrency(loanAmount, 0)]
    .filter((v) => !!v)
    .join(" • ")

  return (
    <>
      {isLoanReady() && isEnableLoanReadyV2() && (
        <div className="ml-4xl">
          <Breadcrumbs breads={breadcrumbs} className="px-0" />
        </div>
      )}
      <div className="flex w-full flex-1 flex-wrap items-center justify-between gap-2 px-4xl lg:gap-4">
        <div className="flex flex-1 flex-wrap items-center gap-2 lg:gap-4">
          <h1 className="whitespace-nowrap text-3xl font-semibold">
            {isSbb() ? businessName : applicationTitle}
          </h1>
          {!isKccBank() && !isLaunchKC() && !isSbb() && (
            <div className="flex flex-wrap gap-2">
              <Badge className="h-7 border px-lg py-xs">
                <p className="text-sm font-medium">
                  {getUseOfLoan(proposeUseOfLoan)}
                </p>
              </Badge>
            </div>
          )}
        </div>

        <ChangeApplicationStatusButton />
      </div>
    </>
  )
}
