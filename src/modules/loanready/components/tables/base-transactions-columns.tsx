import { type ColumnDef } from "@tanstack/react-table"

import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants.ts"
import { format } from "date-fns"
import { renderFilterableHeader } from "@/utils/table.utils.tsx"
import {
  getBadgeVariantByStatus,
  getStatusDisplayName,
  type RefundStatus,
  type Transaction
} from "@/types/transaction.type"
import {
  LoanReadyPlan,
  type LoanReadyPlanEnum
} from "@/modules/loanready/constants/package"
import { isLoanReady } from "@/utils/domain.utils"
import { Badge } from "@/components/ui/badge.tsx"
import { USDFormatter } from "@/modules/form-template/components/molecules/RHFCurrencyInput"

export const companyNameColumn: ColumnDef<Transaction> = {
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
}

export const baseListTransactionsColumns: ColumnDef<Transaction>[] = [
  {
    id: "product",
    header: renderFilterableHeader({ title: "Product" }),
    size: 200,
    cell: ({ row }) => {
      const transaction = row.original
      const product = transaction.product.toUpperCase() as LoanReadyPlanEnum

      if (isLoanReady()) {
        return <div>{LoanReadyPlan[product].name}</div>
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
    id: "transactionStatus",
    accessorKey: "transactionStatus",
    header: renderFilterableHeader({ title: "Transaction Status" }),
    cell: ({ row }) => {
      const status = row.original.transactionStatus as RefundStatus

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
  }
]
