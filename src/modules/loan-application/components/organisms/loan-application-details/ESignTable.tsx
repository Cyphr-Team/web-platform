import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { useGetESignDocument } from "@/modules/loan-application/hooks/useQuery/form/useGetESignDocument"
import { formatDate } from "@/utils/date.utils"
import { renderHeader } from "@/utils/table.utils"
import { ColumnDef } from "@tanstack/react-table"
import { FileDown } from "lucide-react"
import { useParams } from "react-router-dom"
import { ButtonDownloadESignDocument } from "../../atoms/ButtonDownloadESignDocument"

interface ILoanApplicationESignDocument {
  signedAt?: string
  name: string
  documentId: string
}

const columns: ColumnDef<ILoanApplicationESignDocument>[] = [
  {
    id: "name",
    header: renderHeader("Name"),
    cell: ({ row }) => {
      const signature = row.original
      return <div className="min-w-0">{signature.name}</div>
    }
  },
  {
    id: "date",
    header: renderHeader("Date"),
    cell: ({ row }) => {
      const signature = row.original

      return (
        <div className="min-w-0">
          {formatDate(signature.signedAt, FORMAT_DATE_MM_DD_YYYY)}
        </div>
      )
    }
  },
  {
    id: "action",
    header: renderHeader("Download", "flex justify-end mr-3"),
    cell: ({ row }) => {
      const signature = row.original

      return (
        <div className="min-w-0 text-right">
          <ButtonDownloadESignDocument documentId={signature.documentId}>
            <FileDown className="w-4 h-4" />
          </ButtonDownloadESignDocument>
        </div>
      )
    }
  }
]

export const ESignTable = () => {
  const { id: applicationId } = useParams()
  const { isLoading, data } = useGetESignDocument({
    applicationId,
    enabled: !!applicationId
  })

  const eSignDocuments: ILoanApplicationESignDocument[] =
    isLoading || !data?.documentId
      ? []
      : [
          {
            name: "E-Signed Application",
            signedAt: data?.updatedAt,
            documentId: data.documentId
          }
        ]

  return (
    <Card>
      <CardHeader className="border-b mx-8 px-0 md:px-0 md:py-4">
        <div className="flex justify-between items-center flex-wrap gap-1">
          <CardTitle className="font-semibold text-lg flex items-center gap-3">
            E-Signature
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-5 overflow-auto">
        <MiddeskTable
          columns={columns}
          data={eSignDocuments}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  )
}
