import { Badge } from "@/components/ui/badge"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { Progress } from "@/components/ui/progress"
import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { cn } from "@/lib/utils"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { EmptyApplications } from "@/modules/loan-application/components/atoms/EmptyApplications"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import {
  EDITABLE_STATUSES,
  LoanApplicationStatus,
  UserMicroLoanApplication
} from "@/types/loan-application.type"
import {
  convertToReadableDate,
  convertToReadableDateAgo,
  snakeCaseToText,
  toCurrency
} from "@/utils"
import { isLaunchKC, isLoanReady, isSbb } from "@/utils/domain.utils"
import { formsConfigurationEnabled } from "@/utils/feature-flag.utils"
import { AccessorKeyColumnDef, Row } from "@tanstack/react-table"
import { ChevronRightIcon } from "lucide-react"
import { NavigateFunction, useNavigate } from "react-router-dom"
import { useQueryGetUserLoanApplications } from "../hooks/useQuery/useQueryUserLoanApplications"

export function Component() {
  const navigate = useNavigate()
  const { data, fetchNextPage, isFetching } = useQueryGetUserLoanApplications({
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
Component.displayName = "ApplicantLoanApplications"

type NavigationConfig = {
  path: string
  state?: object
}
export const handleClickDetail =
  (navigate: NavigateFunction) => (detail: Row<UserMicroLoanApplication>) => {
    const { id, loanProgram } = detail.original
    const { id: loanProgramId } = loanProgram
    const navigationConfigs: Record<string, NavigationConfig> = {
      editable: {
        path: APP_PATH.LOAN_APPLICATION.APPLICATIONS.editing(id, loanProgramId),
        state: { backUrl: APP_PATH.LOAN_APPLICATION.APPLICATIONS.index }
      },
      loanReady: {
        path: APP_PATH.LOAN_APPLICATION.APPLICATIONS.financialApplicationDetails(
          id,
          loanProgramId
        )
      },
      default: {
        path: APP_PATH.LOAN_APPLICATION.APPLICATIONS.details(id, loanProgramId)
      }
    }

    let configKey = "default"
    if (EDITABLE_STATUSES.includes(detail.original.status)) {
      configKey = "editable"
    } else if (isLoanReady()) {
      configKey = "loanReady"
    }
    const { path, state } = navigationConfigs[configKey]

    navigate(path, {
      state: {
        ...state,
        loanProgramDetails: loanProgram
      }
    })
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
    header: () => <p></p>,
    size: 150,
    cell: ({ row }) => {
      return (
        <div
          className="font-medium flex gap-2 items-center cursor-pointer justify-end"
          onClick={handleClickDetail(row)}
        >
          {EDITABLE_STATUSES.includes(row.original.status) ? (
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
