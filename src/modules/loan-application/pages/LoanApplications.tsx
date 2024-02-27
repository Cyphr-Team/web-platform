import { Badge } from "@/components/ui/badge"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { UserLoanApplication } from "@/types/loan-application.type"
import {
  convertToReadableDate,
  convertToReadableDateAgo,
  snakeCaseToText
} from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { useQueryGetUserLoanApplications } from "../hooks/useQuery/useQueryUserLoanApplications"
import { ChevronRightIcon } from "lucide-react"

export function Component() {
  const { data, fetchNextPage, isFetching } = useQueryGetUserLoanApplications({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  const loanApplicationColumns: ColumnDef<UserLoanApplication>[] = [
    {
      id: "applicant",
      accessorKey: "loanProgram",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Loan Program" />
      ),
      cell: ({ row }) => {
        const application = row.original
        return (
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground mt-0.5 truncate ">
              {application.loanProgram.name}
            </p>
          </div>
        )
      },
      size: 300
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Started On" />
      ),
      size: 150,
      cell: ({ row }) => {
        const application = row.original

        return (
          <div className="min-w-0">
            <p className="truncate capitalize text-right">
              {convertToReadableDate(application.createdAt)}
            </p>
          </div>
        )
      }
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Activity" />
      ),
      size: 150,
      cell: ({ row }) => {
        const application = row.original

        return (
          <div className="min-w-0">
            <p className="truncate text-right">
              {convertToReadableDateAgo(application.updatedAt)}
            </p>
          </div>
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
        //TODO: Add status in BE sides
        return (
          <div className="font-medium">
            <Badge
              isDot
              variant="soft"
              variantColor={getBadgeVariantByStatus(application.status)}
              className="capitalize"
            >
              {snakeCaseToText(application.status ?? "Draft")}
            </Badge>
          </div>
        )
      }
    },
    {
      id: "action",
      size: 150,
      cell: () => {
        //TODO: Add status in BE sides
        return (
          <div className="font-medium flex gap-2 items-center">
            <span>Continue</span>
            <ChevronRightIcon className="h-4 w-4" />
          </div>
        )
      }
    },
    { id: "preventCrashUI", size: 0 }
  ]

  return (
    <div className="container mx-auto py-4xl">
      <h1 className="text-3xl font-semibold">Loan Applications</h1>
      <p className="text-text-tertiary">
        Keep track of your loan applications and their statues
      </p>
      <InfiniteDataTable
        columns={loanApplicationColumns}
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  )
}
