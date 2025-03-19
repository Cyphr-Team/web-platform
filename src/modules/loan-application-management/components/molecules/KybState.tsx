import { Skeleton } from "@/components/ui/skeleton"
import { STATE_STATUS } from "../../constants"
import { type BusinessSosData } from "../../constants/types/business.type"
import { CardStatus } from "../atoms/CardStatus"

interface Props {
  sosFillings?: BusinessSosData
}

export const KybState: React.FC<Props> = ({ sosFillings }) => {
  return (
    <div className="flex flex-wrap gap-lg">
      <div className="w-[140px] overflow-hidden rounded-lg">
        <CardStatus
          amount={sosFillings?.active ?? 0}
          status={STATE_STATUS.ACTIVE}
        />
      </div>
      <div className="w-[140px] overflow-hidden rounded-lg">
        <CardStatus
          amount={sosFillings?.inactive ?? 0}
          status={STATE_STATUS.INACTIVE}
        />
      </div>
      <div className="w-[140px] overflow-hidden rounded-lg">
        <CardStatus
          amount={sosFillings?.unknown ?? 0}
          status={STATE_STATUS.UNKNOWN}
        />
      </div>
    </div>
  )
}

export function KybStateSkeleton() {
  return (
    <div className="flex flex-wrap gap-lg">
      <Skeleton className="h-[100px] w-[140px] bg-success-100" />
      <Skeleton className="h-[100px] w-[140px] bg-warning-100" />
      <Skeleton className="h-[100px] w-[140px] bg-gray-100" />
    </div>
  )
}
