import { Dot } from "@/components/ui/dot"
import { Skeleton } from "@/components/ui/skeleton"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { ReactNode } from "react"

export const MiddeskDetailItem = ({
  label,
  value,
  status,
  toolTip
}: {
  label: ReactNode
  value?: ReactNode
  status?: TaskFieldStatus
  toolTip?: ReactNode
}) => {
  return (
    <div className="mt-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1.5">{value ?? UNKNOWN_VALUE}</div>
      <div className="flex items-center mt-1">
        {!!status && (
          <Dot variantColor={getBadgeVariantByMiddeskStatus(status)} />
        )}
        {toolTip}
      </div>
    </div>
  )
}

export const MiddeskDetailItemSkeleton = () => {
  return (
    <div className="mt-5">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3 mt-1.5" />
      <Skeleton className="h-4 w-1/3 mt-1" />
    </div>
  )
}
