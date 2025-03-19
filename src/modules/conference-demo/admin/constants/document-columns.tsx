import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { APP_PATH } from "@/constants"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { BadgeAuthenticityScore } from "@/modules/loan-application-management/components/atoms/badge/BadgeAuthenticityScore"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type LoanDocument } from "@/types/loan-document.type"
import { snakeCaseToText } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const getDocumentType = (document: LoanDocument) => {
  const { ocrolusDocumentType = "", type: documentType = "" } = document ?? {}

  return ocrolusDocumentType !== "" ? ocrolusDocumentType : documentType
}

export const documentColumns = (id: string): ColumnDef<LoanDocument>[] => [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-xs font-medium text-text-tertiary"
        column={column}
        title="File name"
      />
    ),
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="flex min-w-0 items-center gap-3">
          <div>
            <Icons.pdfIcon />
          </div>
          <div className="min-w-0">
            <p className="truncate">{document.name}</p>
            {document.fileSize ? (
              <p className="mt-0.5 truncate text-sm text-muted-foreground ">
                {document.fileSize} KB
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
    id: "ocrolusDocumentType",
    accessorKey: "ocrolusDocumentType",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="text-xs font-medium text-text-tertiary"
        column={column}
        title="Document Type"
      />
    ),
    size: 150,
    enableSorting: false,
    cell: ({ row }) => {
      const type = getDocumentType(row.original)

      return (
        <div className="font-medium">
          <Badge
            className="border-gray-300 py-1.5 capitalize text-zinc-700"
            variant="outline"
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
        className="text-right text-xs font-medium text-text-tertiary"
        column={column}
        title="Uploaded"
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
        className="text-right text-xs font-medium text-text-tertiary"
        column={column}
        title="Authenticity Score"
      />
    ),
    size: 100,
    enableSorting: false,
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="flex content-end items-end justify-end pr-0">
          <BadgeAuthenticityScore
            score={document?.authenticityScoreStatus.score}
            status={document?.authenticityScoreStatus.status}
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
        <div className="flex content-end items-center justify-end gap-2 text-gray-500">
          <Button asChild variant="ghost">
            <Link to={APP_PATH.CONFERENCE_DEMO.admin.documentDetail(id)}>
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      )
    }
  }
]
