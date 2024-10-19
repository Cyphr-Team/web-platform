import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type AccessorKeyColumnDef } from "@tanstack/react-table"
import { type ChatbotSessionResponse } from "@/types/chatbot.type"
import { ViewUserChatHistoryAction } from "@/modules/admin/user/table/view-user-chat-history-action"
import { FORMAT_DATE_M_D_Y_TIME_UPPERCASE } from "@/constants/date.constants"
import { formatDate } from "@/utils/date.utils"

export const chatSessionColumns: AccessorKeyColumnDef<ChatbotSessionResponse>[] =
  [
    {
      id: "title",
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      size: 250,
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <div className="text-black font-medium">
            {data.session.title ?? "N/A"}
          </div>
        )
      }
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created At" />
      ),
      size: 150,
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <p className="text-left">
            {formatDate(
              data.session.createdAt,
              FORMAT_DATE_M_D_Y_TIME_UPPERCASE
            )}
          </p>
        )
      }
    },
    {
      id: "endedAt",
      accessorKey: "endedAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ended At" />
      ),
      size: 150,
      enableSorting: false,
      cell: ({ row }) => {
        const data = row.original

        return (
          <p className="text-left">
            {data.session.endedAt
              ? formatDate(
                  data.session.endedAt,
                  FORMAT_DATE_M_D_Y_TIME_UPPERCASE
                )
              : "N/A"}
          </p>
        )
      }
    },
    {
      accessorKey: "edit",
      header: () => <p className="p-2">Action</p>,
      size: 150,

      cell: ({ row }) => {
        return (
          <div className="flex items-center text-left">
            <ViewUserChatHistoryAction
              chatHistories={row.original.chatHistories}
              session={row.original.session}
            />
          </div>
        )
      }
    }
  ]
