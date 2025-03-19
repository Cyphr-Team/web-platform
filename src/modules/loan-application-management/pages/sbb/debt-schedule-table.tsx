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
import { snakeCaseToText, toCurrency } from "@/utils"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { useLoanApplicationDetailContext } from "../../providers/LoanApplicationDetailProvider"

interface DebtScheduleType {
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
        className="min-w-0 truncate"
        column={column}
        title="Lender Name"
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

      return (
        <p className="truncate text-left capitalize">
          {snakeCaseToText(account.loanType)}
        </p>
      )
    }
  },
  {
    accessorKey: "outstandingLoanBalance",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="truncate"
        column={column}
        title="Outstanding Loan Balance"
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
        className="truncate"
        column={column}
        title="Monthly Payment Amount"
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
        className="truncate"
        column={column}
        title="Loan Term Remaining (months)"
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
        className="truncate"
        column={column}
        title="Annual Interest Rate"
      />
    ),
    cell: ({ row }) => {
      const account = row.original

      return <p className="truncate">{account.annualInterestRate}%</p>
    }
  }
]

export function DebtScheduleTable() {
  const { loanSummary } = useLoanApplicationDetailContext()
  const currentLoan = loanSummary?.currentLoanForms
  const table = useReactTable({
    data: currentLoan ?? [],
    columns: columns.map((c) => ({ ...c, enableSorting: false })),
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <div className="flex flex-col gap-6 ">
      <p className="sticky -top-3xl -mt-2 py-2 text-2xl font-semibold">
        Debt Schedule
      </p>
      <div className="relative max-h-full overflow-auto rounded-md border">
        <Table className="bg-white text-sm">
          <TableHeader className="sticky top-0 z-10 bg-gray-100 ">
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
          <TableBody className="border-b-2 border-black bg-white">
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
                  className="h-24 text-center text-base"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="bg-white">
            <TableRow>
              <TableCell className="text-center uppercase" colSpan={2}>
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
              <TableCell className="text-center" colSpan={1}>
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
