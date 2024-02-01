import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { KYB_VERIFIED_FIELD_STATUS } from "../../constants/type"
import { VerificationIcon } from "./VerificationIcon"
import { getClassNameFromStatus } from "../../services"
import { KYC_STATUS } from "../../constants/types/kyc"

type Props = {
  status?: KYB_VERIFIED_FIELD_STATUS | KYC_STATUS
}

export const VerificationStatus: React.FC<Props> = ({ status }) => {
  const className = getClassNameFromStatus(status)

  const bgClassName = {
    success: "bg-success-secondary",
    error: "bg-error-secondary",
    warning: "bg-warning-secondary"
  }
  return (
    <div className="w-12 h-12">
      <AspectRatio ratio={1 / 1}>
        <div
          className={`w-full h-full flex justify-center items-center rounded-full ${bgClassName[className]}`}
        >
          <VerificationIcon status={status} />
        </div>
      </AspectRatio>
    </div>
  )
}
