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
      <TooltipTrigger
        className={cn("ml-2 opacity-40 p-1", className)}
        type="button"
      >
        <Info className={iconClassName} size={20} />
      </TooltipTrigger>
      <TooltipContent className="bg-black transform" sideOffset={0}>
        <div className="text-white max-w-72 font-light">{content}</div>
      </TooltipContent>
    </Tooltip>
  )
}

export default memo(ContentTooltip)
