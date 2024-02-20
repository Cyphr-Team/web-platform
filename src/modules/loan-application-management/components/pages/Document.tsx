import { columns } from "../table/document-columns"

import { APP_PATH, REQUEST_LIMIT_PARAM } from "@/constants"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { useQueryDocument } from "../../hooks/useQuery/useQueryDocument"

import { Row } from "@tanstack/react-table"
import { LoanDocument } from "@/types/loan-document.type"
import { DocumentTableHeader } from "../table/document-header"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"

export function Component() {
  const navigate = useNavigate()
  const { id: LoanApplicationID } = useParams()
  const [keyword, setKeyword] = useState("")

  const handleClickDetail = (detail: Row<LoanDocument>) => {
    navigate(
      APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.detail(
        LoanApplicationID!,
        detail.original.id
      )
    )
  }

  const { data, fetchNextPage, isFetching } = useQueryDocument({
    keyword: keyword,
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
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
      <div className="border py-3 px-4 -mb-6 border-t-0">
        <DocumentTableHeader onSearch={handleSearch} />
      </div>
      <InfiniteDataTable
        className="rounded-t-none border-t-0"
        handleClickDetail={handleClickDetail}
        columns={columns}
        data={data}
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
      />
    </div>
  )
}

Component.displayName = "Document"
