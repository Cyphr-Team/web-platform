import { columns } from "../../components/table/cc-document-columns"

import { REQUEST_LIMIT_PARAM } from "@/constants"
import { useQueryDocument } from "../../hooks/useQuery/capital-collab/useQueryDocument"

import { DataTable } from "@/components/ui/data-table"
import {
  type RowSelectionState,
  type SortingState,
  type PaginationState
} from "@tanstack/react-table"
import { useCallback, useState } from "react"
import { useParams } from "react-router-dom"
import { DocumentTableHeader } from "../../components/table/document-header"
import { ButtonLoading } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { SortOrder } from "@/types/common.type"

export function Component() {
  const { id: loanApplicationID } = useParams()
  const [keyword, setKeyword] = useState("")
  // Table state
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const getSort = useCallback(() => {
    if (!sorting.length) return {}

    return {
      [sorting[0].id]: sorting[0].desc ? SortOrder.DESC : SortOrder.ASC
    }
  }, [sorting])

  const { data, isFetching } = useQueryDocument({
    applicationId: loanApplicationID!,
    fileName: keyword,
    sort: getSort()
  })

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const handleSearch = (keyword: string) => {
    setKeyword(keyword)
  }

  return (
    <div>
      {Object.keys(rowSelection).length ? (
        <div className="flex flex-row-reverse w-full mb-14">
          <ButtonLoading
            variant="outline"
            // onClick={handleDownloadMultipleDocuments}
            // isLoading={downloadFile.isLoading}
          >
            <DownloadIcon className="mr-2 text-muted-foreground" size={20} />
            Download
          </ButtonLoading>
        </div>
      ) : null}
      <div className="rounded-t-xl border px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-24">
        <div>
          <h3 className="mb-1 text-lg font-semibold">Documentation</h3>
          <p className="text-sm text-muted-foreground">
            Documents and assets that have been attached to this loan
            application
          </p>
        </div>
        <DocumentTableHeader
          classNames={{
            formWrapper: "flex-1 w-full",
            searchInput: "w-full"
          }}
          onSearch={handleSearch}
        />
      </div>
      <DataTable
        manualSorting
        columns={columns}
        data={data?.data ?? []}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        setRowSelection={setRowSelection}
        setSorting={setSorting}
        sorting={sorting}
        tableContainerClassName="rounded-t-none border-t-0"
        total={data?.total ?? 0}
        tableClassName="md:table-fixed"
        // TODO: add handle click to preview document
        rowSelection={rowSelection}
      />
    </div>
  )
}

Component.displayName = "Document"
