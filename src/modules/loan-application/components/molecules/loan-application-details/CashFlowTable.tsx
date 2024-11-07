import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { useQueryGetBankAccounts } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/useQueryGetBankAccounts.ts"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
import { CashFlowConnectedBadge } from "@/shared/atoms/CashFlowConnectedBadge"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error.ts"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { cashFlowColumns } from "@/shared/atoms/CashFlowColumns.tsx"

interface CashFlowTableProps {
  wrapperClassName?: string
}

export function CashFlowTable({ wrapperClassName }: CashFlowTableProps) {
  const params = useParams()

  const { data, isFetching, isError, error, refetch } = useQueryGetBankAccounts(
    {
      applicationId: params.id!,
      enabledByInstitution: true
    }
  )
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
          {!(isCashFlowNotReady || !data?.bankAccounts?.length) ? (
            <CashFlowConnectedBadge />
          ) : null}
        </CardTitle>
        {/* Display this button when cash flow is not ready or empty */}
        {isCashFlowNotReady || !data?.bankAccounts?.length ? (
          <Button
            data-html2canvas-ignore
            className="text-sm"
            disabled={isFetching}
            onClick={getLatestData}
          >
            Refresh
          </Button>
        ) : null}
      </div>

      <CardContent className="p-0 md:p-0">
        <MiddeskTable
          columns={cashFlowColumns(false)}
          data={bankAccounts}
          isLoading={isFetching}
          noResultText={noResultText}
        />
      </CardContent>
    </Card>
  )
}
