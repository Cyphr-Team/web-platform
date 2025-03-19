import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/middesk/MiddeskBadge"
import { type ReactNode } from "react"
import { type InsightStatus } from "../../constants/types/insight.type"

interface Props {
  label?: ReactNode
  value?: string
  hasAction?: boolean
  status?: InsightStatus
  subLabel?: string
  className?: string
}

export const InformationRow: React.FC<Props> = ({
  label,
  value,
  hasAction,
  status,
  subLabel,
  className
}) => {
  return (
    <div className={cn("grid grid-flow-row grid-cols-4", className)}>
      <div className="flex items-center py-xl pl-xl xl:py-3xl xl:pl-3xl">
        <p
          className={cn(
            "text-sm text-text-tertiary",
            !value && "whitespace-nowrap font-medium text-foreground"
          )}
        >
          {label}
        </p>
      </div>
      <div
        className="col-span-1 flex items-center break-words py-xl pl-xl data-[action=true]:col-span-2  xl:py-3xl xl:pl-3xl"
        data-action={!hasAction}
      >
        <p className="text-sm font-medium">{value}</p>
      </div>
      {hasAction ? (
        <div className="flex items-center gap-x-lg py-xl pl-xl xl:py-3xl xl:pl-3xl">
          <Switch />
          <p className="text-sm font-medium">resolve manually</p>
        </div>
      ) : null}
      {status ? (
        <div className="flex items-center justify-end py-xl pl-xl pr-3xl xl:py-3xl xl:pl-0">
          <MiddeskBadge label={subLabel} status={status} />
        </div>
      ) : null}
    </div>
  )
}
