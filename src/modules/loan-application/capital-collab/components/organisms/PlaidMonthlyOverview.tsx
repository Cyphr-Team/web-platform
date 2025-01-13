import { plaidMonthlyOverviewColumns } from "@/modules/loan-application/capital-collab/components/molecules/plaid-monthly-overview-columns.tsx"
import { DataTable } from "@/components/ui/data-table.tsx"
import { useParams } from "react-router-dom"
import { useCallback, useMemo, useState } from "react"
import type { SortingState } from "@tanstack/react-table"
import { SortOrder } from "@/types/common.type.ts"
import { useQueryPlaidMonthlyOverview } from "@/modules/loan-application-management/hooks/useQuery/cash-flow/v2/useQueryPlaidMonthlyOverview.tsx"
import { useGetPlaidConnectedInstitutions } from "@/modules/loan-application/hooks/form-cash-flow/useQueryGetPlaidConnectedBankAccountsByApplicationId.ts"
import { type PlaidInstitutionProviderData } from "@/modules/loan-application/constants"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useLoanApplicationDetailContext } from "@/modules/loan-application-management/providers/LoanApplicationDetailProvider.tsx"
import { format } from "date-fns"
import { FORMAT_REQUEST_DATE } from "@/constants/date.constants.ts"
import {
  convertDate,
  getFirstDayOfCurrentMonth,
  getLastDayOfPreviousMonth
} from "@/utils/date.utils.ts"

export const PlaidMonthlyOverview = () => {
  const { id } = useParams()

  // Memoize sorting state to avoid unnecessary recalculations
  const [sorting, setSorting] = useState<SortingState>([])
  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return {
      [sorting[0].id]: sorting[0].desc ? SortOrder.DESC : SortOrder.ASC
    }
  }, [sorting])

  const { data: institutions } = useGetPlaidConnectedInstitutions({
    request: { applicationId: id }
  })

  // Memoize the computation for the most recent 'connectedOn' date
  const getMostRecentConnectedOn = useCallback(
    (institutions: PlaidInstitutionProviderData[]): string | null => {
      const validAccounts = institutions
        .flatMap((institution) => institution.accounts)
        .filter((account) => account?.connectedOn)

      if (!validAccounts.length) return null

      return (
        validAccounts.sort(
          (a, b) =>
            new Date(b?.connectedOn || 0).getTime() -
            new Date(a?.connectedOn || 0).getTime()
        )[0]?.connectedOn || null
      )
    },
    []
  )

  const { loanApplicationDetails } = useLoanApplicationDetailContext()

  const mostRecentConnectedOn = useMemo(
    () => (institutions ? getMostRecentConnectedOn(institutions) : null),
    [institutions, getMostRecentConnectedOn]
  )

  // Apply convertDate only for mostRecentConnectedOn
  const toDate = useMemo(
    () =>
      mostRecentConnectedOn
        ? convertDate(mostRecentConnectedOn)
        : format(
            loanApplicationDetails?.updatedAt || new Date(),
            FORMAT_REQUEST_DATE
          ),
    [mostRecentConnectedOn, loanApplicationDetails]
  )

  // Compute 'from' date
  const fromDate = useMemo(() => {
    const calculatedFromDate = new Date(toDate)

    calculatedFromDate.setFullYear(calculatedFromDate.getFullYear() - 1) // Subtract 1 year

    return format(calculatedFromDate, FORMAT_REQUEST_DATE)
  }, [toDate])

  const { data, isLoading } = useQueryPlaidMonthlyOverview({
    applicationId: id || "",
    sort: getSort(),
    limit: REQUEST_LIMIT_PARAM,
    offset: 0,
    from: getFirstDayOfCurrentMonth(fromDate),
    to: getLastDayOfPreviousMonth(toDate)
  })

  return (
    <DataTable
      manualSorting
      columns={plaidMonthlyOverviewColumns}
      data={data?.data ?? []}
      isLoading={isLoading}
      setSorting={setSorting}
      sorting={sorting}
      total={data?.total ?? 0}
    />
  )
}
