import { DataTable } from "@/components/ui/data-table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { type ColumnDef } from "@tanstack/react-table"
import { InfoIcon } from "lucide-react"
import { useQueryInstitutionLimit } from "../hooks/useQuery/useQueryInstitutionLimit"
import { type Limit } from "../types/subscription.types"
import { useMemo } from "react"

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

function LimitTable({ institutionId = "" }: { institutionId?: string }) {
  const queryResponse = useQueryInstitutionLimit({ institutionId })

  const tableData = useMemo((): Limit[] => {
    const data = queryResponse.data

    return [
      {
        unit: "Application",
        currentUsage: data?.application?.currentApplicationUsage ?? "N/A",
        limit: data?.application?.currentApplicationLimit ?? "N/A"
      },
      {
        unit: "Seat",
        currentUsage: data?.seat?.currentSeatUsage ?? "N/A",
        limit: data?.seat?.currentSeatLimit ?? "N/A"
      }
    ]
  }, [queryResponse.data])

  return (
    <div>
      <h4 className="text-center font-medium">Institution usages</h4>
      <DataTable
        columns={limitColumns}
        data={tableData}
        isLoading={queryResponse.isFetching}
        tableContainerClassName="-mt-4"
        total={tableData.length}
      />
    </div>
  )
}

export function SubscriptionLimitTable({
  institutionId = ""
}: {
  institutionId?: string
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <InfoIcon className="inline w-4 fill-blue-400 text-white" />
        </TooltipTrigger>
        <TooltipContent className="inline-block p-2" side="right">
          <LimitTable institutionId={institutionId} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
