import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service.ts"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type.ts"

export function CashFlowConnectedBadge() {
  return (
    <Badge
      isDot
      isDotBefore
      className="capitalize text-sm rounded-full font-medium py-1 text-green-700 border-none"
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
      className="capitalize text-sm rounded-full font-medium py-1"
      variant="soft"
      variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.PENDING)}
    >
      Pending
    </Badge>
  )
}
