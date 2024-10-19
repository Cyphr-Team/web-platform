import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import React from "react"

interface IScoredTooltipProps {
  tooltipContent: string
}

export function ScoredTooltip({
  tooltipContent,
  children
}: React.PropsWithChildren<IScoredTooltipProps>) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
