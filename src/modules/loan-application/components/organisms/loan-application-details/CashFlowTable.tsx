import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/useQuery/useQueryLoanApplicationCashFlow"
import { type ColumnDef } from "@tanstack/react-table"
import { useParams } from "react-router-dom"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error.ts"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { useQueryGetPlaidConnectedBankAccountsByApplicationId } from "@/modules/loan-application/hooks/useQuery/useQueryGetPlaidConnectedBankAccountsByApplicationId.ts"
import { isEnabledQuery } from "@/utils"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import _ from "lodash"
import { type IPlaidAccountProviderData } from "@/modules/loan-application/constants"

const columns: ColumnDef<IPlaidAccountProviderData>[] = [
  {
    accessorKey: "name",
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
            className="capitalize text-sm rounded-lg"
            isDotBefore={false}
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

export function CashFlowTable() {
  const { id: loanApplicationId } = useParams()
  const { data, isLoading, isError, error, refetch } =
    useQueryGetLoanApplicationCashflowVerification(loanApplicationId)

  const isCashFlowNotReady = useMemo(() => {
    return (
      isError && error?.response?.data.code === ErrorCode.cash_flow_not_ready
    )
  }, [isError, error])
  const { progress } = useLoanApplicationProgressContext()

  const plaidConnectedAccountsQuery =
    useQueryGetPlaidConnectedBankAccountsByApplicationId({
      applicationId: loanApplicationId!,
      enabled: isEnabledQuery(
        LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION,
        progress
      )
    })

  const connectedBankAccountsGroup = _.groupBy(
    plaidConnectedAccountsQuery.data?.data?.institutions,
    "institutionId"
  )

  let allAccounts: IPlaidAccountProviderData[] = []

  Object.values(connectedBankAccountsGroup).forEach((institutions) => {
    institutions.forEach((institution) => {
      allAccounts = allAccounts.concat(institution.accounts)
    })
  })

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
            Cash Flow Verification5
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
        <MiddeskTable
          columns={columns}
          data={allAccounts}
          isLoading={isLoading}
          noResultText={noResultText}
        />
      </CardContent>
    </Card>
  )
}
