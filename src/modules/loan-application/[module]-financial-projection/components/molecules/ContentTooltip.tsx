import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip.tsx"
import { Info } from "lucide-react"
import { type FC, memo } from "react"

interface Props {
  content: string
  style?: {
    iconClassName?: string
  }
}

const ContentTooltip: FC<Props> = (props) => {
  const { style = {}, content } = props
  const { iconClassName } = style

  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger className="ml-2 opacity-40" type="button">
        <Info className={iconClassName} size={20} />
      </TooltipTrigger>
      <TooltipContent className="bg-black transform" sideOffset={0}>
        <div className="text-white max-w-72 font-light">{content}</div>
      </TooltipContent>
    </Tooltip>
  )
}

export default memo(ContentTooltip)
