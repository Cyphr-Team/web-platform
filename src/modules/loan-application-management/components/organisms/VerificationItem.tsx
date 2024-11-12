import { KYB_VERIFIED_FIELD_STATUS } from "../../constants/type"
import { type KYC_STATUS } from "../../constants/types/kyc"
import { VerificationStatus } from "../atoms/VerificationStatus"

interface VerificationItemProps {
  title: string
  description?: string
  status?: KYB_VERIFIED_FIELD_STATUS | KYC_STATUS
}

export const VerificationItem: React.FC<VerificationItemProps> = ({
  title,
  description,
  status
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="text-text-secondary">{description}</p>
      </div>
      <div className="flex items-center">
        <div className="ml-lg">
          <VerificationStatus status={status} />
        </div>
      </div>
    </div>
  )
}

VerificationItem.defaultProps = {
  status: KYB_VERIFIED_FIELD_STATUS.UNKNOWN
}

export default VerificationItem
