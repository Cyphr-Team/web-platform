import { DataTable } from "@/components/ui/data-table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { ColumnDef } from "@tanstack/react-table"
import { InfoIcon } from "lucide-react"
import { useQueryInstitutionLimit } from "../hooks/useQuery/useQueryInstitutionLimit"
import { Limit } from "../types/subscription.types"
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

const LimitTable = ({ institutionId = "" }: { institutionId?: string }) => {
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
      <h4 className="font-medium text-center">Institution usages</h4>
      <DataTable
        tableContainerClassName="-mt-4"
        columns={limitColumns}
        data={tableData}
        total={tableData.length}
        isLoading={queryResponse.isFetching}
      />
    </div>
  )
}

export const SubscriptionLimitTable = ({
  institutionId = ""
}: {
  institutionId?: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <InfoIcon className="fill-blue-400 text-white w-4 inline" />
        </TooltipTrigger>
        <TooltipContent side="right" className="inline-block p-2">
          <LimitTable institutionId={institutionId} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
