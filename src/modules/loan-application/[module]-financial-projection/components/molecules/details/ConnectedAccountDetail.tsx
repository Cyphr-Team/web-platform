import { Badge } from "@/components/ui/badge"
import { ButtonLoading } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TaskFieldStatus } from "@/modules/loan-application-management/constants/types/business.type"
import { getBadgeVariantByInsightStatus } from "@/modules/loan-application-management/services/insight.service"
import { DetailTable } from "@/modules/loan-application/[module]-financial-projection/components/atoms/table"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/useQuery/useQueryLoanApplicationCashFlow"
import { EXPORT_CLASS } from "@/modules/loan-application/services/pdf-v2.service"
import {
  CashFlowConnectedBadge,
  CashFlowPendingBadge
} from "@/shared/atoms/CashFlowConnectedBadge"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { renderHeader } from "@/utils/table.utils"
import { type ColumnDef } from "@tanstack/react-table"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { useGetPlaidConnectedBankAccounts } from "@/modules/loan-application/hooks/useQuery/useQueryGetPlaidConnectedBankAccountsByApplicationId.ts"
import { isEnablePlaidV2 } from "@/utils/feature-flag.utils.ts"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table.tsx"

interface ConnectedAccountDetailProps {
  overwriteBankAccounts?: LoanApplicationBankAccount[]
}

export function ConnectedAccountDetail({
  overwriteBankAccounts = []
}: ConnectedAccountDetailProps) {
  const { id: loanApplicationId } = useParams()

  const { data, isFetching, isError, error, refetch } =
    useQueryGetLoanApplicationCashflowVerification(loanApplicationId)

  const getLatestData = () => {
    refetch()
  }

  const plaidConnectedBankAccountsQuery = useGetPlaidConnectedBankAccounts({
    request: {
      applicationId: loanApplicationId
    }
  })

  const bankAccounts: LoanApplicationBankAccount[] =
    (overwriteBankAccounts?.length ?? 0) > 0
      ? overwriteBankAccounts
      : data?.bankAccounts ?? []

  const isCashFlowNotReady = useMemo(() => {
    return (
      bankAccounts.length === 0 ||
      (isError && error?.response?.data.code === ErrorCode.cash_flow_not_ready)
    )
  }, [bankAccounts.length, isError, error?.response?.data.code])

  const noResultText = useMemo(() => {
    return isCashFlowNotReady
      ? getCustomErrorMsgByCode(ErrorCode.cash_flow_not_ready)
      : "No bank accounts detected"
  }, [isCashFlowNotReady])

  const renderStatus = () => {
    if (isCashFlowNotReady && isEnablePlaidV2() && !isFetching)
      return <CashFlowPendingBadge />

    return null
  }

  const renderRefreshCTA = () => {
    if (!isCashFlowNotReady) return <CashFlowConnectedBadge />

    return (
      <ButtonLoading
        data-html2canvas-ignore
        className="text-sm"
        isLoading={isFetching}
        onClick={getLatestData}
      >
        Refresh
      </ButtonLoading>
    )
  }

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
          {renderStatus()}
        </CardTitle>
        {/* Display this button when cash flow is not ready or empty */}
        {renderRefreshCTA()}
      </div>

      <CardContent className="p-0 md:p-0">
        {isEnablePlaidV2() && isCashFlowNotReady && !isFetching ? (
          <MiddeskTable
            columns={plaidColumns}
            data={plaidConnectedBankAccountsQuery.data ?? []}
            isLoading={isFetching || plaidConnectedBankAccountsQuery.isFetching}
            noResultText={noResultText}
          />
        ) : (
          <DetailTable
            columns={columns}
            data={bankAccounts}
            isLoading={isFetching}
            noResultText={noResultText}
          />
        )}
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
            isDot
            isDotBefore
            className="capitalize text-sm rounded-full font-medium py-1"
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
