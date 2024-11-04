import { CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service.ts"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type.ts"

export function CashFlowConnectedBadge() {
  return (
    <div className="text-sm rounded-lg flex items-center border border-success justify-center gap-1 font-semibold text-success bg-white h-8 lg:h-10 px-2 lg:px-4 py-2">
      <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-white fill-green-600" />
      Connected
    </div>
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
