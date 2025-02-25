import { useMemo } from "react"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils.ts"
import { useGetLoanReadySubscriptionByApplicationId } from "@/modules/loanready/hooks/payment/useGetLoanReadySubscriptionByApplicationId.ts"
import { isLoanReady } from "@/utils/domain.utils.ts"
import { checkIsLoanApplicant } from "@/utils/check-roles.ts"

interface UseCheckLoanReadyPlanProps {
  applicationId?: string
}

export function useCheckLoanReadyPlan({
  applicationId = ""
}: UseCheckLoanReadyPlanProps) {
  const { data: loanReadySubscription, isLoading } =
    useGetLoanReadySubscriptionByApplicationId({
      applicationId,
      enabled: isLoanReady() && isEnableLoanReadyV2() && checkIsLoanApplicant()
    })

  const isPlusPlan = useMemo(
    () =>
      loanReadySubscription?.subscriptions?.some(
        (subscription) =>
          subscription.plan.toUpperCase() === LoanReadyPlanEnum.PLUS
      ),
    [loanReadySubscription]
  )

  return {
    isPlusPlan,
    isLoading
  }
}
