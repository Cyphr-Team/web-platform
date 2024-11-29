import { UnusedReportBanner } from "@/modules/loanready/components/organisms/UnusedReportBanner"
import { type LoanReadyPlanEnum } from "@/modules/loanready/constants/package"
import { type LoanReadySubscription } from "@/modules/loanready/constants/types/subscription.type"

export interface UnusedReportBannerListProps {
  loanProgramId?: string
  subscriptions: LoanReadySubscription[]
}

export function UnusedReportBannerList({
  loanProgramId,
  subscriptions
}: UnusedReportBannerListProps) {
  return (
    <div className="overflow-y-auto max-h-[10vh] mt-6">
      {subscriptions?.map((subscription) => (
        <UnusedReportBanner
          key={subscription.paymentTransactionId}
          loanProgramId={loanProgramId}
          paymentTransactionId={subscription.paymentTransactionId}
          plan={subscription.plan.toUpperCase() as LoanReadyPlanEnum}
          purchaseDate={
            subscription.purchasedAt
              ? new Date(subscription.purchasedAt)
              : new Date()
          }
        />
      ))}
    </div>
  )
}
