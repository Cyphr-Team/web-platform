import { toCurrency } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"

import { formatDate } from "@/utils/date.utils"
import { SubscriptionInfo } from "../components/SubscriptionInfo"
import { PlanType, type Subscription } from "../types/subscription.types"
import { addYears } from "date-fns"

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
          <p className="truncate capitalize">{data?.institution?.name}</p>
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
      const isAnnualRecurringType =
        data?.plan?.type === PlanType.ANNUAL_RECURRING

      const nextRenewalDate =
        isAnnualRecurringType && data?.startedAt
          ? addYears(data.startedAt, 1)?.toISOString()
          : "N/A"

      return (
        <div>{isAnnualRecurringType ? formatDate(nextRenewalDate) : "N/A"}</div>
      )
    }
  },
  {
    id: "price",
    header: () => <p className="text-right">Price</p>,
    size: 100,
    cell: ({ row }) => {
      const data = row.original
      const isAnnualRecurringType =
        data?.plan?.type === PlanType.ANNUAL_RECURRING
      const amount = data?.plan?.price
        ? toCurrency(data?.plan?.price, 0)
        : "N/A"

      return (
        <div className="text-right">
          <span>{amount}</span>{" "}
          <span className="text-xs whitespace-nowrap text-text-tertiary">
            {isAnnualRecurringType ? "Per year" : "One time"}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "startedAt",
    header: () => <p>Started at</p>,
    size: 150,
    cell: ({ row }) => {
      const data = row.original

      return <div>{formatDate(data?.startedAt)}</div>
    }
  }
]
