import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip.tsx"
import { Info } from "lucide-react"
import { FC, memo } from "react"

interface Props {
  content: string
}

const ContentTooltip: FC<Props> = ({ content }) => {
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger type="button" className="ml-2 opacity-40">
        <Info size={20} />
      </TooltipTrigger>
      <TooltipContent className="bg-black transform" sideOffset={0}>
        <div className="text-white max-w-72 font-light">{content}</div>
      </TooltipContent>
    </Tooltip>
  )
}

export default memo(ContentTooltip)
