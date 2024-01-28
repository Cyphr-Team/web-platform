import { useNavigate } from "react-router-dom"
import { columns } from "./table/columns"
import { LoanApplicationTableHeader } from "./table/header"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs"

import { APP_BREADS, APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { useListLoanApplication } from "./hooks/useListLoanApplication"

export function Component() {
  const navigate = useNavigate()

  const handleClickDetail = () => {
    navigate(APP_PATH.LOAN_APPLICATION_DETAILS.KYB)
  }

  const { data, fetchNextPage, isFetching } = useListLoanApplication({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  return (
    <div className="container mx-auto py-4xl">
      <div className="mb-3xl">
        <Breadcrumbs
          breads={APP_BREADS.LOAN_APPLICATION_DETAILS.list}
          className="px-0"
        />
      </div>
      <div className="bg-gray-100 bg-opacity-60 p-5 rounded-lg">
        <LoanApplicationTableHeader />
      </div>
      <InfiniteDataTable
        handleClickDetail={handleClickDetail}
        columns={columns}
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  )
}

Component.displayName = "LoanApplication"
