import { AppAlert } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { FeatureKey } from "@/hooks/useCanAccess"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { useParams } from "react-router-dom"
import { useQueryDownloadDocumentForOfficer } from "../../hooks/useQuery/useQueryDownloadDocumentForOfficer"
import { PDFDocument } from "../atoms/PDFDocument"
import { BackButton } from "../molecules/documents/BackButton"
import { DownloadDocumentButton } from "../table/download-document-button"

function PDFDocumentPreview() {
  const params = useParams()

  const downloadFile = useQueryDownloadDocumentForOfficer({
    documentId: params.documentId,
    preventCacheCount: -1 // Not effect flow download document
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
          <DownloadDocumentButton
            documentId={params.documentId}
            fileName="detail_document"
            text="Download document"
          />
        </FeatureRenderer>
      </div>

      <PDFDocument file={downloadFile.data} />
    </div>
  )
}

export default PDFDocumentPreview
