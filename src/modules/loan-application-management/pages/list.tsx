import { useNavigate } from "react-router-dom"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { APP_BREADS, APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { Row } from "@tanstack/react-table"
import { LoanApplication } from "@/types/loan-application.type"
import { loanApplicationColumns } from "../components/table/loan-application-columns"
import {
  FilterParams,
  useQueryListLoanApplication
} from "../hooks/useQuery/useQueryListLoanApplication"
import { LoanApplicationTableHeader } from "../components/table/loan-application-header"
import { useCallback, useState } from "react"
import debounce from "lodash.debounce"

export function Component() {
  const navigate = useNavigate()
  const [filterParams, setFilterParams] = useState<FilterParams>()

  const handleClickDetail = (detail: Row<LoanApplication>) => {
    navigate(
      APP_PATH.LOAN_APPLICATION_MANAGEMENT.KYB.detail(detail.original.id)
    )
  }

  const { data, fetchNextPage, isFetching } = useQueryListLoanApplication({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0,
    ...filterParams
  })

  // Will be created only once initially
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = useCallback(
    debounce((formValues: FilterParams) => {
      setFilterParams(formValues)
    }, 400),
    []
  )

  return (
    <div className="container mx-auto py-4xl">
      <div className="mb-3xl">
        <Breadcrumbs
          breads={APP_BREADS.LOAN_APPLICATION_MANAGEMENT.list}
          className="px-0"
        />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Loan Applications</h1>
      <div className="bg-gray-100 bg-opacity-60 p-5 rounded-lg">
        <LoanApplicationTableHeader onSearch={handleSearch} />
      </div>
      <InfiniteDataTable
        handleClickDetail={handleClickDetail}
        columns={loanApplicationColumns}
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  )
}

Component.displayName = "LoanApplication"
