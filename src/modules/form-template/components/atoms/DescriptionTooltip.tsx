import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { InfoIcon } from "lucide-react"

export const DescriptionTooltip = ({
  description,
  side = "right",
  sideOffset = 8,
  className
}: {
  description: string
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  className?: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <InfoIcon className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className={cn("text-white bg-black p-1 w-48", className)}
        >
          <p className="text-xs">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
