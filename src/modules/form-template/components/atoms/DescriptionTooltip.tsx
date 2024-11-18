import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

import { InfoIcon } from "lucide-react"

export function DescriptionTooltip({
  description,
  side = "right",
  sideOffset = 8,
  className
}: {
  description: string
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  className?: string
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger type="button">
          <InfoIcon className="size-4" />
        </TooltipTrigger>
        <TooltipContent
          className={cn("w-48 bg-black p-1 text-white", className)}
          side={side}
          sideOffset={sideOffset}
        >
          <p className="text-xs">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
