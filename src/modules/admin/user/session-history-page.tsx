import { DataTable } from "@/components/ui/data-table"
import { useBreadcrumb } from "@/hooks/useBreadcrumb.ts"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs.tsx"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { type PaginationState } from "@tanstack/react-table"
import { useState } from "react"
import { type ChatbotSessionResponse } from "@/types/chatbot.type"
import { useQueryListPaginateChatSession } from "@/modules/admin/user/hooks/useQuery/useQueryListPaginateChatSession"
import { chatSessionColumns } from "@/modules/admin/user/table/chat-session-columns"
import { useParams } from "react-router-dom"

export function Component() {
  const { id } = useParams()
  const breadcrumbs = useBreadcrumb()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: REQUEST_LIMIT_PARAM
  })

  const { data, isFetching } = useQueryListPaginateChatSession({
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
    userId: id
  })

  const sessionInfos: ChatbotSessionResponse[] = data?.data ?? []

  return (
    <div className="mx-auto p-6 md:p-8">
      <div className="mb-3xl">
        <Breadcrumbs breads={breadcrumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Chat Sessions</h1>
      <DataTable
        columns={chatSessionColumns}
        data={sessionInfos ?? []}
        isLoading={isFetching}
        pagination={pagination}
        setPagination={setPagination}
        tableHeaderClassName="border-t-0"
        tableWrapperClassName="-mt-6 rounded-b-xl rounded-t-none border-t-0"
        total={data?.total ?? 0}
      />
    </div>
  )
}

Component.displayName = "SessionPage"
