import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { APP_PATH } from "@/constants"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { BadgeAuthenticityScore } from "@/modules/loan-application-management/components/atoms/badge/BadgeAuthenticityScore"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { LoanDocument } from "@/types/loan-document.type"
import { snakeCaseToText } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const getDocumentType = (document: LoanDocument) => {
  const { ocrolusDocumentType = "", type: documentType = "" } = document ?? {}

  return ocrolusDocumentType !== "" ? ocrolusDocumentType : documentType
}

export const documentColumns: ColumnDef<LoanDocument>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="File name"
        className="text-xs font-medium text-text-tertiary"
      />
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
            {document.fileSize && (
              <p className="text-sm text-muted-foreground mt-0.5 truncate ">
                {document.fileSize} KB
              </p>
            )}
          </div>
        </div>
      )
    },
    enableSorting: false,
    size: 300
  },
  {
    id: "ocrolusDocumentType",
    accessorKey: "ocrolusDocumentType",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Document Type"
        className="text-xs font-medium text-text-tertiary"
      />
    ),
    size: 150,
    enableSorting: false,
    cell: ({ row }) => {
      const type = getDocumentType(row.original)

      return (
        <div className="font-medium">
          <Badge
            variant="outline"
            className="border-gray-300 py-1.5 text-zinc-700 capitalize"
          >
            {snakeCaseToText(type).toLowerCase()}
          </Badge>
        </div>
      )
    }
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Uploaded"
        className="text-xs text-right font-medium text-text-tertiary"
      />
    ),
    size: 150,
    enableSorting: false,
    cell: ({ row }) => {
      const document = row.original

      return (
        <p className="text-right">
          {format(new Date(document.createdAt), FORMAT_DATE_M_D_Y)}
        </p>
      )
    }
  },
  {
    id: "authenticityScore",
    accessorFn: (row) => row.authenticityScoreStatus.score,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Authenticity Score"
        className="text-xs text-right font-medium text-text-tertiary"
      />
    ),
    size: 100,
    enableSorting: false,
    cell: ({ row }) => {
      const document = row.original
      return (
        <div className="flex content-end items-end justify-end pr-0">
          <BadgeAuthenticityScore
            status={document?.authenticityScoreStatus.status}
            score={document?.authenticityScoreStatus.score}
          />
        </div>
      )
    }
  },
  {
    id: "action",
    header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
    size: 50,
    cell: () => {
      return (
        <div className="flex content-end justify-end items-center gap-2 text-gray-500">
          <Button variant="ghost" asChild>
            <Link to={APP_PATH.CONFERENCE_DEMO.admin.documentDetail}>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      )
    }
  }
]
