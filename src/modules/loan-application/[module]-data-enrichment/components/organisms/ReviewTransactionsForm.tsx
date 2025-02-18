import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FormLayout } from "@/modules/loan-application/components/layouts/FormLayout"
import { useLoanApplicationProgressContext } from "@/modules/loan-application/providers"
import { isReviewApplicationStep } from "@/modules/loan-application/services"
import { useParams } from "react-router-dom"
import { useQueryPlaidTransactions } from "@/modules/loan-application/[module]-data-enrichment/hooks/useQueryPlaidTransactions.ts"
import { RefreshCcw } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { HISTORICAL_FINANCIALS_QUERY_KEY } from "@/modules/loan-application/[module]-data-enrichment/constants/query-key.ts"
import { TableSkeleton } from "@/components/ui/skeleton.tsx"
import { TransactionTable } from "@/modules/loan-application/[module]-data-enrichment/components/molecules/TransactionTable.tsx"
import { useUpdateTransaction } from "@/modules/loan-application/[module]-data-enrichment/hooks/useUpdateTransaction.ts"
import { type PlaidTransaction } from "@/modules/loan-application/[module]-data-enrichment/types"
import { useForm } from "react-hook-form"
import { RHFProvider } from "@/modules/form-template/providers"
import { useEffect } from "react"
import { useBoolean } from "@/hooks"
import { LOAN_APPLICATION_STEPS } from "@/modules/loan-application/models/LoanApplicationStep/type.ts"

interface FormValues {
  data: PlaidTransaction[]
}

export function ReviewTransactionsForm() {
  const { id: applicationId } = useParams()
  const { finishCurrentStep, step, completeCurrentStep, getStepStatus } =
    useLoanApplicationProgressContext()

  const queryClient = useQueryClient()
  const loading = useBoolean(false)
  const connectedBankAccount = getStepStatus(
    LOAN_APPLICATION_STEPS.CASH_FLOW_VERIFICATION
  )

  const { data, isLoading } = useQueryPlaidTransactions({
    applicationId: applicationId!,
    enabled: !!applicationId
  })

  const { mutate } = useUpdateTransaction()

  const methods = useForm<FormValues>({
    defaultValues: {
      data: groupTransactions(data?.transactions ?? [])
    }
  })

  const onSubmit = (formData: FormValues) => {
    mutate({
      data: ungroupTransaction(formData.data),
      applicationId: applicationId!
    })
    finishCurrentStep()
  }

  const onRefreshData = () => {
    queryClient.invalidateQueries({
      queryKey: [HISTORICAL_FINANCIALS_QUERY_KEY.GET_PLAID_TRANSACTIONS]
    })

    loading.onTrue()
    setTimeout(() => loading.onFalse(), 1000)
  }

  const hasData = (data?.transactions?.length ?? 0) > 0

  useEffect(() => {
    if (hasData && !isLoading) {
      methods.setValue("data", groupTransactions(data?.transactions ?? []))
      completeCurrentStep()
    }
  }, [data?.transactions, methods, isLoading, completeCurrentStep, hasData])

  return (
    <FormLayout layout="borderless" title="Review Transactions">
      <div className="flex flex-col gap-4">
        <h5 className="text-lg font-semibold">Review Transactions</h5>
        <p className="financial-projection text-sm text-muted-foreground">
          After connecting your bank accounts, you'll see your top lump sum of
          transactions organized by category. Please review the transactions
          below and make any necessary updates.
        </p>
      </div>
      <Separator />

      <RHFProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {!connectedBankAccount ? (
          <p className="text-sm ">Please connect bank account first</p>
        ) : null}
        {isLoading || loading.value ? (
          <TableSkeleton cellClassName="h-16" className="w-full" columns={4} />
        ) : null}
        {hasData ? <TransactionTable /> : null}

        {connectedBankAccount && !isReviewApplicationStep(step) ? (
          <div className="mt-4 flex flex-row gap-2xl justify-end items-center">
            <Button
              disabled={isLoading || data?.transactions.length !== 0}
              type="button"
              onClick={onRefreshData}
            >
              Refresh Data
              <RefreshCcw className="ml-2 cursor-pointer" />
            </Button>

            <Button type="submit">Looks good</Button>
          </div>
        ) : null}
      </RHFProvider>
    </FormLayout>
  )
}

function groupTransactions(
  transactions: PlaidTransaction[]
): PlaidTransaction[] {
  const grouped = new Map<string, PlaidTransaction>()

  for (const transaction of transactions) {
    const { merchantName, cyphrDetailedCreditCategory, amount } = transaction
    const key = `${merchantName ?? ""}_${cyphrDetailedCreditCategory}`
    const existing = grouped.get(key)

    if (existing !== undefined) {
      grouped.set(key, {
        ...transaction,
        amount: existing.amount + amount,
        originalTransaction: [
          ...(existing.originalTransaction ?? []),
          transaction
        ]
      })
    } else {
      grouped.set(key, {
        ...transaction,
        originalTransaction: [transaction]
      })
    }
  }

  return Array.from(grouped.values())
}

function ungroupTransaction(
  transactions: PlaidTransaction[]
): PlaidTransaction[] {
  return transactions.flatMap((data) => {
    const toReturn = data.originalTransaction ?? []

    return toReturn.map((tx) => ({
      ...tx,
      // update the original category by the user category
      plaidPrimaryCreditCategory: data.plaidPrimaryCreditCategory,
      plaidDetailedCreditCategory: data.plaidDetailedCreditCategory,
      cyphrPrimaryCreditCategory: data.cyphrPrimaryCreditCategory,
      cyphrDetailedCreditCategory: data.cyphrDetailedCreditCategory,
      cyphrFinancialCategory: data.cyphrFinancialCategory
    }))
  })
}
