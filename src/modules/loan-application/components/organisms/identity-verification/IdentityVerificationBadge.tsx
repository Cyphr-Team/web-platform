import { Badge } from "@/components/ui/badge"
import { snakeCaseToText } from "@/utils"
import { ReactNode } from "react"
import { getBadgeVariantByIdentityVerificationStatus } from "../../../../loan-application-management/services/identity-verification.service"
import { IdentityVerificationStatus } from "../../../../loan-application-management/constants/types/smart-kyc"

export const IdentityVerificationBadge = ({
  status,
  label
}: {
  status?: IdentityVerificationStatus
  label?: ReactNode
}) => {
  if (!status) return ""

  return (
    <Badge
      isDot
      variant="soft"
      variantColor={getBadgeVariantByIdentityVerificationStatus(status)}
      className="capitalize text-sm rounded-lg"
      isDotBefore={false}
      border
    >
      {label || snakeCaseToText(status.toLowerCase())}
    </Badge>
  )
}
