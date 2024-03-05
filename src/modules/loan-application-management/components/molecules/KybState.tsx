import { Skeleton } from "@/components/ui/skeleton"
import { STATE_STATUS } from "../../constants"
import { BusinessSosData } from "../../constants/types/business.type"
import { CardStatus } from "../atoms/CardStatus"

type Props = {
  sosFillings?: BusinessSosData
}

export const KybState: React.FC<Props> = ({ sosFillings }) => {
  return (
    <div className="flex flex-wrap gap-lg">
      <div className="w-[140px] rounded-lg overflow-hidden">
        <CardStatus
          status={STATE_STATUS.ACTIVE}
          amount={sosFillings?.active ?? 0}
        />
      </div>
      <div className="w-[140px] rounded-lg overflow-hidden">
        <CardStatus
          status={STATE_STATUS.INACTIVE}
          amount={sosFillings?.inactive ?? 0}
        />
      </div>
      <div className="w-[140px] rounded-lg overflow-hidden">
        <CardStatus
          status={STATE_STATUS.UNKNOWN}
          amount={sosFillings?.unknown ?? 0}
        />
      </div>
    </div>
  )
}

export const KybStateSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-lg">
      <Skeleton className="w-[140px] h-[100px] bg-success-100" />
      <Skeleton className="w-[140px] h-[100px] bg-warning-100" />
      <Skeleton className="w-[140px] h-[100px] bg-gray-100" />
    </div>
  )
}
