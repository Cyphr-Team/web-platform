import { DataTable } from "@/components/ui/data-table"
import { useBreadcrumb } from "@/hooks/useBreadcrumb.ts"
import { cn } from "@/lib/utils.ts"
import { checkIsForesightAdmin } from "@/utils/check-roles.ts"
import { useQueryGetListAllInstitution } from "./hooks/useQuery/useQueryGetListAllInstitution.ts"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs.tsx"
import { documentColumns } from "@/modules/admin/user/table/documents-table"
import { DialogAddDocument } from "@/modules/admin/user/components/DialogAddDocument"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { type PaginationState } from "@tanstack/react-table"
import {
  type FilterParams,
  useQueryListPaginateDocument
} from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateDocument"
import { useCallback, useState } from "react"
import { DocumentTableHeader } from "@/modules/admin/user/table/document-table-header"
import { type ChatbotDocument } from "@/types/chatbot.type"

export function Component() {
  const breadcrumbs = useBreadcrumb()

  const [filterParams, setFilterParams] = useState<FilterParams>()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })
  const isForesightAdmin = checkIsForesightAdmin()

  const listInstitution = useQueryGetListAllInstitution({
    enabled: isForesightAdmin
  })

  const mapInstitutionNames = (document: ChatbotDocument) => {
    return {
      ...document,
      institutionName:
        listInstitution.data?.find(
          (institution) => institution.id === document.institutionId
        )?.name ?? "Unknown"
    }
  }

  const { data, isFetching } = useQueryListPaginateDocument({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    ...filterParams
  })

  const handleSearch = useCallback(
    (formValues: FilterParams) => {
      setFilterParams(formValues)
      setPagination((preState) => ({
        ...preState,
        pageIndex: 0
      }))
    },
    [setFilterParams, setPagination]
  )

  const documentInfos: ChatbotDocument[] = data?.data ?? []

  return (
    <div className="mx-auto p-6 pt-6 md:p-8">
      <div className="mb-3xl">
        <Breadcrumbs breads={breadcrumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Documents</h1>
      <div
        className={cn(
          "flex flex-auto items-end justify-end mb-4",
          isForesightAdmin && "justify-between"
        )}
      >
        {isForesightAdmin ? (
          <DocumentTableHeader onSearch={handleSearch} />
        ) : null}
        <DialogAddDocument />
      </div>
      <DataTable
        columns={documentColumns}
        data={documentInfos.map(mapInstitutionNames) ?? []}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        tableHeaderClassName="border-t-0"
        tableWrapperClassName="rounded-t-none border-t-0 -mt-6 rounded-b-xl"
        total={data?.total ?? 0}
      />
    </div>
  )
}

Component.displayName = "DocumentPage"
