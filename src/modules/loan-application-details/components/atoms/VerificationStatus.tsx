import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { KYB_VERIFIED_FIELD_STATUS } from "../../constants/type"
import { VerificationIcon } from "./VerificationIcon"
import { getClassNameFromStatus } from "../../services"

type Props = {
  status?: KYB_VERIFIED_FIELD_STATUS
}

export const VerificationStatus: React.FC<Props> = ({ status }) => {
  const className = getClassNameFromStatus(status)
  return (
    <div className="w-12 h-12">
      <AspectRatio ratio={1 / 1}>
        <div
          className={`w-full h-full flex justify-center items-center rounded-full bg-${className}-secondary`}
        >
          <VerificationIcon status={status} />
        </div>
      </AspectRatio>
    </div>
  )
}
