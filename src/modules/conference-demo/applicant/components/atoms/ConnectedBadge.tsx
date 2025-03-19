import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service.ts"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type.ts"

export function ConnectedBadge() {
  return (
    <Badge
      border
      isDot
      className="rounded-lg text-sm capitalize"
      isDotBefore={false}
      variant="soft"
      variantColor={getBadgeVariantByInsightStatus(TaskFieldStatus.SUCCESS)}
    >
      Connected
    </Badge>
  )
}
