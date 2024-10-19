import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { DocumentType } from "@/modules/loan-application-management/constants/types/document"
import { DownloadDocumentButton } from "@/modules/loan-application/components/atoms/DownloadDocumentButton"
import { type DocumentUploadedResponse } from "@/modules/loan-application/constants/type"
import { useQuerySbbDocumentForm } from "@/modules/loan-application/hooks/useQuery/useQuerySbbDocumentForm"
import { useBRLoanApplicationDetailsContext } from "@/modules/loan-application/providers"
import { textToCamelCaseFieldPattern } from "@/utils"
import { renderHeader } from "@/utils/table.utils"
import { type ColumnDef } from "@tanstack/react-table"
import { get } from "lodash"

const getSbbDocumentType = (type: string) => {
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

const columns: ColumnDef<DocumentUploadedResponse>[] = [
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

      return <div className="min-w-0">{document.originFileName}</div>
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
            fileName={document.originFileName}
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

export function SbbApplicantSubmittedDocuments() {
  const { loanApplicationDetails } = useBRLoanApplicationDetailsContext()
  const { data, isLoading } = useQuerySbbDocumentForm(
    loanApplicationDetails?.id ?? ""
  )

  const documents = Documents.map((type) =>
    get(data, textToCamelCaseFieldPattern(type), [])
  ).flat()

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Documentation</h3>
        </div>
      </div>
      <div className="col-span-3 gap-2xl flex flex-col max-w-screen-sm">
        <Card className="p-8 flex flex-col gap-2xl">
          <CardHeader className="!p-0">
            <CardTitle className="font-semibold text-lg text-text-primary p-0">
              Submitted Document
            </CardTitle>
          </CardHeader>

          <CardContent className="overflow-auto !p-0">
            <MiddeskTable
              cellClassName="text-sm pl-0  border-b"
              columns={columns}
              data={documents}
              headerCellClassName="p-0 text-text-primary text-sm font-medium"
              isLoading={isLoading}
              tableClassName="!text-text-primary"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
