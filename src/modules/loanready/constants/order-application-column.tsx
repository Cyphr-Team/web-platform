import { type ColumnDef, type Row } from "@tanstack/react-table"
import { renderHeader } from "@/utils/table.utils"
import { type OrderLoanApplication } from "@/modules/loanready/types/order-application.ts"
import { EDITABLE_STATUSES } from "@/types/loan-application.type.ts"
import { ChevronRightIcon } from "lucide-react"
import { convertToReadableDate, snakeCaseToText } from "@/utils"
import { Badge } from "@/components/ui/badge.tsx"
import { getBadgeVariantByStatus } from "@/modules/loan-application-management/services"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package.ts"

/**
 * Columns for workspace admin list applications
 */
export const orderApplicationColumn = (
  handleClickDetail: (row: Row<OrderLoanApplication>) => VoidFunction
): ColumnDef<OrderLoanApplication>[] => [
  {
    id: "businessName",
    header: renderHeader("Company Name", "text-black font-semibold text-sm"),
    cell: ({ row }) => {
      return <div>{row.original?.businessName ?? "---"}</div>
    }
  },
  {
    id: "loanProgram",
    header: renderHeader("Product", "text-black font-semibold text-sm"),
    cell: ({ row }) => {
      const planToLoanProgramMapping = new Map([
        [LoanReadyPlanEnum.BASIC.toString(), "LoanReady"],
        [LoanReadyPlanEnum.PLUS.toString(), "LoanReady+"],
        [undefined, "---"]
      ])

      const loanProgram = planToLoanProgramMapping.get(
        row.original?.plan?.toUpperCase()
      )

      return <div>{loanProgram}</div>
    }
  },
  {
    id: "email",
    header: renderHeader("Email", "text-black font-semibold text-sm"),
    cell: ({ row }) => {
      return <div>{row.original?.ownerEmail ?? "---"}</div>
    }
  },
  {
    id: "createdOn",
    header: renderHeader("Created On", "text-black font-semibold text-sm"),
    cell: ({ row }) => {
      return <p>{convertToReadableDate(row.original.createdAt)}</p>
    }
  },
  {
    id: "submittedOn",
    header: renderHeader("Submitted On", "text-black font-semibold text-sm"),
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
    header: renderHeader(
      "Assessment Status",
      "text-black font-semibold text-sm"
    ),
    cell: ({ row }) => {
      const application = row.original
      const status = application.status

      return (
        <div className="font-medium">
          <Badge
            className="capitalize py-1"
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
          className="flex cursor-pointer items-center justify-end gap-2 font-semibold"
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
