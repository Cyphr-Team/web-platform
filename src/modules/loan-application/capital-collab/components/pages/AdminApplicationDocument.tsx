import { ButtonLoading } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { DocumentTableHeader } from "@/modules/loan-application-management/components/table/document-header"
import { useQueryDocument } from "@/modules/loan-application/capital-collab/hooks/useGetDocumentList"
import { useDownloadDocuments } from "@/modules/loan-application/capital-collab/hooks/useDownloadDocuments"
import { SortOrder } from "@/types/common.type"
import {
  type PaginationState,
  type RowSelectionState,
  type SortingState
} from "@tanstack/react-table"
import { DownloadIcon } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { columns } from "../organisms/documents-columns"

// For Admin view
export function AdminApplicationDocument() {
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

  const selectedDocumentIds = useMemo(() => {
    const ids =
      data?.data
        .filter((_, index) => rowSelection[index])
        .map((doc) => doc.id) ?? []

    return ids
  }, [data, rowSelection])

  const downloadFile = useDownloadDocuments()

  return (
    <div>
      {Object.keys(rowSelection).length ? (
        <div className="flex flex-row-reverse w-full mb-14">
          <ButtonLoading
            isLoading={downloadFile.isPending}
            variant="outline"
            onClick={() =>
              downloadFile.mutate({ documentIds: selectedDocumentIds })
            }
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
          placeholder="Search by documents"
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
