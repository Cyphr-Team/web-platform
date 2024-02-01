import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"
import { KYB_VERIFIED_FIELD_STATUS } from "../../constants/type"
import { cn } from "@/lib/utils"

type Props = {
  status?: KYB_VERIFIED_FIELD_STATUS
  className?: string
}

export const VerificationIcon: React.FC<Props> = ({ status, className }) => {
  switch (status) {
    case KYB_VERIFIED_FIELD_STATUS.WARNING:
      return <AlertTriangle className={cn("w-6 h-6 text-warning", className)} />
    case KYB_VERIFIED_FIELD_STATUS.SUCCESS:
      return <CheckCircle className={cn("w-6 h-6 text-success", className)} />
    case KYB_VERIFIED_FIELD_STATUS.FAILURE:
      return <AlertCircle className={cn("w-6 h-6 text-error", className)} />
    default:
      return <AlertCircle className={cn("w-6 h-6 text-error", className)} />
  }
}
