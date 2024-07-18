import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { MiddeskBadge } from "@/modules/loan-application/components/molecules/MiddeskBadge"
import { ReactNode } from "react"
import { InsightStatus } from "../../constants/types/insight.type"

type Props = {
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
    <div className={cn("grid-cols-4 grid grid-flow-row", className)}>
      <div className="pl-xl xl:pl-3xl py-xl xl:py-3xl flex items-center">
        <p
          className={cn(
            "text-sm text-text-tertiary",
            !value && "whitespace-nowrap text-foreground font-medium"
          )}
        >
          {label}
        </p>
      </div>
      <div
        className="py-xl xl:py-3xl pl-xl xl:pl-3xl flex items-center data-[action=true]:col-span-2  col-span-1 break-words"
        data-action={!hasAction}
      >
        <p className="font-medium text-sm">{value}</p>
      </div>
      {hasAction && (
        <div className="flex gap-x-lg items-center pl-xl xl:pl-3xl py-xl xl:py-3xl">
          <Switch />
          <p className="text-sm font-medium">resolve manually</p>
        </div>
      )}
      {status && (
        <div className="pr-3xl py-xl xl:py-3xl flex justify-end pl-xl xl:pl-0 items-center">
          <MiddeskBadge label={subLabel} status={status} />
        </div>
      )}
    </div>
  )
}
