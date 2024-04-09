import { Badge } from "@/components/ui/badge"
import { getSubscriptionStatusBadge } from "../services/subscription.services"
import {
  Limit,
  PlanType,
  Subscription,
  SubscriptionStatus
} from "../types/subscription.types"
import { snakeCaseToText } from "@/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

type SubscriptionInfoProps = {
  data: Subscription
}

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

export const SubscriptionInfo = ({ data }: SubscriptionInfoProps) => {
  return (
    <div className="flex gap-1">
      <div>
        <Badge
          isDot
          variant="soft"
          variantColor={getSubscriptionStatusBadge(data?.status)}
          className="capitalize w-24 justify-center"
        >
          {snakeCaseToText(data?.status ?? "")}
        </Badge>
      </div>
      <div>
        <span>{data?.planName ?? "N/A"}</span> -{" "}
        <span className="capitalize mr-0.5">
          {snakeCaseToText(data?.type ?? "") || "N/A"}
        </span>
        {data?.type === PlanType.ANNUAL_RECURRING &&
          data.status === SubscriptionStatus.ACTIVE && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <InfoIcon className="fill-blue-400 text-white w-4 inline" />
                </TooltipTrigger>
                <TooltipContent side="right" className="inline-block p-2">
                  <div>
                    <h4 className="font-medium text-center">
                      Institution usages
                    </h4>
                    <DataTable
                      tableContainerClassName="-mt-4"
                      columns={limitColumns}
                      data={data?.limit ?? []}
                      total={data?.limit?.length ?? 0}
                    />
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
      </div>
    </div>
  )
}
