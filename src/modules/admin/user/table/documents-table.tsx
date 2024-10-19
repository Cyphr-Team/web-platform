import { Icons } from "@/components/ui/icons"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { ButtonDeleteDocument } from "@/modules/admin/user/components/RemoveDocumentButton"
import { DownloadChatbotDocumentButton } from "@/modules/loan-application-management/components/table/download-chatbot-document-button"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type ChatbotDocument } from "@/types/chatbot.type"
import { type AccessorKeyColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"

export const documentColumns: AccessorKeyColumnDef<
  ChatbotDocument & { institutionName?: string }
>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File name" />
    ),
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="flex items-center gap-3 min-w-0">
          <div>
            <Icons.pdfIcon />
          </div>
          <div className="min-w-0">
            <p className="truncate">{document.name}</p>
            {document.size ? (
              <p className="text-sm text-muted-foreground mt-0.5 truncate ">
                {Number.parseFloat((document.size / (1024 * 1024)).toFixed(2))}{" "}
                MB
              </p>
            ) : null}
          </div>
        </div>
      )
    },
    enableSorting: false,
    size: 300
  },
  {
    id: "institution",
    accessorKey: "institution",
    header: () => <p>Institution</p>,
    size: 150,
    cell: ({ row }) => {
      return <div>{row.original.institutionName ?? "N/A"}</div>
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
      const document = row.original

      return <p>{format(new Date(document.createdAt), FORMAT_DATE_M_D_Y)}</p>
    }
  },
  {
    id: "action",
    accessorKey: "action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    size: 50,
    enableSorting: false,
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="flex content-end justify-end items-center gap-2 text-gray-500">
          <DownloadChatbotDocumentButton
            documentId={document.id}
            fileName={document.name}
          />

          <ButtonDeleteDocument
            documentId={document.id}
            fileName={document.name}
          />
        </div>
      )
    }
  }
]
