import { Button } from "@/components/ui/button"
import { CardContent, CardTitle } from "@/components/ui/card"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { useQueryGetBankAccounts } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/useQueryGetBankAccounts.ts"
import { CashFlowConnectedBadge } from "@/shared/atoms/CashFlowConnectedBadge"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error.ts"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { cashFlowColumns } from "@/shared/atoms/CashFlowColumns.tsx"
import { cn } from "@/lib/utils.ts"
import { useGetPlaidConnectedBankAccounts } from "@/modules/loan-application/hooks/form-cash-flow/useQueryGetPlaidConnectedBankAccountsByApplicationId"

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

  const plaidConnectedBankAccountsQuery = useGetPlaidConnectedBankAccounts({
    request: {
      applicationId: params.id!
    }
  })

  const bankAccounts = useMemo(() => {
    // Fetch the bank accounts from the Ocrolus API
    const ocrolusBankAccounts = data?.bankAccounts ?? []

    // Match the connectedOn date from Plaid to the bank account
    return ocrolusBankAccounts.map((bankAccount) => {
      const plaidBankAccountMatch = plaidConnectedBankAccountsQuery.data?.find(
        (plaidBankAccount) => {
          const bankPkPrefix = plaidBankAccount?.bankAccountPk?.substring(0, 10)

          return bankPkPrefix
            ? bankAccount.bankAccountName?.includes(bankPkPrefix)
            : false
        }
      )

      return {
        ...bankAccount,
        connectedOn: plaidBankAccountMatch?.connectedOn
      }
    })
  }, [data?.bankAccounts, plaidConnectedBankAccountsQuery.data])

  const isCashFlowNotReady = useMemo(() => {
    return isError && error?.code === ErrorCode.cash_flow_not_ready
  }, [isError, error])

  const noResultText = useMemo(() => {
    return isCashFlowNotReady
      ? getCustomErrorMsgByCode(ErrorCode.cash_flow_not_ready)
      : "No bank accounts detected"
  }, [isCashFlowNotReady])

  return (
    <div className={cn("p-4 md:p-8", wrapperClassName)}>
      <div className="flex flex-wrap items-center justify-between gap-1 border-b pb-2 md:pb-5">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold">
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
    </div>
  )
}
