import { Dot } from "@/components/ui/dot"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { type InsightStatus } from "@/modules/loan-application-management/constants/types/insight.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type ReactNode } from "react"

interface InsightItemProps {
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
              "flex cursor-pointer items-center justify-between gap-1 border-b py-3.5 hover:bg-gray-50",
              noBorder && "border-0"
            )}
            href={`#${href}`}
          >
            <p className="shrink-0 text-sm font-medium text-text-primary">
              {title}
            </p>
            {isLoading ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm capitalize text-text-tertiary">
                  {label ?? "N/A"}
                </span>
                <Dot
                  className="-mr-0.5 shrink-0"
                  variantColor={getBadgeVariantByInsightStatus(status)}
                />
              </div>
            )}
          </a>
        </TooltipTrigger>

        {toolTipContent ? (
          <TooltipContent
            className="max-w-72 bg-muted-foreground text-muted"
            sideOffset={10}
          >
            <p>{toolTipContent}</p>
          </TooltipContent>
        ) : null}
      </Tooltip>
    </TooltipProvider>
  )
}

export default InsightItem
