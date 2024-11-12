import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service.ts"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type.ts"

export function CashFlowConnectedBadge() {
  return (
    <Badge
      isDot
      isDotBefore
      className="rounded-full border-none py-1 text-sm font-medium capitalize text-green-700"
      variant="outline"
      variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.SUCCESS)}
    >
      Connected
    </Badge>
  )
}

export function CashFlowPendingBadge() {
  return (
    <Badge
      isDot
      isDotBefore
      className="rounded-full py-1 text-sm font-medium capitalize"
      variant="soft"
      variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.PENDING)}
    >
      Pending
    </Badge>
  )
}
