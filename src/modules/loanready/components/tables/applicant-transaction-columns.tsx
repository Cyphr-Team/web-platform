import { type ColumnDef } from "@tanstack/react-table"
import RefundTableAction, {
  RefundStatus
} from "./applicant-refund-table-action"
import {
  baseListTransactionsColumns,
  companyNameColumn
} from "./base-transactions-columns"
import { type Transaction } from "@/types/transaction.type"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"

/**
 * Columns for the transaction table, applicant view
 */
export const applicantTransactionColumns: ColumnDef<Transaction>[] = [
  companyNameColumn,
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
      const isEligibleToRefund = row.original.isEligibleToRefund

      // Check if the transaction is not eligible for refund
      // And if the transaction is already refunded or requested for refund
      // If so, return null
      if (
        !isEligibleToRefund ||
        row.original.transactionStatus ===
          RefundStatus.REFUNDED.toLowerCase() ||
        row.original.transactionStatus ===
          RefundStatus.REQUESTED_REFUND.toLowerCase()
      )
        return null

      return RefundTableAction({ row })
    }
  }
]
