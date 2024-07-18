import { Badge } from "@/components/ui/badge"
import { InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { snakeCaseToText } from "@/utils"
import { ReactNode } from "react"

export const MiddeskBadge = ({
  status,
  label
}: {
  status?: InsightStatus
  label?: ReactNode
}) => {
  if (!status) return ""

  return (
    <Badge
      isDot
      variant="soft"
      variantColor={getBadgeVariantByInsightStatus(status)}
      className="capitalize text-sm rounded-lg"
      isDotBefore={false}
      border
    >
      {label || snakeCaseToText(status.toLowerCase())}
    </Badge>
  )
}
