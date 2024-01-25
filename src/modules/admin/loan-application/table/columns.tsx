import { ColumnDef } from "@tanstack/react-table"
import { Progress } from "@/components/ui/progress"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { Badge } from "@/components/ui/badge"

export type LoanApplication = {
  username: string
  email: string
  loanProduct: string
  loanAmount: string
  currency: string
  status: string
  progress: string
}

// TODO: Update type when integrate with API
const getBadgeVariantByStatus = (status: string) => {
  const lowerCaseStatus = status.toLowerCase()

  switch (lowerCaseStatus) {
    case "flagged":
      return "red"
    case "in progress":
      return "yellow"
    case "ready":
      return "green"
    default:
      return undefined
  }
}

export const columns: ColumnDef<LoanApplication>[] = [
  {
    id: "select",
    header: "ID",
    cell: ({ row }) => "#" + `${row.index + 1}`.padStart(4, "0"),
    enableSorting: false,
    enableHiding: false
  },
  {
    id: "applicant",
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant" />
    ),
    cell: ({ row }) => {
      const application = row.original

      return (
        <div>
          <p>{application.username}</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {application.email}
          </p>
        </div>
      )
    }
  },
  {
    accessorKey: "loanProduct",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Product" />
    )
  },
  {
    accessorKey: "loanAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Amount" />
    ),
    cell: ({ row }) => {
      const application = row.original
      const amount = parseFloat(application.loanAmount)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: application.currency || "USD"
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="font-medium">
          <Badge
            isDot
            variant="soft"
            variantColor={getBadgeVariantByStatus(application.status)}
          >
            {application.status}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="flex space-x-3 items-center mr-2">
          <Progress
            value={+application.progress}
            className="h-2 flex-shrink-0"
          />
          <p className="whitespace-nowrap">{application.progress}%</p>
        </div>
      )
    }
  },
  // Prevent crash UI
  { id: "temp" }
]
