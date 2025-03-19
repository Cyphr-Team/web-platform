import type { ColumnDef } from "@tanstack/react-table"
import type { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type.ts"
import {
  CashFlowConnectedBadge,
  CashFlowPendingBadge
} from "@/shared/atoms/CashFlowConnectedBadge.tsx"

export const cashFlowColumns: (
  isPending: boolean
) => ColumnDef<LoanApplicationBankAccount>[] = (isPending) => [
  {
    accessorKey: "bankAccountName",
    size: 200,
    header: () => (
      <div className="-mx-4 flex items-center text-gray-700">Account</div>
    ),
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="-mx-4 min-w-0 text-sm uppercase">
          {data.institutionName} {data.bankAccountName} {data.mask}
        </div>
      )
    }
  },
  {
    accessorKey: "connectedOn",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">
        Connected on
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-sm">{row.original?.connectedOn}</div>
    }
  },
  {
    id: "status",
    header: () => (
      <div className="flex items-center space-x-2 text-gray-700">Status</div>
    ),
    cell: () => {
      return (
        <div className="min-w-0">
          {isPending ? <CashFlowPendingBadge /> : <CashFlowConnectedBadge />}
        </div>
      )
    }
  }
]
