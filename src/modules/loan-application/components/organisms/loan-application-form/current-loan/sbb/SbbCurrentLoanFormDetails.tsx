import React from "react"
import { toCurrency } from "@/utils"
import {
  type CurrentLoanInformationResponse,
  type CurrentLoansInformationResponse
} from "@/modules/loan-application/constants/type"
import {
  checkIsWorkspaceAdmin,
  checkIsLoanApplicant,
  checkIsLoanOfficer
} from "@/utils/check-roles"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface CurrentLoanFormDetailsProps {
  currentLoanFormData?:
    | CurrentLoanInformationResponse[]
    | CurrentLoansInformationResponse
}

const columns: ColumnDef<CurrentLoanInformationResponse>[] = [
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

      return <p className="truncate text-left">{account.loanType}</p>
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

export const SbbCurrentLoanFormDetails: React.FC<
  CurrentLoanFormDetailsProps
> = ({ currentLoanFormData }) => {
  const currentLoanForms =
    checkIsLoanOfficer() || checkIsWorkspaceAdmin()
      ? (currentLoanFormData as CurrentLoanInformationResponse[]) || []
      : checkIsLoanApplicant()
        ? (currentLoanFormData as CurrentLoansInformationResponse)
            ?.currentLoanForms || []
        : []

  const table = useReactTable({
    data: currentLoanForms,
    columns: columns.map((c) => ({ ...c, enableSorting: false })),
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <Card
      className="flex flex-col gap-2xl p-4xl rounded-lg h-fit overflow-auto loan-application-item shadow-none"
      id="current-loans"
    >
      <div className="flex flex-col gap-6 ">
        <h5 className="text-lg font-semibold">Current Loans</h5>
        <Separator />
        <div className="rounded-md border relative max-h-full overflow-auto">
          <Table className="text-sm">
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
            <TableBody className="bg-white">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
            <TableFooter>
              <TableRow>
                <TableCell className="text-center uppercase" colSpan={2}>
                  Total
                </TableCell>
                <TableCell>
                  {toCurrency(
                    currentLoanForms.reduce(
                      (acc, curr) => acc + (curr?.outstandingLoanBalance || 0),
                      0
                    )
                  )}
                </TableCell>
                <TableCell colSpan={3}>
                  {toCurrency(
                    currentLoanForms.reduce(
                      (acc, curr) => acc + (curr?.monthlyPaymentAmount || 0),
                      0
                    )
                  )}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </Card>
  )
}
