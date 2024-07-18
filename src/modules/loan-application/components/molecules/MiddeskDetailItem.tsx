import { Dot } from "@/components/ui/dot"
import { Skeleton } from "@/components/ui/skeleton"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/middesk.service"
import { ReactNode } from "react"
import { cn } from "@/lib/utils.ts"
import { Badge } from "@/components/ui/badge.tsx"

type StatusProps = {
  isStatusCheck: boolean
  color: TaskFieldStatus | undefined
}

export const MiddeskDetailItem = ({
  label,
  value,
  status,
  toolTip,
  labelClassName,
  statusProps,
  annotation
}: {
  label: ReactNode
  value?: ReactNode
  status?: TaskFieldStatus
  toolTip?: ReactNode
  labelClassName?: string
  statusProps?: StatusProps
  annotation?: string
}) => {
  return (
    <div className="mt-5">
      <div className={cn("flex items-center gap-1 w-full", labelClassName)}>
        {label}
      </div>
      <div className="mt-1.5 text-base">
        {statusProps?.isStatusCheck ? (
          <Badge
            isDot={statusProps?.isStatusCheck}
            variant="soft"
            variantColor={getBadgeVariantByInsightStatus(statusProps?.color)}
            className="capitalize text-sm text-text-tertiary rounded-lg bg-transparent pl-0"
          >
            {value ?? UNKNOWN_VALUE}
          </Badge>
        ) : (
          value ?? UNKNOWN_VALUE
        )}
      </div>
      <div className="flex items-center mt-1 text-base">
        {!!status && (
          <Dot variantColor={getBadgeVariantByInsightStatus(status)} />
        )}
        {toolTip}
      </div>
      <div className="flex items-center gap-1 w-full text-xs text-slate-500 mt-1">
        {annotation}
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
