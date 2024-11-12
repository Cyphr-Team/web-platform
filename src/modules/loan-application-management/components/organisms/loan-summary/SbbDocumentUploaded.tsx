import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { REQUEST_LIMIT_PARAM_FOR_SELECT } from "@/constants"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { DocumentType } from "@/modules/loan-application-management/constants/types/document"
import { useQueryDocument } from "@/modules/loan-application-management/hooks/useQuery/useQueryDocument"
import { DownloadDocumentButton } from "@/modules/loan-application/components/atoms/DownloadDocumentButton"
import { type LoanDocument } from "@/types/loan-document.type"
import { renderHeader } from "@/utils/table.utils"
import { type ColumnDef } from "@tanstack/react-table"

const getSbbDocumentType = (type: DocumentType) => {
  switch (type) {
    case DocumentType.ARTICLES_OF_ORGANIZATION_AND_OPERATING_AGREEMENT:
      return "Articles of organization and operating agreement"
    case DocumentType.BUSINESS_EIN_LETTER:
      return "Business EIN letter"
    case DocumentType.CERTIFICATE_OF_GOOD_STANDING:
      return "Certificate of good standing"
    case DocumentType.FICTITIOUS_NAME_CERTIFICATION:
      return "Fictitious name certification"
    case DocumentType.BY_LAWS:
      return "By-laws"
    default:
      return ""
  }
}

const columns: ColumnDef<LoanDocument>[] = [
  {
    id: "type",
    header: renderHeader("Document"),
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="min-w-0 font-semibold">
          {getSbbDocumentType(document.type)}
        </div>
      )
    }
  },
  {
    id: "name",
    header: renderHeader("File name"),
    cell: ({ row }) => {
      const document = row.original

      return <div className="min-w-0">{document.name}</div>
    }
  },
  {
    id: "action",
    header: renderHeader("Download", "flex justify-end mr-3"),
    cell: ({ row }) => {
      const document = row.original

      return (
        <div className="min-w-0 text-right">
          <DownloadDocumentButton
            documentId={document.id}
            fileName={document.name}
          />
        </div>
      )
    }
  }
]

const Documents = [
  DocumentType.BUSINESS_EIN_LETTER,
  DocumentType.CERTIFICATE_OF_GOOD_STANDING,
  DocumentType.FICTITIOUS_NAME_CERTIFICATION,
  DocumentType.ARTICLES_OF_ORGANIZATION_AND_OPERATING_AGREEMENT,
  DocumentType.BY_LAWS
]

export function SbbSubmittedDocuments() {
  const { data, isLoading } = useQueryDocument({
    keyword: "",
    limit: REQUEST_LIMIT_PARAM_FOR_SELECT,
    offset: 0
  })

  const documents = Documents.map(
    (document) => data?.data.find((d) => d.type === document)
  ).filter(Boolean)

  return (
    <Card className="flex flex-col gap-2xl p-8">
      <CardHeader className="!p-0">
        <CardTitle className="p-0 text-lg font-semibold text-text-primary">
          Submitted Document
        </CardTitle>
      </CardHeader>

      <CardContent className="overflow-auto !p-0">
        <MiddeskTable
          cellClassName="text-sm pl-0  border-b"
          columns={columns}
          data={documents as LoanDocument[]}
          headerCellClassName="p-0 text-text-primary text-sm font-medium"
          isLoading={isLoading}
          tableClassName="!text-text-primary"
        />
      </CardContent>
    </Card>
  )
}
