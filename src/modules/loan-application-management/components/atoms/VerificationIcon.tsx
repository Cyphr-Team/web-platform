import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import { KYB_VERIFIED_FIELD_STATUS } from "../../constants/type"
import { cn } from "@/lib/utils"
import { KYC_STATUS } from "../../constants/types/kyc"

interface Props {
  status?: KYB_VERIFIED_FIELD_STATUS | KYC_STATUS
  className?: string
}

export const VerificationIcon: React.FC<Props> = ({ status, className }) => {
  switch (status) {
    case KYB_VERIFIED_FIELD_STATUS.WARNING:
    case KYC_STATUS.UNCHECKED:
    case KYC_STATUS.UNVERIFIED:
      return <AlertTriangle className={cn("size-6 text-warning", className)} />
    case KYB_VERIFIED_FIELD_STATUS.SUCCESS:
    case KYC_STATUS.PASSED:
    case KYC_STATUS.VERIFIED:
      return <CheckCircle className={cn("size-6 text-success", className)} />
    case KYB_VERIFIED_FIELD_STATUS.FAILURE:
    case KYC_STATUS.FAILED:
    case KYC_STATUS.UNKNOWN:
      return <AlertCircle className={cn("size-6 text-error", className)} />
    default:
      return <AlertCircle className={cn("size-6 text-error", className)} />
  }
}
