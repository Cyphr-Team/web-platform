import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByMiddeskStatus } from "@/modules/loan-application-management/services/middesk.service"
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/useQuery/useQueryLoanApplicationCashFlow"
import { ColumnDef } from "@tanstack/react-table"
import { useParams } from "react-router-dom"
import { NotFoundAlert } from "../../molecules/NotFoundAlert"

const columns: ColumnDef<LoanApplicationBankAccount>[] = [
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
            isDot
            variant="soft"
            variantColor={getBadgeVariantByMiddeskStatus(
              TaskFieldStatus.SUCCESS
            )}
            className="capitalize text-sm rounded-lg"
            isDotBefore={false}
            border
          >
            Connected
          </Badge>
        </div>
      )
    }
  }
]

export const CashFlowTable = () => {
  const { id: loanApplicationId } = useParams()
  const { data, isLoading } =
    useQueryGetLoanApplicationCashflowVerification(loanApplicationId)

  const bankAccounts = data?.bankAccounts ?? []

  return (
    <Card>
      <CardHeader className="border-b mx-8 px-0 md:px-0 md:py-4">
        <div className="flex justify-between items-center flex-wrap gap-1">
          <CardTitle className="font-semibold text-lg flex items-center gap-3">
            Cash Flow Verification
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-5">
        {bankAccounts?.length ? (
          <MiddeskTable
            columns={columns}
            data={bankAccounts}
            isLoading={isLoading}
          />
        ) : (
          <div className="mt-3">
            <NotFoundAlert label="No bank accounts found" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
