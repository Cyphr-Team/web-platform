import { toCurrency } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"

import { formatDate } from "@/utils/date.utils"
import { SubscriptionInfo } from "../components/SubscriptionInfo"
import { PlanType, Subscription } from "../types/subscription.types"

export const subscriptionColumns: ColumnDef<Subscription>[] = [
  {
    id: "subscriptionInfo",
    header: "Subscription Info",
    cell: ({ row }) => {
      const data = row.original

      return <SubscriptionInfo data={data} />
    },
    size: 250
  },
  {
    id: "institution",
    header: "Institution",
    size: 200,
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0">
          <p className="truncate capitalize">{data?.institutionName}</p>
        </div>
      )
    }
  },
  {
    id: "nextRenewal",
    header: "Next Renewal",
    size: 100,
    cell: ({ row }) => {
      const data = row.original

      return <div>{formatDate(data?.nextRenewal) ?? "N/A"}</div>
    }
  },
  {
    id: "price",
    header: () => <p className="text-right">Price</p>,
    size: 100,
    cell: ({ row }) => {
      const data = row.original
      const amount = data.price ? toCurrency(data?.price, 0) : "N/A"

      return (
        <div className="text-right">
          <span>{amount}</span>{" "}
          <span className="text-xs whitespace-nowrap text-text-tertiary">
            {data.type === PlanType.ANNUAL_RECURRING ? "Per year" : "One time"}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: () => <p>Created at</p>,
    size: 150,
    cell: ({ row }) => {
      const data = row.original

      return <div>{formatDate(data?.createdAt)}</div>
    }
  }
]
