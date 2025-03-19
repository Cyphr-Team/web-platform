import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip.tsx"
import { Info } from "lucide-react"
import { memo } from "react"
import { cn } from "@/lib/utils.ts"

interface ContentTooltipProps {
  content: string
  className?: string
  style?: {
    iconClassName?: string
  }
}

function ContentTooltip(props: ContentTooltipProps) {
  const { style = {}, content, className } = props
  const { iconClassName } = style

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger className={cn("ml-2 p-0", className)} type="button">
        <Info className={cn("text-text-senary", iconClassName)} size={16} />
      </TooltipTrigger>
      <TooltipContent
        className="rounded-lg border-none bg-black py-2.5"
        sideOffset={0}
      >
        <div className="max-w-72 text-center text-sm font-light text-white">
          {content}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

export default memo(ContentTooltip)
