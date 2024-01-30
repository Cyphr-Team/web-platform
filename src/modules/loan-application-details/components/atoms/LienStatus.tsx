import { Badge } from "@/components/ui/badge"
import { KYB_LIEN_STATUS } from "../../constants/type"

type Props = {
  status: KYB_LIEN_STATUS
}

export const LienStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case KYB_LIEN_STATUS.OPEN:
      return (
        <Badge className="space-x-xs py-xs px-md rounded-lg border w-full h-fit bg-error-50 border-error-200 justify-center">
          <p className="text-sm font-normal text-error-700">Open</p>
        </Badge>
      )
    case KYB_LIEN_STATUS.CLOSED:
      return (
        <Badge className="space-x-xs py-xs px-md border w-full h-fit bg-gray-50 border-gray-200 justify-center">
          <p className="text-sm font-normal text-gray-700">Closed</p>
        </Badge>
      )
    default:
      return (
        <Badge className="space-x-xs py-xs px-md border w-full h-fit bg-gray-50 border-gray-200 justify-center">
          <p className="text-sm font-normal text-gray-700">Unknown</p>
        </Badge>
      )
  }
}
