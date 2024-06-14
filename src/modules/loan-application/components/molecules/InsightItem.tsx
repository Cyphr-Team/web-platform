import { Dot } from "@/components/ui/dot"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { InsightStatus } from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/middesk.service"
import { ReactNode } from "react"

type InsightItemProps = {
  title: string
  status?: InsightStatus
  noBorder?: boolean
  label?: ReactNode
  toolTipContent?: ReactNode
  href: string
  isLoading?: boolean
}

export const InsightItem: React.FC<InsightItemProps> = ({
  title,
  status,
  noBorder,
  label,
  toolTipContent,
  href,
  isLoading
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            className={cn(
              "flex items-center justify-between border-b py-3.5 gap-1 cursor-pointer hover:bg-gray-50",
              noBorder && "border-0"
            )}
            href={`#${href}`}
          >
            <p className="text-text-primary font-medium text-sm flex-shrink-0">
              {title}
            </p>
            {isLoading ? (
              <Skeleton className="w-16 h-4" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="capitalize text-sm text-text-tertiary">
                  {label ?? "N/A"}
                </span>
                <Dot
                  className="flex-shrink-0 -mr-0.5"
                  variantColor={getBadgeVariantByInsightStatus(status)}
                />
              </div>
            )}
          </a>
        </TooltipTrigger>

        {toolTipContent && (
          <TooltipContent
            className="max-w-72 bg-muted-foreground text-muted"
            sideOffset={10}
          >
            <p>{toolTipContent}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default InsightItem
