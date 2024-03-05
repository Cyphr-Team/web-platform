import { Badge } from "@/components/ui/badge"
import { MiddeskStatus } from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { snakeCaseToText } from "@/utils"
import { ReactNode } from "react"

export const MiddeskBadge = ({
  status,
  label
}: {
  status?: MiddeskStatus
  label?: ReactNode
}) => {
  if (!status) return ""

  return (
    <Badge
      isDot
      variant="soft"
      variantColor={getBadgeVariantByMiddeskStatus(status)}
      className="capitalize text-sm rounded-lg"
      isDotBefore={false}
      border
    >
      {label || snakeCaseToText(status.toLowerCase())}
    </Badge>
  )
}
