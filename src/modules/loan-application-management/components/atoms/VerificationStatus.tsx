import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { type KYB_VERIFIED_FIELD_STATUS } from "../../constants/type"
import { VerificationIcon } from "./VerificationIcon"
import { getClassNameFromStatus } from "../../services"
import { type KYC_STATUS } from "../../constants/types/kyc"

interface Props {
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
    <div className="size-8 md:size-10 lg:size-12 ">
      <AspectRatio ratio={1 / 1}>
        <div
          className={`flex size-full items-center justify-center rounded-full ${bgClassName[className]}`}
        >
          <VerificationIcon status={status} />
        </div>
      </AspectRatio>
    </div>
  )
}
