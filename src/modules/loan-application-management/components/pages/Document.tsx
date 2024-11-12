import { columns } from "../table/document-columns"

import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { useQueryDocument } from "../../hooks/useQuery/useQueryDocument"

import { ButtonLoading } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { SEARCH_PARAM_KEY } from "@/constants/routes.constants"
import { type LoanDocument } from "@/types/loan-document.type"
import { type PaginationState, type Row } from "@tanstack/react-table"
import { useState } from "react"
import { createSearchParams, useNavigate, useParams } from "react-router-dom"
import { DocumentTableHeader } from "../table/document-header"

export function Component() {
  const navigate = useNavigate()
  const { id: LoanApplicationID } = useParams()
  const [keyword, setKeyword] = useState("")

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const handleClickDetail = (detail: Row<LoanDocument>) => {
    const document = detail.original

    navigate({
      pathname: APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.detail(
        LoanApplicationID!,
        detail.original.id
      ),
      search: createSearchParams({
        [SEARCH_PARAM_KEY.DOCUMENT_TYPE]: document.type,
        [SEARCH_PARAM_KEY.DOCUMENT_NAME]: document.name
      }).toString()
    })
  }

  const { data, isFetching, refetch } = useQueryDocument({
    keyword: keyword,
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize
  })

  const handleSearch = (keyword: string) => {
    setKeyword(keyword)
  }

  return (
    <div>
      <div className="rounded-t-xl border px-6 py-5">
        <h3 className="mb-1 text-lg font-semibold">Attached files</h3>
        <p className="text-sm text-muted-foreground">
          Documents and assets that have been attached to this loan application
        </p>
      </div>
      <div className="-mb-6 flex justify-between border border-t-0 px-4 py-3">
        <DocumentTableHeader onSearch={handleSearch} />
        <ButtonLoading
          isLoading={isFetching}
          size="sm"
          variant="secondary"
          onClick={() => refetch()}
        >
          Refresh
        </ButtonLoading>
      </div>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        handleClickDetail={handleClickDetail}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        tableContainerClassName="rounded-t-none border-t-0"
        total={data?.total ?? 0}
      />
    </div>
  )
}

Component.displayName = "Document"
