import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import SignalCount from "@/modules/conference-demo/admin/components/atoms/SignalCount"
import { SignalsType } from "@/modules/conference-demo/admin/constants/type"
import { camelCaseToText, capitalizeWords } from "@/utils"
import { Minus, Plus } from "lucide-react"
import React from "react"

type Props = {
  signalsData: SignalsType
}

const SignalsDetectedRow: React.FC<Props> = ({ signalsData }) => {
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
            <p className="py-1 px-1 text-sm text-gray-800 font-normal">
              {signalsData.signalIdentifierDescription}
            </p>
            <Table className="text-xs">
              <TableHeader>
                <TableRow>
                  {signalsData.tabularData?.headers?.map((header) => {
                    const headerKey = capitalizeWords(
                      camelCaseToText(Object.keys(header)[0])
                    )
                    const headerDescription = Object.values(header)[0]
                    return (
                      <TableHead
                        key={headerKey}
                        className="text-black px-6 relative"
                      >
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger>
                              <span className="whitespace-nowrap overflow-hidden text-ellipsis absolute left-1 right-1 text-left">
                                {headerKey}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              side="bottom"
                              sideOffset={20}
                              className="text-white bg-black p-1"
                            >
                              <p className="text-xs">{headerDescription}</p>
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
                      <TableCell
                        key={cell}
                        className="py-2 pl-1 h-fit text-left"
                      >
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

export default SignalsDetectedRow
