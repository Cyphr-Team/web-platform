import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { DetailTable } from "@/modules/loan-application/[module]-financial-projection/components/atoms/table"
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/useQuery/useQueryLoanApplicationCashFlow"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export const ConnectedAccountDetail = () => {
  const { id: loanApplicationId } = useParams()
  const { data, isLoading, isError, error } =
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
    <Card className="border-none shadow-none">
      <CardContent className="p-0 md:p-0">
        <DetailTable
          columns={columns}
          data={bankAccounts}
          isLoading={isLoading}
          noResultText={noResultText}
        />
      </CardContent>
    </Card>
  )
}

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
