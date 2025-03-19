import { Badge } from "@/components/ui/badge"
import { KYB_LIEN_STATUS } from "../../constants/type"

interface Props {
  status: KYB_LIEN_STATUS
}

export const LienStatus: React.FC<Props> = ({ status }) => {
  switch (status) {
    case KYB_LIEN_STATUS.OPEN:
      return (
        <Badge className="h-fit w-full justify-center space-x-xs rounded-lg border border-error-200 bg-error-50 px-md py-xs">
          <p className="text-sm font-normal text-error-700">Open</p>
        </Badge>
      )
    case KYB_LIEN_STATUS.CLOSED:
      return (
        <Badge className="h-fit w-full justify-center space-x-xs border border-gray-200 bg-gray-50 px-md py-xs">
          <p className="text-sm font-normal text-gray-700">Closed</p>
        </Badge>
      )
    default:
      return (
        <Badge className="h-fit w-full justify-center space-x-xs border border-gray-200 bg-gray-50 px-md py-xs">
          <p className="text-sm font-normal text-gray-700">Unknown</p>
        </Badge>
      )
  }
}
