import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"

import { InfoIcon } from "lucide-react"

export const DescriptionTooltip = ({
  description
}: {
  description: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <InfoIcon className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={20}
          className="text-white bg-black p-1 w-48"
        >
          <p className="text-xs">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
