import { Dot } from "@/components/ui/dot"
import { UNKNOWN_VALUE } from "@/modules/loan-application-management/constants"
import { MiddeskStatus } from "@/modules/loan-application-management/constants/types/middesk.type"
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
  status?: MiddeskStatus
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
