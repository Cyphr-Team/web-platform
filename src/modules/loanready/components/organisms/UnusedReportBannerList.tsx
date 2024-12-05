import { Separator } from "@/components/ui/separator"
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
    <div className="overflow-y-auto max-h-44 mt-6 border-dashed border border-[#4F6161] rounded-lg shadow-md">
      {subscriptions?.map((subscription, index) => (
        <div key={subscription.paymentTransactionId} className="flex flex-col">
          <UnusedReportBanner
            loanProgramId={loanProgramId}
            paymentTransactionId={subscription.paymentTransactionId}
            plan={subscription.plan.toUpperCase() as LoanReadyPlanEnum}
            purchaseDate={
              subscription.purchasedAt
                ? new Date(subscription.purchasedAt)
                : new Date()
            }
          />
          {index == subscriptions.length - 1 ? null : (
            <div className="mx-4">
              <Separator className="bg-[#4F6161]" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
