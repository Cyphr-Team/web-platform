import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { FeatureKey } from "@/hooks/useCanAccess"
import { ButtonDownloadESignDocument } from "@/modules/loan-application/components/atoms/ButtonDownloadESignDocument"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { type LoanDocument } from "@/types/loan-document.type"
import { snakeCaseToText } from "@/utils"
import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowRight, FileDown } from "lucide-react"
import { DocumentType } from "../../constants/types/document"
import { BadgeAuthenticityScore } from "../atoms/badge/BadgeAuthenticityScore"
import { DownloadDocumentButton } from "./download-document-button"

const getDocumentType = (document: LoanDocument) => {
  const { ocrolusDocumentType = "", type: documentType = "" } = document ?? {}

  return ocrolusDocumentType !== "" ? ocrolusDocumentType : documentType
}

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
            {document.fileSize ? (
              <p className="text-sm text-muted-foreground mt-0.5 truncate ">
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
      <DataTableColumnHeader column={column} title="Document Type" />
    ),
    size: 150,
    enableSorting: false,
    cell: ({ row }) => {
      const type = getDocumentType(row.original)

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
        className="text-right"
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
    cell: ({ row }) => {
      const document = row.original
      const type = getDocumentType(row.original)

      const downloadButton =
        type.toLowerCase() === DocumentType.E_SIGN ? (
          <ButtonDownloadESignDocument
            documentName={document.name}
            id={document.id}
          >
            <div className="flex items-center">
              <FileDown className="w-6 h-6 p-0.5" />
            </div>
          </ButtonDownloadESignDocument>
        ) : (
          <DownloadDocumentButton
            documentId={document.id}
            fileName={document.name}
          />
        )

      return (
        <div className="flex content-end justify-end items-center gap-2 text-gray-500">
          <FeatureRenderer featureKey={FeatureKey.DOWNLOAD_APPLICANT_DOCUMENT}>
            {downloadButton}
          </FeatureRenderer>

          <Button size="icon" variant="ghost">
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )
    }
  }
]
