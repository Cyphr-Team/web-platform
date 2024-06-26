import { Badge } from "@/components/ui/badge"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import {
  LoanApplicationStatus,
  UserMicroLoanApplication
} from "@/types/loan-application.type"
import {
  convertToReadableDate,
  convertToReadableDateAgo,
  snakeCaseToText,
  toCurrency
} from "@/utils"
import { AccessorKeyColumnDef, Row } from "@tanstack/react-table"
import { useQueryGetUserLoanApplications } from "../hooks/useQuery/useQueryUserLoanApplications"
import { ChevronRightIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress.tsx"
import { formsConfigurationEnabled } from "@/utils/feature-flag.utils.ts"

export function Component() {
  const { data, fetchNextPage, isFetching } = useQueryGetUserLoanApplications({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  const navigate = useNavigate()

  const loanApplicationColumns: AccessorKeyColumnDef<UserMicroLoanApplication>[] =
    [
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
        accessorKey: "loanAmount",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Ammount request"
            className="text-right w-full"
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
            column={column}
            title="Activity"
            className="text-right w-full"
          />
        ),
        size: 100,
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
            column={column}
            title="Status"
            className="text-right"
          />
        ),
        size: 150,
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
                {snakeCaseToText(application.status ?? "Draft")}
              </Badge>
            </div>
          )
        }
      },
      {
        accessorKey: "progress",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Progress"
            className="text-right"
          />
        ),
        size: 150,
        cell: ({ row }) => {
          const application = row.original
          return (
            <div className="relative">
              <Progress
                value={Math.round(100 * application.latestProgress)}
                className="flex items-center justify-end"
              ></Progress>
              <span className="absolute top-1/2 transform -translate-y-1/2 pl-2 right-[-30px] ">
                {Math.round(100 * application.latestProgress)}
              </span>
            </div>
          )
        }
      },
      {
        accessorKey: "detail",
        header: () => <p></p>,
        size: 150,
        cell: ({ row }) => {
          return (
            <div
              className="font-medium flex gap-2 items-center cursor-pointer justify-end"
              onClick={() => handleClickDetail(row)}
            >
              {row.original.status ===
              LoanApplicationStatus.DRAFT.toLowerCase() ? (
                <p>Continue</p>
              ) : (
                <p>Review</p>
              )}
              <ChevronRightIcon className="h-4 w-4" />
            </div>
          )
        }
      }
    ]

  const handleClickDetail = (detail: Row<UserMicroLoanApplication>) => {
    if (detail.original.status === LoanApplicationStatus.DRAFT.toLowerCase()) {
      navigate(
        APP_PATH.LOAN_APPLICATION.APPLICATIONS.editing(
          detail.original.id,
          detail.original.loanProgram.id
        ),
        {
          state: {
            loanProgramDetails: detail.original.loanProgram,
            backUrl: APP_PATH.LOAN_APPLICATION.APPLICATIONS.index
          }
        }
      )
    } else {
      navigate(
        APP_PATH.LOAN_APPLICATION.APPLICATIONS.details(
          detail.original.id,
          detail.original.loanProgram.id
        ),
        { state: { loanProgramDetails: detail.original.loanProgram } }
      )
    }
  }

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <h1 className="text-3xl font-semibold">Your Applications</h1>
      <p className="text-text-tertiary mt-1">
        Keep track of your applications and their statuses
      </p>
      <InfiniteDataTable
        columns={
          !formsConfigurationEnabled()
            ? loanApplicationColumns.filter((column) => {
                return (
                  column.accessorKey !== "loanAmount" &&
                  column.accessorKey !== "progress"
                )
              })
            : loanApplicationColumns
        }
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  )
}
