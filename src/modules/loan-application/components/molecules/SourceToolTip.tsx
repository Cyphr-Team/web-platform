import { Button } from "@/components/ui/button"
import { Dot } from "@/components/ui/dot"
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { MiddeskTableHeader } from "@/modules/loan-application-management/components/table/middesk-table-header"
import { type BusinessRegistrationSource } from "@/modules/loan-application-management/constants/types/business.type"
import { type ColumnDef } from "@tanstack/react-table"
import { type ReactNode } from "react"
import { MiddeskBadge } from "./middesk/MiddeskBadge"
import { cn } from "@/lib/utils"
import { mappedStateAbbreviations } from "@/utils/state.utils"

const sourceToolTipColumn: ColumnDef<BusinessRegistrationSource>[] = [
  {
    accessorKey: "sources",
    header: () => <MiddeskTableHeader title="Source" />,
    cell: ({ row }) => {
      const data = row.original

      const state = data?.state
        ? mappedStateAbbreviations[
            data.state as keyof typeof mappedStateAbbreviations
          ] ?? data.state
        : data.state

      return (
        <a
          className="inline-flex items-center text-blue-700 border-b border-blue-700"
          href={data?.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {state} <Dot className="mx-1 w-2 text-blue-700" />
          SOS
        </a>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => <MiddeskTableHeader title="Status" />,
    cell: ({ row }) => {
      const data = row.original

      return <MiddeskBadge status={data?.status} />
    }
  }
]

export function SourceToolTip({
  data,
  sourceContent,
  description,
  subDescription
}: {
  data?: BusinessRegistrationSource[]
  sourceContent: ReactNode
  description?: ReactNode
  subDescription?: ReactNode
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            className="p-0 border-b rounded-none border-dashed border-black font-normal text-base h-6"
            variant="ghost"
          >
            <p className="break-words">{sourceContent}</p>
          </Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className={cn(
              "text-base px-0 max-w-80",
              subDescription && "max-w-80 md:max-w-md lg:max-w-lg"
            )}
            side="top"
          >
            {description ? (
              <div
                className={cn(
                  "px-4 font-semibold text-sm break-words",
                  !!data?.length && "border-b pb-2"
                )}
              >
                {description}
              </div>
            ) : null}

            {data ? (
              <MiddeskTable columns={sourceToolTipColumn} data={data} />
            ) : null}

            {!!subDescription && (
              <div className="px-4 text-sm py-2">{subDescription}</div>
            )}
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
