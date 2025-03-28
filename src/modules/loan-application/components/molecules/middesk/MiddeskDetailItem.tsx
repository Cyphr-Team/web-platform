import { Dot } from "@/components/ui/dot"
import { Skeleton } from "@/components/ui/skeleton"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { type TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type ReactNode } from "react"
import { cn } from "@/lib/utils.ts"
import { Badge } from "@/components/ui/badge"

interface StatusProps {
  isStatusCheck: boolean
  color?: TaskFieldStatus
}

export function MiddeskDetailItem({
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
}) {
  return (
    <div className="mt-5">
      <div className={cn("flex w-full items-center gap-1", labelClassName)}>
        {label}
      </div>
      <div className="mt-1.5 text-base">
        {statusProps?.isStatusCheck ? (
          <Badge
            className="rounded-lg bg-transparent pl-0 text-sm capitalize text-text-tertiary"
            isDot={statusProps?.isStatusCheck}
            variant="soft"
            variantColor={getBadgeVariantByInsightStatus(statusProps?.color)}
          >
            {value ?? UNKNOWN_VALUE}
          </Badge>
        ) : (
          value ?? UNKNOWN_VALUE
        )}
      </div>
      <div className="mt-1 flex items-center text-base">
        {!!status && (
          <Dot variantColor={getBadgeVariantByInsightStatus(status)} />
        )}
        {toolTip}
      </div>
      {!!annotation && (
        <div className="mt-1 flex w-full items-center gap-1 text-xs text-slate-500">
          {annotation}
        </div>
      )}
    </div>
  )
}

export function MiddeskDetailItemSkeleton() {
  return (
    <div className="mt-5">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="mt-1.5 h-4 w-2/3" />
      <Skeleton className="mt-1 h-4 w-1/3" />
    </div>
  )
}
