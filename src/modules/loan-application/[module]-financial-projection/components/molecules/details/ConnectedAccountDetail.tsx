import { ButtonLoading } from "@/components/ui/button"
import { CardContent, CardTitle } from "@/components/ui/card"
import { DetailTable } from "@/modules/loan-application/[module]-financial-projection/components/atoms/table"
import { type LoanApplicationBankAccount } from "@/modules/loan-application/constants/type"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/form-cash-flow/useQueryLoanApplicationCashFlow.ts"
import {
  CashFlowConnectedBadge,
  CashFlowPendingBadge
} from "@/shared/atoms/CashFlowConnectedBadge"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { useGetPlaidConnectedBankAccounts } from "@/modules/loan-application/hooks/form-cash-flow/useQueryGetPlaidConnectedBankAccountsByApplicationId.ts"
import { cashFlowColumns } from "@/shared/atoms/CashFlowColumns.tsx"

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
      (isError &&
        error?.response?.data.code === ErrorCode.cash_flow_not_ready &&
        overwriteBankAccounts.length === 0)
    )
  }, [
    bankAccounts.length,
    isError,
    error?.response?.data.code,
    overwriteBankAccounts.length
  ])

  const noResultText = useMemo(() => {
    return isCashFlowNotReady
      ? getCustomErrorMsgByCode(ErrorCode.cash_flow_not_ready)
      : "No bank accounts detected"
  }, [isCashFlowNotReady])

  const renderStatus = () => {
    if (isCashFlowNotReady && !isFetching) return <CashFlowPendingBadge />

    if (bankAccounts.length > 0) return <CashFlowConnectedBadge />

    return null
  }

  const renderRefreshCTA = () => {
    if (!isCashFlowNotReady) return null

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
    <div className="-mt-8 p-4 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-1 border-b pb-2 md:pb-5">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
          Connected Accounts
          {renderStatus()}
        </CardTitle>
        {/* Display this button when cash flow is not ready or empty */}
        {renderRefreshCTA()}
      </div>

      <CardContent className="p-0 md:p-0">
        {isCashFlowNotReady && !isFetching ? (
          <DetailTable
            columns={cashFlowColumns(true)}
            data={plaidConnectedBankAccountsQuery.data ?? []}
            isLoading={isFetching || plaidConnectedBankAccountsQuery.isFetching}
            noResultText={noResultText}
          />
        ) : (
          <DetailTable
            columns={cashFlowColumns(false)}
            data={bankAccounts}
            isLoading={isFetching}
            noResultText={noResultText}
          />
        )}
      </CardContent>
    </div>
  )
}
