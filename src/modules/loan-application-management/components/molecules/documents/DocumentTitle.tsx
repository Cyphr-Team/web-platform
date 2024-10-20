import { formatBirthday } from "@/utils/date.utils"
import { BackButton } from "./BackButton"

interface Props {
  documentType: string
  verifiedDate: string
}

export const DocumentTitle: React.FC<Props> = ({
  documentType,
  verifiedDate
}) => {
  return (
    <div className="flex gap-6">
      <BackButton />
      <div className="flex flex-col text-sm">
        <p className="font-semibold">Document Type</p>
        <p className="font-normal text-secondary-700">{documentType}</p>
      </div>
      <div className="flex flex-col text-sm">
        <p className="font-semibold">Verified Date</p>
        <p className="font-normal text-secondary-700">
          {formatBirthday(verifiedDate)}
        </p>
      </div>
    </div>
  )
}
