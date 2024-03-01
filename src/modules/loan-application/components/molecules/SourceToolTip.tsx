import { Badge } from "@/components/ui/badge"
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
import { MiddeskSourcesReport } from "@/modules/loan-application-management/constants/types/middesk.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { snakeCaseToText } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ReactNode } from "react"

export const SourceToolTip = ({
  data,
  sourceContent,
  description
}: {
  data: MiddeskSourcesReport[]
  sourceContent: ReactNode
  description?: ReactNode
}) => {
  const sourceToolTipColumn: ColumnDef<MiddeskSourcesReport>[] = [
    {
      accessorKey: "sources",
      header: () => <MiddeskTableHeader title="Source" />,
      cell: ({ row }) => {
        const data = row.original

        return (
          <div className="inline-flex items-center text-blue-700 border-b border-blue-700">
            {data?.metadata?.state} <Dot className="mx-1 w-2 text-blue-700" />
            SOS
          </div>
        )
      }
    },
    {
      accessorKey: "status",
      header: () => <MiddeskTableHeader title="Status" />,
      cell: ({ row }) => {
        const data = row.original

        return (
          <Badge
            isDot
            variant="soft"
            variantColor={getBadgeVariantByMiddeskStatus(
              data?.metadata?.status
            )}
            className="capitalize gap-1 text-sm"
            isDotBefore={false}
          >
            {snakeCaseToText(data?.metadata?.status?.toLowerCase() ?? "")}
          </Badge>
        )
      }
    }
  ]

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 border-b rounded-none border-dashed border-black font-normal text-base h-6"
          >
            {sourceContent}
          </Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent className="text-base px-0" side="top">
            {description && (
              <div className="px-4 font-semibold max-w-80 pb-2 border-b">
                {description}
              </div>
            )}

            <MiddeskTable data={data} columns={sourceToolTipColumn} />
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}
