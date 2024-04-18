import { DataTable } from "@/components/ui/data-table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { ColumnDef } from "@tanstack/react-table"
import { InfoIcon } from "lucide-react"
import { Limit } from "../types/subscription.types"

const limitColumns: ColumnDef<Limit>[] = [
  {
    id: "unit",
    header: () => <p className="text-xs">Unit</p>,
    cell: ({ row }) => {
      const data = row.original

      return <div>{data.unit}</div>
    }
  },
  {
    id: "limit",
    header: () => <p className="text-xs">Limit</p>,
    cell: ({ row }) => {
      const data = row.original

      return <div>{data.limit}</div>
    }
  },
  {
    id: "currentUsage",
    header: () => <p className="text-xs"> Current Usage</p>,
    cell: ({ row }) => {
      const data = row.original

      return <div>{data.currentUsage}</div>
    }
  }
]

// TODO: Handle lazy call API limit when user hover
export const SubscriptionLimitTable = () => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <InfoIcon className="fill-blue-400 text-white w-4 inline" />
        </TooltipTrigger>
        <TooltipContent side="right" className="inline-block p-2">
          <div>
            <h4 className="font-medium text-center">Institution usages</h4>
            <DataTable
              tableContainerClassName="-mt-4"
              columns={limitColumns}
              data={[]}
              total={0}
            />
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
