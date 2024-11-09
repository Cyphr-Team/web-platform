import { Badge } from "@/components/ui/badge"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { Progress } from "@/components/ui/progress"
import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { cn } from "@/lib/utils"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { EmptyApplications } from "@/modules/loan-application/components/atoms/EmptyApplications"
import { useQueryGetUserLoanApplications } from "@/modules/loan-application/hooks/useQuery/useQueryUserLoanApplications"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type UserMicroLoanApplication } from "@/types/loan-application.type"
import {
  convertToReadableDate,
  convertToReadableDateAgo,
  snakeCaseToText,
  toCurrency
} from "@/utils"
import { formsConfigurationEnabled } from "@/utils/feature-flag.utils"
import { type AccessorKeyColumnDef, type Row } from "@tanstack/react-table"
import { ChevronRightIcon } from "lucide-react"
import { type NavigateFunction, useNavigate } from "react-router-dom"

export function Component() {
  const navigate = useNavigate()
  const { data, isFetching, fetchNextPage } = useQueryGetUserLoanApplications({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  const clickDetailHandler = handleClickDetail(navigate)
  const loanApplicationColumns = getLoanApplicationColumns(
    (row: Row<UserMicroLoanApplication>) => () => clickDetailHandler(row)
  )

  const getFilteredColumns =
    (): AccessorKeyColumnDef<UserMicroLoanApplication>[] => {
      if (!formsConfigurationEnabled()) {
        return loanApplicationColumns.filter(
          (column) =>
            column.accessorKey !== "loanAmount" &&
            column.accessorKey !== "progress"
        )
      } else {
        return loanApplicationColumns
      }
    }

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <h1 className="text-3xl font-semibold">Financial Projections</h1>
      <p className="text-text-tertiary mt-1">
        Keep track of your applications and their statuses
      </p>

      {!isFetching && !data?.pages[0]?.data?.length ? (
        <EmptyApplications />
      ) : (
        <InfiniteDataTable
          columns={getFilteredColumns()}
          data={data}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
        />
      )}
    </div>
  )
}
Component.displayName = "FinancialProjections"

export const handleClickDetail =
  (navigate: NavigateFunction) => (detail: Row<UserMicroLoanApplication>) => {
    const { id } = detail.original

    navigate(APP_PATH.LOAN_APPLICATION.FINANCIAL.OVERVIEW(id))
  }

export const getLoanApplicationColumns = (
  handleClickDetail: (row: Row<UserMicroLoanApplication>) => () => void
): AccessorKeyColumnDef<UserMicroLoanApplication>[] => [
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
          <p className="text-sm text-muted-foreground mt-0.5 truncate">
            {application.loanProgram.name}
          </p>
        </div>
      )
    },
    size: 300
  },
  {
    accessorKey: "loanAmount",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right w-full"
        column={column}
        title="Amount requested"
      />
    ),
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="min-w-0">
          <p className="truncate text-right">
            {toCurrency(application.loanAmount)}
          </p>
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right w-full"
        column={column}
        title="Started On"
      />
    ),
    enableSorting: false,
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
      <DataTableColumnHeader
        className="text-right w-full"
        column={column}
        title="Activity"
      />
    ),
    size: 150,
    enableSorting: false,
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
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title="Status"
      />
    ),
    size: 190,
    cell: ({ row }) => {
      const application = row.original
      const status = application?.status

      return (
        <div className="font-medium">
          <Badge
            isDot
            className="capitalize"
            variant="soft"
            variantColor={getBadgeVariantByStatus(status)}
          >
            {snakeCaseToText(status)}
          </Badge>
        </div>
      )
    }
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-right"
        column={column}
        title="Progress"
      />
    ),
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="relative">
          <Progress
            className="flex items-center justify-end"
            value={Math.round(100 * application.latestProgress)}
          />
          <span className="absolute top-1/2 transform -translate-y-1/2 pl-2 right-[-40px]">
            {Math.round(100 * application.latestProgress)}%
          </span>
        </div>
      )
    }
  },
  {
    id: "action",
    accessorKey: "detail",
    header: () => <p />,
    size: 150,
    cell: ({ row }) => {
      return (
        <div
          className="font-medium flex gap-2 items-center cursor-pointer justify-end"
          onClick={handleClickDetail(row)}
        >
          <p>Review</p>
          <ChevronRightIcon className="h-4 w-4" />
        </div>
      )
    }
  }
]
