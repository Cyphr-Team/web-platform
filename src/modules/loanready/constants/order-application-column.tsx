import { type ColumnDef, type Row } from "@tanstack/react-table"
import { renderHeader } from "@/utils/table.utils"
import { type OrderLoanApplication } from "@/modules/loanready/types/order-application.ts"
import { EDITABLE_STATUSES } from "@/types/loan-application.type.ts"
import { ChevronRightIcon } from "lucide-react"
import { convertToReadableDate, snakeCaseToText } from "@/utils"
import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"

/**
 * Columns for workspace admin list applications
 */
export const orderApplicationColumn = (
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
  // TODO: Implement Loan Ready score
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
