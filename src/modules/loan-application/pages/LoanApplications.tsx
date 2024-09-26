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
import { ChevronRightIcon, HelpCircle, Plus } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { formsConfigurationEnabled } from "@/utils/feature-flag.utils"
import { isLaunchKC, isSbb } from "@/utils/domain.utils"
import { Button } from "@/components/ui/button"

export function Component() {
  const { data, fetchNextPage, isFetching } = useQueryGetUserLoanApplications({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  const navigate = useNavigate()

  const editableStatuses = [
    LoanApplicationStatus.DRAFT.toLowerCase(),
    LoanApplicationStatus.PENDING_SUBMISSION.toLowerCase()
  ]

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
            title="Amount requested"
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
            column={column}
            title="Status"
            className="text-right"
          />
        ),
        size: 190,
        cell: ({ row }) => {
          const application = row.original
          const sbbStatus =
            application?.status?.toUpperCase() !== LoanApplicationStatus.DRAFT
              ? LoanApplicationStatus.SUBMITTED
              : LoanApplicationStatus.DRAFT
          const status = isSbb() ? sbbStatus : application?.status

          return (
            <div className="font-medium">
              <Badge
                isDot
                variant="soft"
                variantColor={getBadgeVariantByStatus(status)}
                className="capitalize"
              >
                {snakeCaseToText(isSbb() ? sbbStatus.toLowerCase() : status)}
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
              <span className="absolute top-1/2 transform -translate-y-1/2 pl-2 right-[-40px] ">
                {Math.round(100 * application.latestProgress)}%
              </span>
            </div>
          )
        }
      },
      {
        id: "action",
        accessorKey: "detail",
        header: () => <p></p>,
        size: 150,
        cell: ({ row }) => {
          return (
            <div
              className="font-medium flex gap-2 items-center cursor-pointer justify-end"
              onClick={() => handleClickDetail(row)}
            >
              {editableStatuses.includes(row.original.status) ? (
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
    if (editableStatuses.includes(detail.original.status)) {
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

  const getFilteredColumns = () => {
    if (!formsConfigurationEnabled()) {
      return loanApplicationColumns.filter(
        (column) =>
          column.accessorKey !== "loanAmount" &&
          column.accessorKey !== "progress"
      )
    } else if (isLaunchKC()) {
      return loanApplicationColumns.filter(
        (column) => column.accessorKey !== "loanAmount"
      )
    } else {
      return loanApplicationColumns
    }
  }

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <h1 className="text-3xl font-semibold">
        {isSbb() ? "Account Applications" : "Your Applications"}
      </h1>
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

export const EmptyApplications = () => {
  return (
    <div className="flex flex-col items-center text-center justify-center max-w-80 mx-auto gap-xl mt-5xl">
      <div className="border-2 w-12 h-12 rounded-xl flex items-center">
        <HelpCircle className="w-6 h-6 mx-auto" />
      </div>
      <div>
        <p className="text-text-primary text-md font-semibold">
          No loan applications yet?
        </p>
        <p className="text-text-tertiary text-sm font-normal">
          No worries. Let’s get you started!
        </p>
        <p className="text-text-tertiary text-sm font-normal">
          We’ll guide you through step-by-step.
        </p>
      </div>{" "}
      <Link to={APP_PATH.LOAN_APPLICATION.LOAN_PROGRAM.all}>
        <Button className="mt-4 bg-lime-400 hover:bg-lime-300 text-text-primary font-semibold text-sm">
          Start Application <Plus className="w-4 h-4 ml-1" />
        </Button>
      </Link>
    </div>
  )
}
