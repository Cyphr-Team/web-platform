import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { ReactNode } from "react"

export const DashBoardToolTip = ({ content }: { content: ReactNode }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle
            width={16}
            height={16}
            className="flex-shrink-0 inline text-text-secondary"
          />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>{content}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
