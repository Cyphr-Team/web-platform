import { ButtonLoading } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { APP_PATH } from "@/constants"
import { DocumentTableHeader } from "@/modules/loan-application-management/components/table/document-header"
import { useQueryDocument } from "@/modules/loan-application/capital-collab/hooks/useGetDocumentList"
import { useDownloadDocuments } from "@/modules/loan-application/capital-collab/hooks/useDownloadDocuments"
import { SortOrder } from "@/types/common.type"
import {
  type Row,
  type RowSelectionState,
  type SortingState
} from "@tanstack/react-table"
import { DownloadIcon } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getColumns } from "../organisms/documents-columns"
import { checkIsWorkspaceAdmin } from "@/utils/check-roles"
import UploadDocumentDialog from "../organisms/upload-documents-dialog"
import { type CCLoanDocument } from "@/types/loan-document.type"
import useDeleteDocument from "../../hooks/useDeleteDocument"
import { EmptyDocuments } from "@/modules/loan-application/capital-collab/components/organisms/EmptyDocuments.tsx"

function ApplicationDocument() {
  const { id: loanApplicationID, loanProgramId } = useParams()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")
  // Table state
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const isAdmin = checkIsWorkspaceAdmin()

  const getSort = useCallback(() => {
    if (!sorting.length) return {}

    return {
      [sorting[0].id]: sorting[0].desc ? SortOrder.DESC : SortOrder.ASC
    }
  }, [sorting])

  const { data, isFetching } = useQueryDocument({
    applicationId: loanApplicationID!,
    fileName: keyword,
    sort: getSort(),
    isAdmin
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

  const downloadFile = useDownloadDocuments({
    isAdmin
  })
  const deleteDocument = useDeleteDocument()

  const handleDeleteDocument = (document: CCLoanDocument) => {
    deleteDocument.mutate({ id: document.formId, url: [document.url] })
  }

  const handleDownloadDocument = () => {
    downloadFile.mutate({ documentIds: selectedDocumentIds })
  }

  const handleClickDetail = (detail: Row<CCLoanDocument>) => {
    if (checkIsWorkspaceAdmin()) {
      navigate({
        pathname: APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.detail(
          loanApplicationID!,
          detail.original.id
        )
      })
    } else {
      navigate({
        pathname: APP_PATH.LOAN_APPLICATION.APPLICATIONS.documents.byDocumentId(
          loanProgramId!,
          loanApplicationID!,
          detail.original.id
        )
      })
    }
  }

  return (
    <div>
      {(!isAdmin || Object.keys(rowSelection).length > 0) && (
        <div className="flex flex-row-reverse w-full mb-6 gap-6">
          {isAdmin ? null : <UploadDocumentDialog />}
          {Object.keys(rowSelection).length ? (
            <ButtonLoading
              isLoading={downloadFile.isPending}
              variant="outline"
              onClick={handleDownloadDocument}
            >
              <DownloadIcon className="mr-2 text-muted-foreground" size={20} />
              Download
            </ButtonLoading>
          ) : null}
        </div>
      )}
      <DataTable
        manualSorting
        columns={getColumns({
          handleClickDetail,
          onDelete: isAdmin ? undefined : handleDeleteDocument
        })}
        customNoResultsComponent={!isAdmin ? <EmptyDocuments /> : undefined}
        data={data?.data ?? []}
        headerSearch={() => (
          <div className="bg-white px-6 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-24">
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
        )}
        isLoading={isFetching}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        setSorting={setSorting}
        sorting={sorting}
        tableCellClassName="bg-white"
        tableClassName="md:table-fixed"
        tableContainerClassName="rounded-t-none border-t-0"
        total={data?.total ?? 0}
      />
    </div>
  )
}

export default ApplicationDocument
