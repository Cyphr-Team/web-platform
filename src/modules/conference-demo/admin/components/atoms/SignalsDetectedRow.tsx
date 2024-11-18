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
import { type SignalsType } from "@/modules/conference-demo/admin/constants/type"
import { camelCaseToText, capitalizeWords } from "@/utils"
import { Minus, Plus } from "lucide-react"
import React from "react"

interface Props {
  signalsData: SignalsType
}

const SignalsDetectedRow: React.FC<Props> = ({ signalsData }) => {
  return (
    <Accordion collapsible className="w-full" type="single">
      <AccordionItem value={signalsData.signalIdentifier}>
        <AccordionTrigger
          className={cn(
            "w-full justify-between hover:no-underline",
            "[&[data-state=closed]>.open-icon]:animate-spin-once",
            "[&[data-state=open]>.close-icon]:animate-spin-once"
          )}
          closeIcon={<Minus className="size-4" />}
          openIcon={<Plus className="size-4" />}
        >
          <div className="flex items-center justify-start gap-2">
            <SignalCount signalCount={signalsData.signalCount} />
            <p className="text-sm font-semibold">
              {signalsData.signalDisplayName}
            </p>
          </div>
        </AccordionTrigger>
        {signalsData.signalCount > 0 && (
          <AccordionContent className="gap-3xl">
            <p className="p-1 text-sm font-normal text-gray-800">
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
                        className="relative px-6 text-black"
                      >
                        <TooltipProvider>
                          <Tooltip delayDuration={0}>
                            <TooltipTrigger>
                              <span className="absolute inset-x-1 truncate text-left">
                                {headerKey}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              className="bg-black p-1 text-white"
                              side="bottom"
                              sideOffset={20}
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
                        className="h-fit py-2 pl-1 text-left"
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
