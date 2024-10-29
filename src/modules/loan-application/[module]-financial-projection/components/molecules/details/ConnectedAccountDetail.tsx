import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { DetailTable } from "@/modules/loan-application/[module]-financial-projection/components/atoms/table"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/useQuery/useQueryLoanApplicationCashFlow"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
import { CashFlowConnectedBadge } from "@/shared/atoms/CashFlowConnectedBadge"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { renderHeader } from "@/utils/table.utils"
import { type ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

interface ConnectedAccountDetailProps {
  overwriteBankAccounts?: LoanApplicationBankAccount[]
}

export function ConnectedAccountDetail({
  overwriteBankAccounts = []
}: ConnectedAccountDetailProps) {
  const { id: loanApplicationId } = useParams()

  const { data, isLoading, isError, error, refetch } =
    useQueryGetLoanApplicationCashflowVerification(loanApplicationId)

  const getLatestData = () => {
    refetch()
  }

  const bankAccounts: LoanApplicationBankAccount[] =
    (overwriteBankAccounts?.length ?? 0) > 0
      ? overwriteBankAccounts
      : data?.bankAccounts ?? []

  const isCashFlowNotReady = useMemo(() => {
    return (
      bankAccounts.length === 0 &&
      isError &&
      error?.response?.data.code === ErrorCode.cash_flow_not_ready
    )
  }, [bankAccounts.length, isError, error?.response?.data.code])

  const noResultText = useMemo(() => {
    return isCashFlowNotReady
      ? getCustomErrorMsgByCode(ErrorCode.cash_flow_not_ready)
      : "No bank accounts detected"
  }, [isCashFlowNotReady])

  return (
    <Card
      className={cn(
        "border-none shadow-none -mt-8 px-4 md:px-8 p-4 md:p-8",
        EXPORT_CLASS.FINANCIAL
      )}
    >
      <div className="flex justify-between items-center flex-wrap gap-1 border-b pb-2 md:pb-5">
        <CardTitle className="font-semibold text-lg flex items-center gap-3">
          Connected Accounts
        </CardTitle>
        {/* Display this button when cash flow is not ready or empty */}
        {isCashFlowNotReady || !data?.bankAccounts?.length ? (
          <Button
            data-html2canvas-ignore
            className="text-sm"
            disabled={isLoading}
            onClick={getLatestData}
          >
            Refresh
          </Button>
        ) : (
          <CashFlowConnectedBadge />
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
            border
            isDot
            isDotBefore
            className="capitalize text-sm rounded-lg border-green-600 bg-white text-green-700"
            variant="outline"
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
