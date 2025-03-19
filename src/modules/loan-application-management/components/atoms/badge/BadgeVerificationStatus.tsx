import { type KYB_VERIFIED_FIELD_STATUS } from "../../../constants/type"
import { VerificationIcon } from "../VerificationIcon"
import { getClassNameFromStatus } from "../../../services"
import { type KYC_STATUS } from "../../../constants/types/kyc"
import { Badge } from "@/components/ui/badge"

interface Props {
  status?: KYB_VERIFIED_FIELD_STATUS | KYC_STATUS
}

export const BadgeVerificationStatus: React.FC<Props> = ({ status }) => {
  const className = getClassNameFromStatus(status)

  const badgeCssByStatus = {
    success: "bg-success-secondary border-success",
    error: "bg-error-secondary border-error",
    warning: "bg-warning-secondary border-warning"
  }

  const textCssByStatus = {
    success: "text-success",
    error: "text-error",
    warning: "text-warning"
  }

  return (
    <Badge
      className={`space-x-xs px-lg py-md ${badgeCssByStatus[className]} w-fit rounded-lg border`}
    >
      <VerificationIcon status={status} />
      <p
        className={`text-xl font-normal ${textCssByStatus[className]} capitalize`}
      >
        {status?.toLowerCase()}
      </p>
    </Badge>
  )
}
