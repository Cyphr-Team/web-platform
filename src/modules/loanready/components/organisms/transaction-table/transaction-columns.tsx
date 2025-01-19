import { type ColumnDef } from "@tanstack/react-table"
import { renderFilterableHeader } from "@/utils/table.utils"
import { type OrderLoanApplication } from "@/modules/loanready/types/order-application.ts"
import { convertToReadableDate, snakeCaseToText } from "@/utils"
import { Badge } from "@/components/ui/badge.tsx"
import {
  LoanReadyPlanEnum,
  LoanReadyRefundEnum
} from "@/modules/loanready/constants/package.ts"
import { getBadgeVariantByTransactionStatus } from "@/modules/loanready/services"
import RefundTableAction from "./refund-table-action"

/**
 * Columns for workspace admin list applications
 */
export const transactionColumns: ColumnDef<OrderLoanApplication>[] = [
  {
    id: "businessName",
    header: renderFilterableHeader({ title: "Company name" }),
    accessorFn: (row) => row.businessName ?? "---"
  },
  {
    id: "ownerEmail",
    header: renderFilterableHeader({ title: "Email" }),
    accessorFn: (row) => row.ownerEmail ?? "---"
  },
  {
    id: "loanProgram",
    header: renderFilterableHeader({ title: "Product" }),
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
    id: "purchasedAt",
    accessorKey: "purchasedAt",
    header: renderFilterableHeader({ title: "Paid On" }),
    accessorFn: (row) => convertToReadableDate(row.purchasedAt)
  },
  {
    id: "transactionStatus",
    header: renderFilterableHeader({
      title: "Transaction Status"
    }),
    cell: () => {
      const availableStatuses = [
        LoanReadyRefundEnum.PAID,
        LoanReadyRefundEnum.REFUNDED,
        LoanReadyRefundEnum.REQUESTED_REFUND,
        LoanReadyRefundEnum.DENIED_REFUND
      ]
      const status = availableStatuses[Math.floor(Math.random() * 4)]

      return (
        <Badge
          className="capitalize py-1 text-sm whitespace-nowrap font-medium"
          variant="soft"
          variantColor={getBadgeVariantByTransactionStatus(status)}
        >
          {status ? snakeCaseToText(status) : ""}
        </Badge>
      )
    }
  },
  {
    id: "action",
    header: "",
    cell: ({ row }) => RefundTableAction({ row })
  }
]
