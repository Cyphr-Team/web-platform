import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { type ColumnDef } from "@tanstack/react-table"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type.ts"
import { PLAID_BANKING_ACCOUNTS } from "../../constants/data"
import { transformToConnectedAccounts } from "@/modules/loan-application/hooks/form-cash-flow/useQueryGetPlaidConnectedBankAccountsByApplicationId"

const cashFlowColumns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "bankAccountName",
    header: () => <div className="flex items-center space-x-2">Account</div>
  },
  {
    id: "status",
    header: () => <div className="flex items-center space-x-2">Status</div>,
    cell: () => {
      return (
        <div className="min-w-0">
          <Badge
            border
            isDot
            className="rounded-lg text-sm capitalize"
            isDotBefore={false}
            variant="soft"
            variantColor={getBadgeVariantByInsightStatus(
              TaskFieldStatus.SUCCESS
            )}
          >
            Connected
          </Badge>
        </div>
      )
    }
  }
]

export function CashFlowTable() {
  const institutions = transformToConnectedAccounts(
    PLAID_BANKING_ACCOUNTS.slice(0, 3)
  )

  return (
    <Card>
      <CardHeader className="mx-8 border-b px-0 md:px-0 md:py-4">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            Cash Flow Verification
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-5">
        <MiddeskTable columns={cashFlowColumns} data={institutions} />
      </CardContent>
    </Card>
  )
}
