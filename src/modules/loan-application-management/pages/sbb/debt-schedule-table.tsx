import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { toCurrency } from "@/utils"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"

type DebtScheduleType = {
  lenderName: string
  loanType: string
  outstandingLoanBalance: number
  monthlyPaymentAmount: number
  loanTermRemainingInMonths: number
  annualInterestRate: number
}

const columns: ColumnDef<DebtScheduleType>[] = [
  {
    accessorKey: "lenderName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Lender Name"
        className="min-w-0 truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate text-left">{account.lenderName}</p>
    }
  },
  {
    accessorKey: "loanType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Type" />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate text-left">{account.loanType}</p>
    }
  },
  {
    accessorKey: "outstandingLoanBalance",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Outstanding Loan Balance"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return (
        <p className="truncate">{toCurrency(account.outstandingLoanBalance)}</p>
      )
    }
  },
  {
    accessorKey: "monthlyPaymentAmount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Monthly Payment Amount"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return (
        <p className="truncate">{toCurrency(account.monthlyPaymentAmount)}</p>
      )
    }
  },
  {
    accessorKey: "loanTermRemainingInMonths",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Loan Term Remaining (months)"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate">{account.loanTermRemainingInMonths}</p>
    }
  },
  {
    accessorKey: "annualInterestRate",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Annual Interest Rate"
        className="truncate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original
      return <p className="truncate">{account.annualInterestRate}%</p>
    }
  }
]

export const DebtScheduleTable = () => {
  const { loanSummary } = useLoanApplicationDetailContext()
  const currentLoan = loanSummary?.currentLoanForms
  const table = useReactTable({
    data: currentLoan ?? [],
    columns: columns.map((c) => ({ ...c, enableSorting: false })),
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-2xl font-semibold sticky -top-3xl py-2 -mt-2">
        Debt Schedule
      </p>
      <div className="rounded-md border relative max-h-full overflow-auto">
        <Table className="text-sm bg-white">
          <TableHeader className="bg-gray-100 sticky top-0 z-10 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-sm font-medium text-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white border-b-2 border-black">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-base"
                >
                  {"No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="bg-white">
            <TableRow>
              <TableCell colSpan={2} className="text-center uppercase">
                Total
              </TableCell>
              <TableCell className="text-center">
                {toCurrency(
                  currentLoan?.reduce(
                    (acc, curr) => acc + curr.outstandingLoanBalance,
                    0
                  )
                )}
              </TableCell>
              <TableCell colSpan={1} className="text-center">
                {toCurrency(
                  currentLoan?.reduce(
                    (acc, curr) => acc + curr.monthlyPaymentAmount,
                    0
                  )
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
