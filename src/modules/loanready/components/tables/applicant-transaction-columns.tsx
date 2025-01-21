import { type ColumnDef } from "@tanstack/react-table"
import RefundTableAction, {
  RefundStatus
} from "./applicant-refund-table-action"
import {
  baseListTransactionsColumns,
  companyNameColumn
} from "./base-transactions-columns"
import { type Transaction } from "@/types/transaction.type"

/**
 * Columns for the transaction table, applicant view
 */
export const applicantTransactionColumns: ColumnDef<Transaction>[] = [
  companyNameColumn,
  ...baseListTransactionsColumns,
  {
    id: "action",
    header: "",
    cell: ({ row }) => {
      if (row.original.transactionStatus === RefundStatus.PAID.toLowerCase())
        return RefundTableAction({ row })

      return null
    }
  }
]
