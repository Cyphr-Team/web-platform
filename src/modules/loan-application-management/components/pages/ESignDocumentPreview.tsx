import { AppAlert } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { SEARCH_PARAM_KEY } from "@/constants/routes.constants"
import { FeatureKey } from "@/hooks/useCanAccess"
import { ButtonDownloadESignDocument } from "@/modules/loan-application/components/atoms/ButtonDownloadESignDocument"
import { useGetESignDocumentBlob } from "@/modules/loan-application/hooks/useESign/useGetESignDocumentBlob"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { FileDown } from "lucide-react"
import { useParams, useSearchParams } from "react-router-dom"
import { PDFDocument } from "../atoms/PDFDocument"
import { BackButton } from "../molecules/documents/BackButton"

export function ESignDocumentPreview() {
  const params = useParams()
  const [search] = useSearchParams()
  const fileName = search.get(SEARCH_PARAM_KEY.DOCUMENT_NAME) ?? ""

  const downloadFile = useGetESignDocumentBlob({
    id: params.documentId
  })

  if (downloadFile.isLoading)
    return <Skeleton className="w-full h-full bg-gray-300" />

  if (!downloadFile.data || !params.documentId)
    return (
      <AppAlert
        description={
          <div className="flex items-center justify-between gap-2 flex-wrap">
            Error: Cannot get the document detail, please try again later!
          </div>
        }
        title="Request document error."
        variant="error"
      />
    )

  return (
    <div className="flex flex-col h-full overflow-hidden gap-2">
      <div className="flex gap-2 justify-between items-center">
        <BackButton />

        <FeatureRenderer featureKey={FeatureKey.DOWNLOAD_APPLICANT_DOCUMENT}>
          <ButtonDownloadESignDocument
            documentName={fileName}
            id={params.documentId}
          >
            <div className="flex items-center">
              <span className="mr-1">Download document</span>
              <FileDown className="w-6 h-6 p-0.5" />
            </div>
          </ButtonDownloadESignDocument>
        </FeatureRenderer>
      </div>

      <PDFDocument file={downloadFile.data} />
    </div>
  )
}
