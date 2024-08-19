import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { ColumnDef } from "@tanstack/react-table"
import { useParams } from "react-router-dom"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error.ts"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { useQueryGetBankAccounts } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/useQueryGetBankAccounts.ts"
import { Check } from "lucide-react"

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
  const params = useParams()

  const { data, isLoading, isError, error, refetch } = useQueryGetBankAccounts({
    applicationId: params.id!,
    enabledByInstitution: true
  })
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
    <Card className="shadow-none">
      <CardHeader className="mx-8 px-0 md:px-0 md:py-4">
        <div className="flex justify-between items-center flex-wrap gap-1">
          <CardTitle className="font-semibold text-lg flex items-center gap-3">
            Connected Accounts
          </CardTitle>
          {/* Display this button when cash flow is not ready or empty */}
          {isCashFlowNotReady || !data?.bankAccounts?.length ? (
            <Button disabled={isLoading} onClick={() => refetch()}>
              Refresh
            </Button>
          ) : (
            <Button
              className="text-primary bg-primary w-fit text-white px-lg py-md flex gap-1"
              type="button"
            >
              <p>Connected</p>
              <Check size={20} className="text-white" />
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
