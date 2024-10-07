import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { DetailTable } from "@/modules/loan-application/[module]-financial-projection/components/atoms/table"
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/useQuery/useQueryLoanApplicationCashFlow"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { renderHeader } from "@/utils/table.utils"
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle2 } from "lucide-react"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export const ConnectedAccountDetail = () => {
  const { id: loanApplicationId } = useParams()
  const { data, isLoading, isError, error, refetch } =
    useQueryGetLoanApplicationCashflowVerification(loanApplicationId)
  const getLatestData = () => {
    refetch()
  }

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
    <Card className="border-none shadow-none -mt-5">
      <div className="flex justify-between items-center flex-wrap gap-1">
        <CardTitle className="font-semibold text-lg flex items-center gap-3">
          Connected Accounts
        </CardTitle>
        {/* Display this button when cash flow is not ready or empty */}
        {isCashFlowNotReady || !data?.bankAccounts?.length ? (
          <Button
            className="text-sm"
            disabled={isLoading}
            onClick={getLatestData}
          >
            Refresh
          </Button>
        ) : (
          <div className="text-sm rounded-lg flex items-center border border-success justify-center gap-1 font-semibold text-success bg-white h-8 lg:h-10 px-2 lg:px-4 py-2">
            <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-white fill-green-600" />
            Connected
          </div>
        )}
      </div>
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
    enableSorting: false,
    header: renderHeader("Account", "text-primary text-left -mx-4"),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-primary -mx-4 capitalize">
          {row?.original?.bankAccountName?.toLowerCase()}
        </div>
      )
    }
  },
  {
    id: "status",
    header: renderHeader("Status", "text-primary text-right -mx-4"),
    cell: () => {
      return (
        <div className="text-right -mx-4">
          <Badge
            isDot
            variant="outline"
            variantColor={getBadgeVariantByInsightStatus(
              TaskFieldStatus.SUCCESS
            )}
            className="capitalize text-sm rounded-lg border-green-600 bg-white text-green-700"
            isDotBefore
            border
          >
            Connected
          </Badge>
        </div>
      )
    }
  }
]
