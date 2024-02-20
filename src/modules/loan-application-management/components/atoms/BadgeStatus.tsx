import { Badge } from "@/components/ui/badge"
import { KYC_STATUS } from "../../constants"
import { AlertTriangle, Check, MinusSquare, X } from "lucide-react"
import { KYB_VERIFIED_FIELD_STATUS } from "../../constants/type"
import { LoanDocumentStatus } from "@/types/loan-document.type"

type Props = {
  status: string
}

export const BadgeStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case KYC_STATUS.VERIFIED:
    case LoanDocumentStatus.VERIFIED:
      return (
        <Badge className="space-x-xs py-0 px-sm border w-fit h-fit bg-success-50 border-success-200">
          <Check className="w-3 h-3 text-success-500" />
          <p className="text-sm font-medium text-success-700">Verified</p>
        </Badge>
      )
    case KYC_STATUS.UNVERIFIED:
      return (
        <Badge className="space-x-xs py-0 px-sm border w-fit h-fit bg-error-50 border-error-200">
          <X className="w-3 h-3 text-error-500" />
          <p className="text-sm font-medium text-error-700">Unverified</p>
        </Badge>
      )
    case KYC_STATUS.PASSED:
      return (
        <Badge className="space-x-xs py-0 px-sm border w-fit h-fit bg-success-50 border-success-200">
          <Check className="w-3 h-3 text-success-500" />
          <p className="text-sm font-medium text-success-700">Passed</p>
        </Badge>
      )
    case KYC_STATUS.FAILED:
    case LoanDocumentStatus.FLAGGED:
      return (
        <Badge className="space-x-xs py-0 px-sm border w-fit h-fit bg-error-50 border-error-200">
          <X className="w-3 h-3 text-error-500" />
          <p className="text-sm font-medium text-error-700">Failed</p>
        </Badge>
      )
    case KYC_STATUS.UNCHECKED:
    case LoanDocumentStatus.UNCHECKED:
      return (
        <Badge className="space-x-xs py-0 px-sm border w-fit h-fit bg-gray-50 border-gray-200">
          <MinusSquare className="w-3 h-3 text-gray-500" />
          <p className="text-sm font-medium text-gray-700">Unchecked</p>
        </Badge>
      )
    case KYB_VERIFIED_FIELD_STATUS.WARNING:
      return (
        <Badge className="space-x-xs py-0 px-sm border w-fit h-fit bg-warning-secondary border-amber-300">
          <AlertTriangle className="w-3 h-3 text-warning" />
          <p className="text-sm font-medium text-warning">Warning</p>
        </Badge>
      )
  }
}
