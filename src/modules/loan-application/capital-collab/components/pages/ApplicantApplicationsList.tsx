import { Badge } from "@/components/ui/badge"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { cn } from "@/lib/utils"
import { EmptyApplications } from "@/modules/loan-application/components/atoms/EmptyApplications"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import {
  EDITABLE_STATUSES,
  type UserLoanApplication
} from "@/types/loan-application.type"
import { type AccessorKeyColumnDef, type Row } from "@tanstack/react-table"
import { ChevronRightIcon } from "lucide-react"
import { type NavigateFunction, useNavigate } from "react-router-dom"
import { useQueryGetUserLoanApplications } from "@/modules/loan-application/hooks/application/useQueryUserLoanApplications.ts"
import {
  getBadgeVariantByStatus,
  getStatusDisplayName
} from "@/modules/loan-application/capital-collab/services"
import { format } from "date-fns"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"

export function Component() {
  const navigate = useNavigate()
  const { data, fetchNextPage, isFetching } = useQueryGetUserLoanApplications({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  const clickDetailHandler = handleClickDetail(navigate)
  const loanApplicationColumns = getLoanApplicationColumns(
    (row: Row<UserLoanApplication>) => () => clickDetailHandler(row)
  )

  return (
    <div className={cn("container mx-auto p-2xl", "md:p-4xl")}>
      <h1 className="text-3xl font-semibold">Account Applications</h1>
      <p className="mt-1 text-text-tertiary">
        Keep track of your applications and their statuses
      </p>

      {!isFetching && !data?.pages[0]?.data?.length ? (
        <EmptyApplications />
      ) : (
        <InfiniteDataTable
          columns={loanApplicationColumns}
          data={data}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
        />
      )}
    </div>
  )
}

Component.displayName = "CCCApplicantLoanApplications"

interface NavigationConfig {
  path: string
  state?: object
}

export const handleClickDetail =
  (navigate: NavigateFunction) => (detail: Row<UserLoanApplication>) => {
    const { id, loanProgram } = detail.original
    const { id: loanProgramId } = loanProgram
    const navigationConfigs: Record<string, NavigationConfig> = {
      editable: {
        path: APP_PATH.LOAN_APPLICATION.APPLICATIONS.editing(id, loanProgramId),
        state: { backUrl: APP_PATH.LOAN_APPLICATION.APPLICATIONS.index }
      },
      default: {
        path: APP_PATH.LOAN_APPLICATION.APPLICATIONS.details(id, loanProgramId)
      }
    }

    let configKey = "default"

    if (EDITABLE_STATUSES.includes(detail.original.status)) {
      configKey = "editable"
    }
    const { path, state } = navigationConfigs[configKey]

    navigate(path, {
      state: {
        ...state,
        loanProgramDetails: loanProgram
      }
    })
  }

const getLoanApplicationColumns = (
  handleClickDetail: (row: Row<UserLoanApplication>) => () => void
): AccessorKeyColumnDef<UserLoanApplication>[] => [
  {
    accessorKey: "businessName",
    header: "Company Name",
    cell: ({ row }) => {
      const application = row.original

      return <div>{application?.businessName ?? "-"}</div>
    },
    size: 240
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const application = row.original

      return <div className="truncate">{application?.email ?? "-"}</div>
    },
    size: 280
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="truncate">
          {application.createdAt
            ? format(application.createdAt, FORMAT_DATE_M_D_Y)
            : "-"}
        </div>
      )
    }
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted On",
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="truncate">
          {application.submittedAt
            ? format(application.submittedAt, FORMAT_DATE_M_D_Y)
            : "-"}
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
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="font-medium">
          <Badge
            isDot
            className="truncate"
            variant="soft"
            variantColor={getBadgeVariantByStatus(application.status)}
          >
            {getStatusDisplayName(application.status)}
          </Badge>
        </div>
      )
    }
  },
  {
    id: "action",
    accessorKey: "detail",
    header: "",
    size: 150,
    cell: ({ row }) => {
      return (
        <div
          className="flex cursor-pointer items-center justify-end gap-2 font-medium"
          onClick={handleClickDetail(row)}
        >
          {EDITABLE_STATUSES.includes(row.original.status) ? (
            <p>Continue</p>
          ) : (
            <p>Review</p>
          )}
          <ChevronRightIcon className="size-4" />
        </div>
      )
    }
  }
]
