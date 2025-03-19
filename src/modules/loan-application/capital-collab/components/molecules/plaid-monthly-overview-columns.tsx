import { type ColumnDef } from "@tanstack/react-table"
import { type PlaidMonthlyOverview } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/v2/useQueryPlaidMonthlyOverview.tsx"
import { renderFilterableHeader } from "@/utils/table.utils.tsx"

export const plaidMonthlyOverviewColumns: ColumnDef<PlaidMonthlyOverview>[] = [
  {
    id: "month",
    accessorKey: "month",
    header: renderFilterableHeader({ title: "Month" }),
    cell: ({ row }) => {
      const application = row.original

      return <div className="font-medium">{application.month}</div>
    },
    size: 200
  },
  {
    id: "year",
    accessorKey: "year",
    header: renderFilterableHeader({ title: "Year" }),
    cell: ({ row }) => {
      const application = row.original

      return <div className="font-medium">{application.year}</div>
    },
    size: 200
  },
  {
    id: "totalAmount",
    accessorKey: "totalAmount",
    header: renderFilterableHeader({ title: "$ Deposits" }),
    cell: ({ row }) => {
      const application = row.original

      return <div className="font-medium">{application.totalAmount}</div>
    },
    size: 200
  },
  {
    id: "depositCount",
    accessorKey: "depositCount",
    header: renderFilterableHeader({ title: "# Deposits" }),
    cell: ({ row }) => {
      const application = row.original

      return <div className="font-medium">{application.depositCount}</div>
    },
    size: 200
  },
  {
    id: "avgDailyBalance",
    accessorKey: "avgDailyBalance",
    header: renderFilterableHeader({ title: "Avg. Daily Balance" }),
    cell: ({ row }) => {
      const application = row.original

      return <div className="font-medium">{application.avgDailyBalance}</div>
    },
    size: 200
  },
  {
    id: "nsfCount",
    accessorKey: "nsfCount",
    header: renderFilterableHeader({ title: "# NSFs" }),
    cell: ({ row }) => {
      const application = row.original

      return <div className="font-medium">{application.nsfCount}</div>
    },
    size: 200
  },
  {
    id: "ndbCount",
    accessorKey: "ndbCount",
    header: renderFilterableHeader({ title: "# NDBs" }),
    cell: ({ row }) => {
      const application = row.original

      return <div className="font-medium">{application.ndbCount}</div>
    },
    size: 200
  }
]
