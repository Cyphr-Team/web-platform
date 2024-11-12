import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { toCurrency } from "@/utils"

interface CashFlowGlanceItemProps {
  title: string
  description: string
  value?: number
  isNegative?: boolean
  isCurrency?: boolean
}

export function CashFlowGlanceItem({
  title,
  value,
  description,
  isNegative,
  isCurrency
}: CashFlowGlanceItemProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className="flex flex-1 flex-col">
          <div
            className={cn(
              "flex-1 px-0.5 py-2 w-full flex flex-col justify-between",
              isNegative && "text-error-500 bg-error-100"
            )}
          >
            <p className="text-sm font-medium">{title}</p>
            <p className={cn(`text-xs`, isNegative && "text-error-500")}>
              {value != null ? (isCurrency ? toCurrency(value) : value) : "-"}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-xs rounded-md bg-black p-1 text-white"
          side="top"
          sideOffset={20}
        >
          <p className="text-xs">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
