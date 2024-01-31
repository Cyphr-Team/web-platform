import { columns } from "../table/document-columns"

import { REQUEST_LIMIT_PARAM } from "@/constants"
import { InfiniteDataTable } from "@/components/ui/infinite-data-table"
import { useQueryDocument } from "../../hooks/useQuery/useQueryDocument"

import { Row } from "@tanstack/react-table"
import { LoanDocument } from "@/common/loan-document.type"

export function Component() {
  const handleClickDetail = (detail: Row<LoanDocument>) => {
    // TODO: click detail
    console.log(detail.original)
  }

  const { data, fetchNextPage, isFetching } = useQueryDocument({
    limit: REQUEST_LIMIT_PARAM,
    offset: 0
  })

  return (
    <div className="-mt-3">
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

Component.displayName = "Document"
