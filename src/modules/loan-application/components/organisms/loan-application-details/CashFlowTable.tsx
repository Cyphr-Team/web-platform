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
import { usePlaidContext } from "@/modules/loan-application/providers"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type.ts"
import { isEnablePlaidV2 } from "@/utils/feature-flag.utils.ts"
import { format } from "date-fns"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants.ts"

const plaidColumns: ColumnDef<LoanApplicationBankAccount>[] = [
  {
    accessorKey: "bankAccountName",
    header: () => (
      <div className="flex items-center text-gray-700 mx-1">Account</div>
    ),
    cell: ({ row }) => {
      const data = row.original

      return (
        <div className="min-w-0 mx-1 uppercase">
          {data.institutionName} {data.bankAccountName} {data.mask}
        </div>
      )
    }
  },
  {
    id: "status",
    header: () => (
      <div className="flex item-center text-gray-700 ml-1">Status</div>
    ),
    cell: () => {
      return (
        <div className="min-w-0 ml-1">
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

  const { institutions } = usePlaidContext()

  const plaidBankAccounts =
    institutions
      ?.flatMap(
        (ins) =>
          ins?.accounts?.map((account) => ({
            institutionName: ins?.institutionName,
            bankAccountPk: account?.id,
            bankAccountName: account?.name,
            mask: account?.mask,
            connectedOn: account?.connectedOn
              ? account?.connectedOn
              : format(new Date(), FORMAT_DATE_MM_DD_YYYY)
          })) || []
      )
      ?.sort((a, b) => a?.institutionName?.localeCompare(b?.institutionName)) ||
    []

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
          {isCashFlowNotReady || !data?.bankAccounts?.length ? (
            <Button disabled={isLoading} onClick={() => refetch()}>
              Refresh
            </Button>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="px-5">
        {isEnablePlaidV2() &&
        (isCashFlowNotReady || !data?.bankAccounts?.length) ? (
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
