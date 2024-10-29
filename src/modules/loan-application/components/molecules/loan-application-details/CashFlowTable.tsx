import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { useQueryGetBankAccounts } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/useQueryGetBankAccounts.ts"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
import { CashFlowConnectedBadge } from "@/shared/atoms/CashFlowConnectedBadge"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error.ts"
import { type ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

const columns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "bankAccountName",
    header: () => <div className="flex items-center">Account</div>
  },
  {
    id: "status",
    header: () => <div className="flex items-center float-right">Status</div>,
    cell: () => {
      return (
        <div className="min-w-0 text-right">
          <Badge
            border
            isDot
            className="capitalize text-sm rounded-lg"
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

interface CashFlowTableProps {
  wrapperClassName?: string
}

export function CashFlowTable({ wrapperClassName }: CashFlowTableProps) {
  const params = useParams()

  const { data, isLoading, isError, error, refetch } = useQueryGetBankAccounts({
    applicationId: params.id!,
    enabledByInstitution: true
  })
  const getLatestData = () => {
    refetch()
  }

  const bankAccounts = data?.bankAccounts ?? []

  const isCashFlowNotReady = useMemo(() => {
    return isError && error?.code === ErrorCode.cash_flow_not_ready
  }, [isError, error])

  const noResultText = useMemo(() => {
    return isCashFlowNotReady
      ? getCustomErrorMsgByCode(ErrorCode.cash_flow_not_ready)
      : "No bank accounts detected"
  }, [isCashFlowNotReady])

  return (
    <Card
      className={cn(
        "shadow-none p-4 md:p-8",
        wrapperClassName,
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
