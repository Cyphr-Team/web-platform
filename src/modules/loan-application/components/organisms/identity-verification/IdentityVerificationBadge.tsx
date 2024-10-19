import { Badge } from "@/components/ui/badge"
import { snakeCaseToText } from "@/utils"
import { type ReactNode } from "react"
import { getBadgeVariantByIdentityVerificationStatus } from "../../../../loan-application-management/services/identity-verification.service"
import { type IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"

export function IdentityVerificationBadge({
  status,
  label
}: {
  status?: IdentityVerificationStatus
  label?: ReactNode
}) {
  if (!status) return ""

  return (
    <Badge
      border
      isDot
      className="capitalize text-sm rounded-lg"
      isDotBefore={false}
      variant="soft"
      variantColor={getBadgeVariantByIdentityVerificationStatus(status)}
    >
      {label || snakeCaseToText(status.toLowerCase())}
    </Badge>
  )
}
