import { type ColumnDef } from "@tanstack/react-table"

import { renderFilterableHeader } from "@/utils/table.utils.tsx"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header.tsx"
import {
  RefundDecisionStatus,
  RefundStatus,
  type Transaction
} from "@/types/transaction.type"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { RefundButton } from "@/modules/loanready/components/molecules/RefundButton"
import {
  baseListTransactionsColumns,
  companyNameColumn
} from "./base-transactions-columns"

export const adminTransactionsColumns: ColumnDef<Transaction>[] = [
  companyNameColumn,
  {
    id: "email",
    header: renderFilterableHeader({
      title: "Email",
      btnClassName: "justify-start pl-0"
    }),
    size: 80,
    cell: ({ row }) => {
      const transaction = row.original

      return <div className="font-medium">{transaction.email}</div>
    }
  },
  ...baseListTransactionsColumns,
  {
    id: "action",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="font-semibold"
        column={column}
        title="Action"
      />
    ),
    cell: ({ row }) => {
      const status = row.original.transactionStatus.toUpperCase()
      const isEligibleToRefund = row.original.isEligibleToRefund

      if (!isEligibleToRefund) return null

      if (
        status === RefundStatus.REQUESTED_REFUND ||
        status === RefundStatus.PAID
      ) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-center" size="icon" variant="ghost">
                <MoreHorizontal className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>
                <RefundButton
                  actionText={
                    status === RefundStatus.REQUESTED_REFUND
                      ? "Approve refund"
                      : "Refund transaction"
                  }
                  amount={row.original.amount}
                  email={row.original.email}
                  refundDecision={RefundDecisionStatus.APPROVED}
                  transactionId={row.original.id}
                />
              </DropdownMenuLabel>
              {status === RefundStatus.REQUESTED_REFUND && (
                <DropdownMenuLabel>
                  <RefundButton
                    actionText="Reject refund"
                    amount={row.original.amount}
                    email={row.original.email}
                    refundDecision={RefundDecisionStatus.DENIED}
                    transactionId={row.original.id}
                  />
                </DropdownMenuLabel>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  }
]
