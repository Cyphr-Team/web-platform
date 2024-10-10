import { DataTable } from "@/components/ui/data-table"
import { useBreadcrumb } from "@/hooks/useBreadcrumb.ts"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs.tsx"
import { REQUEST_LIMIT_PARAM } from "@/constants"
import { PaginationState } from "@tanstack/react-table"
import { useState } from "react"
import { ChatbotSessionResponse } from "@/types/chatbot.type"
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
    <div className="mx-auto p-6 pt-6 md:p-8">
      <div className="mb-3xl">
        <Breadcrumbs breads={breadcrumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Chat Sessions</h1>
      <DataTable
        tableWrapperClassName="rounded-t-none border-t-0 -mt-6 rounded-b-xl"
        tableHeaderClassName="border-t-0"
        columns={chatSessionColumns}
        data={sessionInfos ?? []}
        total={data?.total ?? 0}
        pagination={pagination}
        isLoading={isFetching}
        setPagination={setPagination}
      />
    </div>
  )
}

Component.displayName = "SessionPage"
