import { columns } from "../table/document-columns"

import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { useQueryDocument } from "../../hooks/useQuery/useQueryDocument"

import { PaginationState, Row } from "@tanstack/react-table"
import { LoanDocument, LoanDocumentStatus } from "@/types/loan-document.type"
import { DocumentTableHeader } from "../table/document-header"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { ButtonLoading } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

export function Component() {
  const navigate = useNavigate()
  const { id: LoanApplicationID } = useParams()
  const [keyword, setKeyword] = useState("")

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const handleClickDetail = (detail: Row<LoanDocument>) => {
    if (detail.original.status === LoanDocumentStatus.UNCHECKED) return
    navigate(
      APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.detail(
        LoanApplicationID!,
        detail.original.id
      )
    )
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
        <h3 className="font-semibold text-lg mb-1">Attached files</h3>
        <p className="text-muted-foreground text-sm">
          Documents and assets that have been attached to this loan application
        </p>
      </div>
      <div className="border py-3 px-4 -mb-6 border-t-0 flex justify-between">
        <DocumentTableHeader onSearch={handleSearch} />
        <ButtonLoading
          onClick={() => refetch()}
          variant="secondary"
          size="sm"
          isLoading={isFetching}
        >
          Refresh
        </ButtonLoading>
      </div>
      <DataTable
        tableContainerClassName="rounded-t-none border-t-0"
        columns={columns}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        handleClickDetail={handleClickDetail}
      />
    </div>
  )
}

Component.displayName = "Document"
