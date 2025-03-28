import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip.tsx"
import { type PropsWithChildren, type ReactNode } from "react"
import { cn } from "@/lib/utils.ts"

interface ClickableTooltipProps {
  tooltipContent: ReactNode | null
}

export function ClickableTooltip(
  props: PropsWithChildren<ClickableTooltipProps>
) {
  const { children, tooltipContent } = props

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild onClick={(event) => event.preventDefault()}>
          {children}
        </TooltipTrigger>

        <TooltipContent
          asChild
          className={cn("bg-black", !tooltipContent && "hidden")}
          onPointerDownOutside={(event) => event.preventDefault()}
        >
          <div className="max-w-72 text-xs font-light text-white">
            {tooltipContent}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
