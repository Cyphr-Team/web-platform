import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { LoanProgram } from "@/types/loan-program.type"
import { toCurrency } from "@/utils"

const CellItem = ({
  label,
  value
}: {
  label: string
  value: React.ReactNode
}) => {
  return (
    <p className="truncate capitalize">
      <span className="text-sx text-muted-foreground">{label}:</span> {value}
    </p>
  )
}

export const columns: ColumnDef<LoanProgram>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    size: 200
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Type" />
    },
    size: 100
  },
  {
    id: "interest",
    accessorKey: "interestRate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interest" />
    ),
    cell: ({ row }) => {
      const loanProgram = row.original

      return (
        <div className="min-w-0 ">
          <CellItem label="Type" value={loanProgram.interestRateType} />
          <CellItem label="Rate" value={loanProgram.interestRate} />
        </div>
      )
    },
    size: 150
  },
  {
    id: "loanAmount",
    accessorKey: "loanAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loan Amount" />
    ),
    cell: ({ row }) => {
      const loanProgram = row.original

      return (
        <div className="min-w-0">
          <CellItem label="Min" value={toCurrency(loanProgram.minLoanAmount)} />
          <CellItem label="Max" value={toCurrency(loanProgram.maxLoanAmount)} />
        </div>
      )
    },
    size: 200
  },
  {
    id: "termInMonth",
    accessorKey: "termInMonth",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Term in month" />
    ),
    cell: ({ row }) => {
      const loanProgram = row.original

      return (
        <div className="min-w-0">
          <CellItem label="Min" value={loanProgram.minTermInMonth} />
          <CellItem label="Max" value={loanProgram.maxTermInMonth} />
        </div>
      )
    },
    size: 200
  },
  {
    accessorKey: "originationFee",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Origination Fee" />
    },
    size: 150
  }
]
