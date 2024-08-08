import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { FeatureKey } from "@/hooks/useCanAccess"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { LoanDocument } from "@/types/loan-document.type"
import { snakeCaseToText } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowRight } from "lucide-react"
import { BadgeAuthenticityScore } from "../atoms/badge/BadgeAuthenticityScore"
import { DownloadDocumentButton } from "./download-document-button"

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
    enableSorting: false,
    size: 300
  },
  {
    id: "ocrolusDocumentType",
    accessorKey: "ocrolusDocumentType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document Type" />
    ),
    size: 150,
    enableSorting: false,
    cell: ({ row }) => {
      const { ocrolusDocumentType, type: documentType } = row.original ?? {}
      const type =
        ocrolusDocumentType?.toString() !== ""
          ? ocrolusDocumentType
          : documentType
      return (
        <div className="font-medium">
          <Badge variant="soft">{snakeCaseToText(type)?.toUpperCase()}</Badge>
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
    enableSorting: false,
    cell: ({ row }) => {
      const document = row.original

      return <p>{format(new Date(document.createdAt), FORMAT_DATE_M_D_Y)}</p>
    }
  },
  {
    id: "authenticityScore",
    accessorFn: (row) => row.authenticityScoreStatus.score,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Authenticity Score"
        className="text-right"
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
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="flex content-end justify-end items-center gap-2">
          <FeatureRenderer featureKey={FeatureKey.DOWNLOAD_APPLICANT_DOCUMENT}>
            <DownloadDocumentButton
              documentId={document.id}
              fileName={document.name}
              className="text-gray-500"
            />
          </FeatureRenderer>

          <Button variant="ghost" size="icon" className="text-gray-500">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )
    }
  }
]
