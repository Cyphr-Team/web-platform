import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { adminTransactionsColumns } from "@/modules/loanready/components/tables/admin-transactions-columns"
import { type Option, SortOrder } from "@/types/common.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { type PaginationState, type SortingState } from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import { type ChangeEvent, useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { TransactionsTableHeader } from "@/modules/loanready/components/tables/transactions-table-header"
import {
  FormFieldNames,
  TransactionFilterSchema,
  type TransactionFilterValues,
  useQueryListPaginateTransaction
} from "@/modules/loanready/hooks/payment/useQueryListPaginateTransaction"
import { checkIsLoanApplicant } from "@/utils/check-roles"
import { applicantTransactionColumns } from "../tables/applicant-transaction-columns"
import { SectionTitle } from "@/modules/loan-application-management/components/atoms/cashflows/SectionTitle.tsx"

export function LoanReadyTransactionsPage() {
  const isApplicant = checkIsLoanApplicant()
  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  // Search state
  const [searchField, setSearchField] = useState("")
  const handleSearch = debounce(
    (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchField(inputChangeEvent.target.value)
      resetTableToFirstPage()
    },
    400
  )

  // Filter state
  const filterForm = useForm<TransactionFilterValues>({
    resolver: zodResolver(TransactionFilterSchema),
    defaultValues: {
      transactionStatus: [],
      product: [],
      paidOn: []
    }
  })

  const filter = (() => {
    const mapToValue = (options?: Option[], toLowerCase = false) =>
      options?.map((item) =>
        toLowerCase ? item.value.toLowerCase() : item.value
      )

    return {
      statuses: mapToValue(
        filterForm.watch(FormFieldNames.TRANSACTION_STATUS),
        true
      ),
      product: mapToValue(filterForm.watch(FormFieldNames.PRODUCT), true),
      paidOn: mapToValue(filterForm.watch(FormFieldNames.PAID_ON))
    }
  })()

  // Sort state
  const [sorting, setSorting] = useState<SortingState>([])
  const getSort = useCallback(() => {
    if (!sorting.length) return undefined

    return {
      [sorting[0].id]: sorting[0].desc
        ? SortOrder.DESC_NULLS_LAST
        : SortOrder.ASC_NULLS_FIRST
    }
  }, [sorting])

  // Query list applications
  const { data, isFetching } = useQueryListPaginateTransaction({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    searchField: searchField,
    sort: getSort(),
    filter: {
      transactionStatus: filter.statuses,
      product: filter.product,
      paidOn: filter.paidOn
    },
    isApplicant
  })

  const resetTableToFirstPage = useCallback(() => {
    setPagination((preState) => ({
      ...preState,
      pageIndex: 0
    }))
  }, [])

  const renderHeaderFilter = useMemo(
    () => (
      <div className="flex w-full flex-wrap items-center px-4">
        <div className="min-w-0 flex-[2] overflow-x-auto">
          <TransactionsTableHeader filterForm={filterForm} />
        </div>

        <div className="flex flex-1 justify-items-end gap-3 py-1 pr-1">
          <Input
            name="search"
            placeholder="Search"
            prefixIcon={<Search className="size-4 text-text-tertiary" />}
            wrapperClassName="flex-1"
            onChange={handleSearch}
          />
        </div>
      </div>
    ),
    [filterForm, handleSearch]
  )

  return (
    <div className="flex flex-col gap-4 mt-2xl">
      <SectionTitle>Payments</SectionTitle>
      <DataTable
        manualSorting
        columns={
          isApplicant ? applicantTransactionColumns : adminTransactionsColumns
        }
        data={data?.data ?? []}
        headerFilter={() => renderHeaderFilter}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        setSorting={setSorting}
        sorting={sorting}
        tableContainerClassName="flex max-h-[84vh] flex-1 flex-col overflow-hidden rounded-xl border"
        tableHeaderWrapperClassName="bg-gray-100"
        tableWrapperClassName="rounded-none border-none"
        total={data?.total ?? 0}
      />
    </div>
  )
}
