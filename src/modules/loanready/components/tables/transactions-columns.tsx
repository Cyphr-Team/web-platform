import { type ColumnDef } from "@tanstack/react-table"

import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import { format } from "date-fns"
import { renderFilterableHeader } from "@/utils/table.utils.tsx"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header.tsx"
import {
  getBadgeVariantByStatus,
  getStatusDisplayName,
  RefundDecisionStatus,
  RefundStatus,
  type Transaction
} from "@/types/transaction.type"
import { LoanReadyPlanEnum } from "@/modules/loanready/constants/package"
import { isLoanReady } from "@/utils/domain.utils"
import { Badge } from "@/components/ui/badge.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput"
import { RefundButton } from "@/modules/loanready/components/molecules/RefundButton"

export const listTransactionsColumns: ColumnDef<Transaction>[] = [
  {
    id: "companyName",
    header: renderFilterableHeader({
      title: "Company Name",
      btnClassName: "justify-start pl-0"
    }),
    size: 80,
    cell: ({ row }) => {
      const transaction = row.original

      return <div className="font-medium">{transaction.companyName ?? "-"}</div>
    }
  },
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
  {
    id: "product",
    header: renderFilterableHeader({ title: "Product" }),
    size: 200,
    cell: ({ row }) => {
      const transaction = row.original

      if (isLoanReady()) {
        return (
          <div>
            {transaction.product.toUpperCase() === LoanReadyPlanEnum.BASIC
              ? "LoanReady"
              : "LoanReady+"}
          </div>
        )
      }

      return <div>-</div>
    }
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: renderFilterableHeader({
      title: "Amount"
    }),
    size: 180,
    cell: ({ row }) => {
      const transaction = row.original

      return (
        <div>
          {USDFormatter(transaction.amount, {
            symbol: "$",
            precision: 2
          }).format() ?? "-"}
        </div>
      )
    }
  },
  {
    id: "paidOn",
    accessorKey: "paidOn",
    header: renderFilterableHeader({ title: "Paid On" }),
    cell: ({ row }) => {
      const transaction = row.original

      return (
        <div className="truncate">
          {transaction.paidOn
            ? format(transaction.paidOn, FORMAT_DATE_M_D_Y)
            : "-"}
        </div>
      )
    }
  },
  {
    id: "status",
    accessorKey: "status",
    header: renderFilterableHeader({ title: "Transaction Status" }),
    cell: ({ row }) => {
      const status = row.original.status as RefundStatus

      return (
        <Badge
          className="truncate"
          variant="soft"
          variantColor={getBadgeVariantByStatus(status)}
        >
          {getStatusDisplayName(status)}
        </Badge>
      )
    }
  },
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
      const status = row.original.status.toUpperCase()

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
