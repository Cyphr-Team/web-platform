import { DataTable } from "@/components/ui/data-table"
import { useBreadcrumb } from "@/hooks/useBreadcrumb.ts"
import { Breadcrumbs } from "@/shared/molecules/Breadcrumbs.tsx"
import { useLocation } from "react-router-dom"
import { chatHistoryColumns } from "@/modules/admin/user/table/chat-history-columns"
import {
  ConversationTableHeader,
  FilterValues
} from "@/modules/admin/user/table/conversation-table-header"
import { useState } from "react"
import { ChatbotHistory } from "@/types/chatbot.type"

export function Component() {
  const { state } = useLocation()
  const [histories, setHistories] = useState(state.chatHistories ?? [])
  const breadcrumbs = useBreadcrumb()

  const handleSearch = (filterValues: FilterValues) => {
    const data = state.chatHistories as ChatbotHistory[]
    setHistories(
      data?.filter((history) => {
        const messageFilter = history.message
          .toLowerCase()
          .includes(filterValues.search.toLowerCase())
        const statusFilter =
          filterValues.status.length > 0
            ? filterValues.status.includes(history.messageType)
            : true
        return messageFilter && statusFilter
      })
    )
  }

  return (
    <div className="mx-auto p-6 pt-6 md:p-8">
      <div className="mb-3xl">
        <Breadcrumbs breads={breadcrumbs} className="px-0" />
      </div>
      <h1 className="mb-3xl text-3xl font-semibold">Session Logs</h1>
      <div className="pb-3">
        <ConversationTableHeader onSearch={handleSearch} />
      </div>
      <DataTable
        tableWrapperClassName="rounded-t-none border-t-0 -mt-6 rounded-b-xl"
        tableHeaderClassName="border-t-0"
        columns={chatHistoryColumns}
        data={histories ?? []}
        total={histories?.length ?? 0}
      />
    </div>
  )
}

Component.displayName = "ConversationPage"
