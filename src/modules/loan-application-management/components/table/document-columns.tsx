import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/ui/icons"
import { APP_PATH } from "@/constants"
import { FORMAT_DATE_M_D_Y } from "@/constants/date.constants"
import { DataTableColumnHeader } from "@/shared/molecules/table/column-header"
import { LoanDocument, LoanDocumentStatus } from "@/types/loan-document.type"
import { snakeCaseToText } from "@/utils"
import { ColumnDef, Row } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronRight } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { BadgeAuthenticityScore } from "../atoms/BadgeAuthenticityScore"
import { DownloadDocumentButton } from "./download-document-button"

function useHandleClickDetail(detail: Row<LoanDocument>) {
  const navigate = useNavigate()
  const { id: LoanApplicationID } = useParams()
  if (detail.original.status === LoanDocumentStatus.UNCHECKED) return
  navigate(
    APP_PATH.LOAN_APPLICATION_MANAGEMENT.DOCUMENT.detail(
      LoanApplicationID!,
      detail.original.id
    )
  )
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
          <DownloadDocumentButton
            documentId={document.id}
            fileName={document.name}
          />
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
      const document = row.original

      return (
        <div className="font-medium">
          <Badge variant="soft">
            {snakeCaseToText(
              document?.ocrolusDocumentType ?? ""
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
      const document = row.original

      return <p>{format(new Date(document.createdAt), FORMAT_DATE_M_D_Y)}</p>
    }
  },
  {
    id: "authenticityScore",
    accessorFn: (row) => row.authenticityScoreStatus.score,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Authenticity Score" />
    ),
    size: 150,
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
    size: 150,
    cell: ({ row }) => {
      return (
        <div
          className="flex content-end justify-end items-center"
          onClick={() => useHandleClickDetail(row)}
        >
          <p className=" font-semibold text-gray-500">Review</p>
          <div>
            <ChevronRight className="text-gray-500" />
          </div>
        </div>
      )
    }
  }
]
