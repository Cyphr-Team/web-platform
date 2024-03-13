import { DataTable } from "@/components/ui/data-table"
import { FAKE_ACCOUNT_SUMMARY_DATA } from "@/modules/loan-application-management/constants"
import { AccountSummaryType } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { toCurrency } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"

const columns: ColumnDef<AccountSummaryType>[] = [
  {
    accessorKey: "accountHolder",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Account Holder"
        className="min-w-0 truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate text-left">{account.accountHolder}</p>
    }
  },
  {
    accessorKey: "bankAccountName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account" />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate text-left">{account.bankAccountName}</p>
    }
  },
  {
    accessorKey: "beginDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Begin Date"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate">{account.beginDate}</p>
    }
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="End Date"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate">{account.endDate}</p>
    }
  },
  {
    accessorKey: "beginBalance",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Beginning Balance"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate">{toCurrency(account.beginBalance)}</p>
    }
  },
  {
    accessorKey: "endBalance",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Ending Balance"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate">{toCurrency(account.endBalance)}</p>
    }
  },
  {
    accessorKey: "averageDailyBalance",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Average Daily Balance"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return (
        <p className="truncate">{toCurrency(account.averageDailyBalance)}</p>
      )
    }
  },
  {
    accessorKey: "averageTransactionSize",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Average Transaction Size"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return (
        <p className="truncate">{toCurrency(account.averageTransactionSize)}</p>
      )
    }
  },
  {
    accessorKey: "numDaysNegativeBalance",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Days of Negative Balance"
        className="truncate"
      />
    )
  },
  {
    accessorKey: "maxDeposit",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Max Deposit"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate">{toCurrency(account.maxDeposit ?? 0)}</p>
    }
  },
  {
    accessorKey: "maxWithdrawal",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Max Withdrawal"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return (
        <p className="truncate text-red-500">
          {toCurrency(account.maxWithdrawal ?? 0)}
        </p>
      )
    }
  },
  {
    accessorKey: "averageDeposit",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Average Deposit"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return (
        <p className="truncate">{toCurrency(account.averageDeposit ?? 0)}</p>
      )
    }
  },
  {
    accessorKey: "averageWithdrawal",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Average Withdrawal"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return (
        <p className="truncate text-red-500">
          {toCurrency(account.averageWithdrawal ?? 0)}
        </p>
      )
    }
  }
]

const adjustColumns = columns.map((c) => ({
  ...c,
  enableSorting: false
}))

export const AccountSummaryTable = () => {
  const { cashFlowAnalysis } = useLoanApplicationDetailContext()
  return (
    <div className="text-sm text-right">
      <DataTable
        columns={adjustColumns}
        total={FAKE_ACCOUNT_SUMMARY_DATA.length}
        data={cashFlowAnalysis?.bankAccountSummary ?? FAKE_ACCOUNT_SUMMARY_DATA}
      />
    </div>
  )
}
