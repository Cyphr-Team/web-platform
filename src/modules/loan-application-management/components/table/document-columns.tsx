import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { Badge } from "@/components/ui/badge"
import { LoanDocument } from "@/types/loan-document.type"
import { format } from "date-fns"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { Icons } from "@/components/ui/icons"
import { snakeCaseToText } from "@/utils"
import { BadgeStatus } from "../atoms/BadgeStatus"

export const columns: ColumnDef<LoanDocument>[] = [
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
            <p className="text-sm text-muted-foreground mt-0.5 truncate ">
              {document.fileSize} KB
            </p>
          </div>
        </div>
      )
    },
    size: 500
  },
  {
    id: "ocrolusDocumentType",
    accessorKey: "ocrolusDocumentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document Type" />
    ),
    size: 200,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="font-medium">
          <Badge variant="soft">
            {snakeCaseToText(
              application?.ocrolusDocumentType ?? ""
            )?.toUpperCase()}
          </Badge>
        </div>
      )
    }
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date uploaded" />
    ),
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return <p>{format(new Date(application.createdAt), FORMAT_DATE_M_D_Y)}</p>
    }
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last updated" />
    ),
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return (
        <p>
          {format(
            new Date(application.updatedAt || application.createdAt),
            FORMAT_DATE_M_D_Y
          )}
        </p>
      )
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    size: 150,
    cell: ({ row }) => {
      const application = row.original

      return (
        <div className="font-medium">
          <BadgeStatus status={application.status} />
        </div>
      )
    }
  }
]
