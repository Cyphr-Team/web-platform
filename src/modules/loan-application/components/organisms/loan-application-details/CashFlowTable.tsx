import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/form-cash-flow/useQueryLoanApplicationCashFlow.ts"
import { type ColumnDef } from "@tanstack/react-table"
import { useParams } from "react-router-dom"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error.ts"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { usePlaidContext } from "@/modules/loan-application/providers"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type.ts"

const plaidColumns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "bankAccountName",
    header: () => (
      <div className="mx-1 flex items-center text-gray-700">Account</div>
    ),
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="mx-1 min-w-0 uppercase">
          {data.institutionName} {data.bankAccountName} {data.mask}
        </div>
      )
    }
  },
  {
    id: "status",
    header: () => (
      <div className="item-center ml-1 flex text-gray-700">Status</div>
    ),
    cell: () => {
      return (
        <div className="ml-1 min-w-0">
          <Badge
            isDot
            isDotBefore
            className="rounded-full py-1 text-sm font-medium capitalize"
            variant="soft"
            variantColor={getBadgeVariantByInsightStatus(
              TaskFieldStatus.PENDING
            )}
          >
            Pending
          </Badge>
        </div>
      )
    }
  }
]

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
  const { id: loanApplicationId } = useParams()
  const { data, isLoading, isError, error, refetch } =
    useQueryGetLoanApplicationCashflowVerification(loanApplicationId)

  const cashFlowBankAccounts = data?.bankAccounts ?? []

  const isCashFlowNotReady = useMemo(() => {
    return (
      isError && error?.response?.data.code === ErrorCode.cash_flow_not_ready
    )
  }, [isError, error])

  const { connectedAccounts: plaidBankAccounts } = usePlaidContext()

  const noResultText = useMemo(() => {
    return isCashFlowNotReady
      ? getCustomErrorMsgByCode(ErrorCode.cash_flow_not_ready)
      : "No bank accounts detected"
  }, [isCashFlowNotReady])

  return (
    <Card>
      <CardHeader className="mx-8 border-b px-0 md:px-0 md:py-4">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            Cash Flow Verification
          </CardTitle>
          {/* Display this button when cash flow is not ready or empty */}
          {isCashFlowNotReady || !data?.bankAccounts?.length ? (
            <Button disabled={isLoading} onClick={() => refetch()}>
              Refresh
            </Button>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="px-5">
        {isCashFlowNotReady || !data?.bankAccounts?.length ? (
          <MiddeskTable
            columns={plaidColumns}
            data={isLoading ? [] : plaidBankAccounts}
            isLoading={isLoading}
            noResultText={noResultText}
          />
        ) : (
          <MiddeskTable
            columns={cashFlowColumns}
            data={cashFlowBankAccounts}
            isLoading={isLoading}
            noResultText={noResultText}
          />
        )}
      </CardContent>
    </Card>
  )
}
