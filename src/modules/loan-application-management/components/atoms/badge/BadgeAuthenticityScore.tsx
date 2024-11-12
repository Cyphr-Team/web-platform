import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoanDocumentAuthenticityScoreStatus } from "@/types/loan-document.type"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@radix-ui/react-tooltip"
import { getBadgeVariantByAuthenticityScore } from "../../../services"

interface Props {
  status: LoanDocumentAuthenticityScoreStatus
  score: number
}

const generateTooltip = (header: string, content: string, cellText: string) => (
  <div className="relative py-0">
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <p className="border-b-2 border-dashed border-slate-500 px-0 text-sm font-normal text-text-tertiary">
            {cellText}
          </p>
        </TooltipTrigger>
        <TooltipContent className="z-10" side="left" sideOffset={5}>
          <Card className="max-w-80 rounded-md border-none shadow-2xl md:p-4">
            <CardHeader className="flex flex-row items-center justify-between md:p-0 md:pb-1">
              <CardTitle className="my-0 pb-0 text-sm font-semibold ">
                {header}
              </CardTitle>
            </CardHeader>
            <CardContent className="md:p-0">
              <p className="text-sm font-normal">{content}</p>
            </CardContent>
          </Card>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
)

export const BadgeAuthenticityScore: React.FC<Props> = ({ status, score }) => {
  switch (status) {
    case LoanDocumentAuthenticityScoreStatus.NONE:
      return generateTooltip(
        "Manual Review Needed",
        "This document type is not yet supported for auto-verification and therefore needs manual review",
        "N/A"
      )
    case LoanDocumentAuthenticityScoreStatus.PENDING:
      return generateTooltip(
        "Auto-verfication Pending",
        "This document is being processed and therefore needs time to extract the score",
        "Pending"
      )
    case LoanDocumentAuthenticityScoreStatus.VERIFIED:
      return (
        <Badge
          isDot
          className=" space-x-md bg-transparent px-0"
          isDotBefore={false}
          variantColor={getBadgeVariantByAuthenticityScore(score)}
        >
          <p className="text-sm font-medium text-text-tertiary">{score}</p>
        </Badge>
      )
    default:
      return "N/A"
  }
}
