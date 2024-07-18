import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/useQuery/useQueryLoanApplicationCashFlow"
import { ColumnDef } from "@tanstack/react-table"
import { useParams } from "react-router-dom"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error.ts"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"

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
            variantColor={getBadgeVariantByInsightStatus(
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
  const { data, isLoading, isError, error, refetch } =
    useQueryGetLoanApplicationCashflowVerification(loanApplicationId)

  const bankAccounts = data?.bankAccounts ?? []
  const isCashFlowNotReady = useMemo(() => {
    return (
      isError && error?.response?.data.code === ErrorCode.cash_flow_not_ready
    )
  }, [isError, error])

  const noResultText = useMemo(() => {
    return isCashFlowNotReady
      ? getCustomErrorMsgByCode(ErrorCode.cash_flow_not_ready)
      : "No bank accounts detected"
  }, [isCashFlowNotReady])

  return (
    <Card>
      <CardHeader className="border-b mx-8 px-0 md:px-0 md:py-4">
        <div className="flex justify-between items-center flex-wrap gap-1">
          <CardTitle className="font-semibold text-lg flex items-center gap-3">
            Cash Flow Verification
          </CardTitle>
          {/* Display this button when cash flow is not ready or empty */}
          {(isCashFlowNotReady || !data?.bankAccounts?.length) && (
            <Button disabled={isLoading} onClick={() => refetch()}>
              Refresh
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-5">
        <MiddeskTable
          columns={columns}
          data={bankAccounts}
          isLoading={isLoading}
          noResultText={noResultText}
        />
      </CardContent>
    </Card>
  )
}
