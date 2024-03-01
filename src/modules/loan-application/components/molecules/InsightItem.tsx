import { Dot } from "@/components/ui/dot"
import { cn } from "@/lib/utils"
import { MiddeskStatus } from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { snakeCaseToText } from "@/utils"

type InsightItemProps = {
  title: string
  status?: MiddeskStatus
  noBorder?: boolean
}

export const InsightItem: React.FC<InsightItemProps> = ({
  title,
  status,
  noBorder
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b py-3.5",
        noBorder && "border-0"
      )}
    >
      <p className="text-text-primary font-medium text-sm">{title}</p>
      <div className="flex items-center gap-2">
        <span className="capitalize text-sm text-text-tertiary">
          {snakeCaseToText(status?.toLowerCase() ?? "")}
        </span>
        <Dot variantColor={getBadgeVariantByMiddeskStatus(status)} />
      </div>
    </div>
  )
}

export default InsightItem
