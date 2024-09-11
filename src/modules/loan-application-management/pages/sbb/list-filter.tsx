import { DataTable } from "@/components/ui/data-table"
import { Input } from "@/components/ui/input"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useBreadcrumb } from "@/hooks/useBreadcrumb"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaginationState, SortingState } from "@tanstack/react-table"
import debounce from "lodash.debounce"
import { Search } from "lucide-react"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Filter } from "./filter"
import { sbbLoanApplicationColumns } from "../../components/table/loan-application-columns"
import { useQueryListPaginateLoanApplication } from "../../hooks/useQuery/useQueryListPaginateLoanApplication"
import {
  LoanApplicationFilterSchema,
  LoanApplicationFilterValues
} from "../../hooks/useQuery/useQueryListLoanApplication"

export function SbbApplicationsList() {
  const crumbs = useBreadcrumb()

  // Filter state
  const filterForm = useForm<LoanApplicationFilterValues>({
    resolver: zodResolver(LoanApplicationFilterSchema),
    defaultValues: {
      status: [],
      createdOn: undefined,
      submittedOn: undefined
    }
  })

  // Paginate state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  // Sort state
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true }
  ])

  // Search state
  const [searchField, setSearchField] = useState("")
  const handleSearch = debounce(
    (inputChangeEvent: ChangeEvent<HTMLInputElement>) => {
      setSearchField(inputChangeEvent.target.value)
      resetTableToFirstPage()
    },
    400
  )
  const resetTableToFirstPage = useCallback(() => {
    setPagination((preState) => ({
      ...preState,
      pageIndex: 0
    }))
  }, [])

  const { data, isFetching } = useQueryListPaginateLoanApplication({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    search: searchField
  })

  useEffect(() => {
    const watchFilter = filterForm.watch(() => {
      resetTableToFirstPage()
    })

    return () => watchFilter.unsubscribe()
  }, [filterForm, resetTableToFirstPage])

  const renderHeaderFilter = useMemo(
    () => () => {
      return (
        <div className="flex items-center flex-wrap w-full gap-4 bg-active p-5 rounded-xl">
          <div className="flex-[2] min-w-0 overflow-x-auto py-1">
            <Filter filterForm={filterForm} />
          </div>
          <div className="justify-items-end flex flex-1 gap-3 py-1">
            <Input
              wrapperClassName="flex-1"
              prefixIcon={<Search className="w-4 h-4 text-text-tertiary" />}
              placeholder="Search"
              name="search"
              onChange={handleSearch}
            />
          </div>
        </div>
      )
    },
    [filterForm, handleSearch]
  )

  return (
    <div
      className={cn("container mx-auto px-2xl py-2xl", "md:px-4xl md:py-4xl")}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Breadcrumbs breads={crumbs} className="px-0 mb-3" />
          <h1 className="text-2xl font-semibold">Account Applications</h1>
        </div>
      </div>

      <DataTable
        headerFilter={renderHeaderFilter}
        tableContainerClassName="flex flex-col flex-1 h-[85vh]"
        columns={sbbLoanApplicationColumns}
        isLoading={isFetching}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        manualSorting
      />
    </div>
  )
}
