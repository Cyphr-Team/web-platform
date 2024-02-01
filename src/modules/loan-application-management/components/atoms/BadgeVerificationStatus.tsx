import { KYB_VERIFIED_FIELD_STATUS } from "../../constants/type"
import { VerificationIcon } from "./VerificationIcon"
import { getClassNameFromStatus } from "../../services"
import { KYC_STATUS } from "../../constants/types/kyc"
import { Badge } from "@/components/ui/badge"

type Props = {
  status?: KYB_VERIFIED_FIELD_STATUS | KYC_STATUS
}

export const BadgeVerificationStatus: React.FC<Props> = ({ status }) => {
  const className = getClassNameFromStatus(status)
  return (
    <Badge
      className={`space-x-xs py-md px-lg bg-${className}-secondary border border-${className} w-fit rounded-lg`}
    >
      <VerificationIcon status={status} />
      <p className={`text-sm font-medium text-${className}`}>{status}</p>
    </Badge>
  )
}
