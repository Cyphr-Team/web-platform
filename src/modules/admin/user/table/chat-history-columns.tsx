import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { AccessorKeyColumnDef } from "@tanstack/react-table"
import { FORMAT_DATE_M_D_Y_TIME_UPPERCASE } from "@/constants/date.constants"
import { ChatbotHistory } from "@/types/chatbot.type"
import removeMd from "remove-markdown"
import { formatDate } from "@/utils/date.utils"

export const chatHistoryColumns: AccessorKeyColumnDef<ChatbotHistory>[] = [
  {
    id: "message",
    accessorKey: "message",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message" />
    ),
    size: 250,
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original
      return (
        <div className="whitespace-pre-wrap break-words">
          {removeMd(data.message ?? "N/A")}
        </div>
      )
    }
  },
  {
    id: "messageType",
    accessorKey: "messageType",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const data = row.original

      return <p className="text-left">{data.messageType.toLocaleUpperCase()}</p>
    }
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    size: 150,
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original

      return (
        <p className="text-left">
          {formatDate(data.createdAt, FORMAT_DATE_M_D_Y_TIME_UPPERCASE)}
        </p>
      )
    }
  }
]
