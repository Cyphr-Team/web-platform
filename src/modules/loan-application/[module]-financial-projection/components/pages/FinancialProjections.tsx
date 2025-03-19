import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import {
  type ColumnDef,
  type PaginationState,
  type Row
} from "@tanstack/react-table"
import { useSearchOrderLoanApplications } from "@/modules/loanready/hooks/applications/order-list.ts"
import { DataTable } from "@/components/ui/data-table.tsx"
import { useState } from "react"
import { type NavigateFunction, useNavigate } from "react-router-dom"
import { EmptyApplications } from "@/modules/loan-application/components/atoms/EmptyApplications.tsx"
import type { OrderLoanApplication } from "@/modules/loanready/types/order-application.ts"
import { renderHeader } from "@/utils/table.utils.tsx"
import { convertToReadableDate, snakeCaseToText } from "@/utils"
import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { EDITABLE_STATUSES } from "@/types/loan-application.type.ts"
import { ChevronRightIcon } from "lucide-react"
import { isEnableLoanReadyV2 } from "@/utils/feature-flag.utils.ts"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"

export function Component() {
  return <LoanReadyFinancialApplications />
}

export default function LoanReadyFinancialApplications() {
  const navigate = useNavigate()

  // Paginate state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  // Query list applications
  const { data, isFetching } = useSearchOrderLoanApplications({
    request: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      filter: {
        plan: isEnableLoanReadyV2() ? [LoanReadyPlanEnum.PLUS] : []
      }
    }
  })

  const clickDetailHandler =
    loanReadyFinancialApplicationHandleClickDetail(navigate)
  const loanApplicationColumns = orderFinancialApplicationColumn(
    (row) => () => clickDetailHandler(row)
  )

  return (
    <div className="container mx-auto p-2xl md:p-4xl">
      <h1 className="text-3.5xl font-semibold">Financial Projections</h1>
      <p className="mb-2 mt-1">
        Keep track of your account applications and their statuses
      </p>

      {!isFetching && !data?.data.data?.length ? (
        <EmptyApplications
          linkTo={APP_PATH.LOAN_APPLICATION.APPLICATIONS.payment}
        />
      ) : (
        <DataTable
          columns={loanApplicationColumns}
          data={data?.data.data ?? []}
          isLoading={isFetching}
          pagination={pagination}
          setPagination={setPagination}
          tableCellClassName="text-[#667085]"
          tableContainerClassName="flex h-[85vh] flex-1 flex-col rounded-full"
          tableHeadClassName="text-xs text-[#667085]"
          tableHeaderClassName="bg-[#f9fafb] !text-xs"
          tableWrapperClassName="rounded-lg"
          total={data?.data.total ?? 0}
        />
      )}
    </div>
  )
}

Component.displayName = "ApplicantOrderFinancialLoanApplications"

const loanReadyFinancialApplicationHandleClickDetail =
  (navigate: NavigateFunction) => (detail: Row<OrderLoanApplication>) => {
    const { id, loanProgram } = detail.original
    const { id: loanProgramId } = loanProgram
    const navigationConfigs: Record<string, { path: string; state?: object }> =
      {
        editable: {
          path: APP_PATH.LOAN_APPLICATION.APPLICATIONS.editing(
            id,
            loanProgramId
          ),
          state: { backUrl: APP_PATH.LOAN_APPLICATION.APPLICATIONS.index }
        },
        financialOverview: {
          path: APP_PATH.LOAN_APPLICATION.FINANCIAL.OVERVIEW(id)
        }
      }

    let configKey = "financialOverview"

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

export const orderFinancialApplicationColumn = (
  handleClickDetail: (row: Row<OrderLoanApplication>) => VoidFunction
): ColumnDef<OrderLoanApplication>[] => [
  {
    id: "businessName",
    header: renderHeader("Business name"),
    cell: ({ row }) => {
      return <div>{row.original?.businessName ?? "---"}</div>
    }
  },
  {
    id: "email",
    header: renderHeader("Email"),
    cell: ({ row }) => {
      return <div>{row.original?.ownerEmail ?? "---"}</div>
    }
  },
  {
    id: "createdOn",
    header: renderHeader("Created On"),
    cell: ({ row }) => {
      return <p>{convertToReadableDate(row.original.createdAt)}</p>
    }
  },
  {
    id: "submittedOn",
    header: renderHeader("Submitted On"),
    cell: ({ row }) => {
      return (
        <p>
          {row.original.submittedAt
            ? convertToReadableDate(row.original.submittedAt)
            : "---"}
        </p>
      )
    }
  },
  {
    id: "status",
    header: renderHeader("Status"),
    cell: ({ row }) => {
      const application = row.original
      const status = application.status

      return (
        <div className="font-medium">
          <Badge
            isDot
            className="capitalize"
            variant="soft"
            variantColor={getBadgeVariantByStatus(status)}
          >
            {status ? snakeCaseToText(status) : ""}
          </Badge>
        </div>
      )
    }
  },
  {
    id: "action",
    header: renderHeader(""),
    cell: ({ row }) => {
      return (
        <div
          className="flex cursor-pointer items-center justify-end gap-2 font-medium"
          onClick={handleClickDetail(row)}
        >
          {EDITABLE_STATUSES.includes(row.original.status?.toLowerCase()) ? (
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
