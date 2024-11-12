import { Badge } from "@/components/ui/badge"
import { type InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { snakeCaseToText } from "@/utils"
import { type ReactNode } from "react"

export function MiddeskBadge({
  status,
  label
}: {
  status?: InsightStatus
  label?: ReactNode
}) {
  if (!status) return ""

  return (
    <Badge
      border
      isDot
      className="rounded-lg text-sm capitalize"
      isDotBefore={false}
      variant="soft"
      variantColor={getBadgeVariantByInsightStatus(status)}
    >
      {label || snakeCaseToText(status.toLowerCase())}
    </Badge>
  )
}
