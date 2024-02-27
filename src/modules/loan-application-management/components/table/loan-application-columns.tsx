import { ColumnDef } from "@tanstack/react-table"
import { Progress } from "@/components/ui/progress"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { Badge } from "@/components/ui/badge"
import { LoanApplication } from "@/types/loan-application.type"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { snakeCaseToText } from "@/utils"
import { getBadgeVariantByStatus } from "../../services"

export const loanApplicationColumns: ColumnDef<LoanApplication>[] = [
  {
    id: "select",
    header: "ID",
    cell: ({ row }) => {
      const application = row.original

      return (
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              {`${application.id}`.substring(application.id.length - 4)}
            </TooltipTrigger>
            <TooltipContent side="right">{`${application.id}`}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    enableSorting: false,
    enableHiding: false,
    size: 80
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
        <div className="min-w-0">
          <p className="truncate">{application.applicant.name}</p>
          <p className="text-sm text-muted-foreground mt-0.5 truncate ">
            {application.applicant.email}
          </p>
        </div>
      )
    },
    size: 200
  },
  {
    accessorKey: "programType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Product" />
    ),
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="min-w-0">
          <p className="truncate capitalize">{application.programType}</p>
        </div>
      )
    }
  },
  {
    accessorKey: "loanAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Amount" />
    ),
    size: 150,
    cell: ({ row }) => {
      const application = row.original
      const amount = parseFloat(application.loanAmount + "")
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(amount)

      return (
        <div className="font-medium">{isNaN(amount) ? "N/A" : formatted}</div>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    size: 200,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="font-medium">
          <Badge
            isDot
            variant="soft"
            variantColor={getBadgeVariantByStatus(application.status)}
            className="capitalize"
          >
            {snakeCaseToText(application.status)}
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
    size: 200,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="flex space-x-3 items-center mr-2 flex-1">
          <Progress
            value={+application.progress}
            className="h-2 flex-shrink-0"
          />
          <p className="whitespace-nowrap">{application.progress}%</p>
        </div>
      )
    }
  },
  { id: "preventCrashUI", size: 0 }
]
