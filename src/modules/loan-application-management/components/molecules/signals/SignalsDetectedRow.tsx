import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { SignalCount } from "../../atoms/signals/SignalCount"
import { SignalsType } from "@/modules/loan-application-management/constants/type"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { camelCaseToText, capitalizeWords } from "@/utils"

type Props = {
  signalsData: SignalsType
}

export const SignalsDetectedRow: React.FC<Props> = ({ signalsData }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={signalsData.signalIdentifier}>
        <AccordionTrigger
          className={cn(
            "justify-between w-full hover:no-underline",
            "[&[data-state=closed]>.open-icon]:animate-spin-once",
            "[&[data-state=open]>.close-icon]:animate-spin-once"
          )}
          openIcon={<Plus className="h-4 w-4" />}
          closeIcon={<Minus className="h-4 w-4" />}
        >
          <div className="flex justify-start items-center gap-2">
            <SignalCount signalCount={signalsData.signalCount} />
            <p className="text-sm font-semibold">
              {signalsData.signalDisplayName}
            </p>
          </div>
        </AccordionTrigger>
        {signalsData.signalCount > 0 && (
          <AccordionContent className="gap-3xl">
            <p className="text-sm font-normal">
              {signalsData.signalDescription}
            </p>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  {signalsData.tabularData?.headers?.map((header) => {
                    const headerKey = capitalizeWords(
                      camelCaseToText(Object.keys(header)[0])
                    )
                    return (
                      <TableHead
                        key={headerKey}
                        className="text-black py-2 relative"
                      >
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger>
                              <span className="whitespace-nowrap overflow-hidden text-ellipsis absolute left-1 right-1">
                                {headerKey}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              side="bottom"
                              sideOffset={20}
                              className="text-white bg-black p-1"
                            >
                              <p className="text-xs">{headerKey}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {signalsData.tabularData?.rows.map((data, index) => (
                  <TableRow key={index}>
                    {data.values.map((cell) => (
                      <TableCell key={cell} className="py-2 h-fit">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        )}
      </AccordionItem>
    </Accordion>
  )
}
