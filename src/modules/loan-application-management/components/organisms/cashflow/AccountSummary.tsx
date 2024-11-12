import { DataTable } from "@/components/ui/data-table"
import { type AccountSummaryType } from "@/modules/loan-application-management/constants/types/cashflow.type"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { toCurrency } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { AccountFilters } from "../../atoms/cashflows/AccountFilters"
import { DateRangeFilter } from "../../molecules/filters/DateRangeFilter"

const columns: ColumnDef<AccountSummaryType>[] = [
  {
    accessorKey: "accountHolder",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="min-w-0 truncate"
        column={column}
        title="Account Holder"
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
        className="truncate"
        column={column}
        title="Begin Date"
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
        className="truncate"
        column={column}
        title="End Date"
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
        className="truncate"
        column={column}
        title="Beginning Balance"
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
        className="truncate"
        column={column}
        title="Ending Balance"
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
        className="truncate"
        column={column}
        title="Average Daily Balance"
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
        className="truncate"
        column={column}
        title="Average Transaction Size"
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
        className="truncate"
        column={column}
        title="Days of Negative Balance"
      />
    )
  },
  {
    accessorKey: "maxDeposit",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="truncate"
        column={column}
        title="Max Deposit"
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
        className="truncate"
        column={column}
        title="Max Withdrawal"
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
        className="truncate"
        column={column}
        title="Average Deposit"
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
        className="truncate"
        column={column}
        title="Average Withdrawal"
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

export function AccountSummaryTable() {
  const { cashFlowAccounts, cashFlowAnalysis, isFetchingCashflow } =
    useLoanApplicationDetailContext()

  return (
    <div className="min-h-40 gap-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-medium">Account Summary</h3>
        {!!cashFlowAccounts?.length && (
          <div className="flex gap-2">
            <AccountFilters />
            <DateRangeFilter />
          </div>
        )}
      </div>

      <div className="text-right text-sm">
        <DataTable
          columns={adjustColumns}
          data={cashFlowAnalysis?.bankAccountSummary ?? []}
          isLoading={isFetchingCashflow}
          total={cashFlowAnalysis?.bankAccountSummary?.length ?? 0}
        />
      </div>
    </div>
  )
}
