import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { type ReactNode } from "react"

export function DashBoardToolTip({ content }: { content: ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle
            className="inline shrink-0 text-text-secondary"
            height={16}
            width={16}
          />
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>{content}</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
