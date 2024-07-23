import { ButtonLoading } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FORMAT_DATE_MM_DD_YYYY } from "@/constants/date.constants"
import { MiddeskTable } from "@/modules/loan-application-management/components/table/middesk-table"
import { useDownloadESignDocument } from "@/modules/loan-application/hooks/useESign/useDownloadESignDocument"
import { useQueryGetLoanApplicationCashflowVerification } from "@/modules/loan-application/hooks/useQuery/useQueryLoanApplicationCashFlow"
import { ErrorCode, getCustomErrorMsgByCode } from "@/utils/custom-error.ts"
import { renderHeader } from "@/utils/table.utils"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { FileDown } from "lucide-react"
import { useMemo } from "react"
import { useParams } from "react-router-dom"

export interface ILoanApplicationESignDocument {
  signedAt: string
  name: string
  documentId: string
}

const ButtonDownloadESignDocument = ({
  documentId
}: {
  documentId: string
}) => {
  const downloadMutate = useDownloadESignDocument()
  const handleDownloadESignDocument = async () => {
    await downloadMutate.mutateAsync(documentId)
  }

  return (
    <ButtonLoading
      isLoading={downloadMutate.isPending}
      variant="ghost"
      onClick={handleDownloadESignDocument}
    >
      <FileDown className="w-4 h-4" />
    </ButtonLoading>
  )
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
          {format(new Date(signature.signedAt), FORMAT_DATE_MM_DD_YYYY)}
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
          <ButtonDownloadESignDocument documentId={signature.documentId} />
        </div>
      )
    }
  }
]

/**
 * TODO - ESign get signature table
 */
export const ESignTable = () => {
  const { id: loanApplicationId } = useParams()
  const { isLoading, isError, error } =
    useQueryGetLoanApplicationCashflowVerification(loanApplicationId)

  const eSignDocuments: ILoanApplicationESignDocument[] = isLoading
    ? []
    : [
        {
          name: "E-Signed Application",
          signedAt: format(new Date(), FORMAT_DATE_MM_DD_YYYY),
          documentId: ""
        }
      ]

  const isCashFlowNotReady = useMemo(() => {
    return (
      isError && error?.response?.data.code === ErrorCode.cash_flow_not_ready
    )
  }, [isError, error])

  const noResultText = useMemo(() => {
    return isCashFlowNotReady
      ? getCustomErrorMsgByCode(ErrorCode.cash_flow_not_ready)
      : "No bank accounts detected"
  }, [isCashFlowNotReady])

  return (
    <Card>
      <CardHeader className="border-b mx-8 px-0 md:px-0 md:py-4">
        <div className="flex justify-between items-center flex-wrap gap-1">
          <CardTitle className="font-semibold text-lg flex items-center gap-3">
            E-Signature
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-5">
        <MiddeskTable
          columns={columns}
          data={eSignDocuments}
          isLoading={isLoading}
          noResultText={noResultText}
        />
      </CardContent>
    </Card>
  )
}
