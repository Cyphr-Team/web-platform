import React from "react"
import { toCurrency } from "@/utils"
import {
  CurrentLoanInformationResponse,
  CurrentLoansInformationResponse
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
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface KansasCityCurrentLoanFormDetailsProps {
  currentLoanFormData?:
    | CurrentLoanInformationResponse[]
    | CurrentLoansInformationResponse
}

const columns: ColumnDef<CurrentLoanInformationResponse>[] = [
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

export const KansasCityCurrentLoanFormDetails: React.FC<
  KansasCityCurrentLoanFormDetailsProps
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
                    colSpan={columns.length}
                    className="h-24 text-center text-base"
                  >
                    {"No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="text-center uppercase">
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
