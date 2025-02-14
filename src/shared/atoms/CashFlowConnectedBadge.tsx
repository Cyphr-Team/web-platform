import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service.ts"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type.ts"
import { cn } from "@/lib/utils"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"

export function CashFlowConnectedBadge() {
  return (
    <Badge
      isDot
      isDotBefore
      className={cn(
        "rounded-full border-none py-1 text-sm font-medium capitalize text-green-700",
        EXPORT_CLASS.NO_BACKGROUND_COLOR
      )}
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
      className={cn(
        "rounded-full py-1 text-sm font-medium capitalize",
        EXPORT_CLASS.NO_BACKGROUND_COLOR
      )}
      variant="soft"
      variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.PENDING)}
    >
      Pending
    </Badge>
  )
}
