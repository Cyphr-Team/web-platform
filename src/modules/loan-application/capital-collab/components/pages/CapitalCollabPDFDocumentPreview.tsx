import { AppAlert } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { FeatureKey } from "@/hooks/useCanAccess"
import { PDFDocument } from "@/modules/loan-application-management/components/atoms/PDFDocument"
import { BackButton } from "@/modules/loan-application/capital-collab/components/atoms/BackButton"
import { DocumentDownloadButton } from "@/modules/loan-application/capital-collab/components/atoms/DocumentDownloadButton"
import { useDownloadDocument } from "@/modules/loan-application/capital-collab/hooks/useDownloadDocument"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import { checkIsWorkspaceAdmin } from "@/utils/check-roles"
import { useParams } from "react-router-dom"

function PDFDocumentPreview() {
  const params = useParams()

  const downloadFile = useDownloadDocument({
    documentId: params.documentId!,
    preventCacheCount: -1, // Not affect flow download document
    isAdmin: checkIsWorkspaceAdmin()
  })

  if (downloadFile.isLoading)
    return <Skeleton className="size-full bg-gray-300" />

  if (!downloadFile.data || !params.documentId)
    return (
      <AppAlert
        description={
          <div className="flex flex-wrap items-center justify-between gap-2">
            Error: Cannot get the document detail, please try again later!
          </div>
        }
        title="Request document error."
        variant="error"
      />
    )

  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden">
      <div className="flex items-center justify-between gap-2">
        <BackButton />

        <FeatureRenderer featureKey={FeatureKey.DOWNLOAD_APPLICANT_DOCUMENT}>
          <DocumentDownloadButton
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
