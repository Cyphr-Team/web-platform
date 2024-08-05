import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { Document, Page, pdfjs, Thumbnail } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"
import { useQueryDownloadDocumentForOfficer } from "../../hooks/useQuery/useQueryDownloadDocumentForOfficer"

import { FeatureKey } from "@/hooks/useCanAccess"
import { FeatureRenderer } from "@/shared/layouts/FeatureRenderer"
import type { PDFDocumentProxy } from "pdfjs-dist"
import { useParams } from "react-router-dom"
import { BackButton } from "../molecules/documents/BackButton"
import { DownloadDocumentButton } from "../table/download-document-button"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/"
}

interface IPDFDocument {
  file: string
}

const PDFDocument = ({ file }: IPDFDocument) => {
  const [numPages, setNumPages] = useState<number>()

  function onDocumentLoadSuccess({
    numPages: nextNumPages
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
  }

  return (
    <div className="mx-auto w-full h-full overflow-hidden">
      <Document
        className="flex overflow-hidden h-full w-full"
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        <div className="flex overflow-hidden w-full justify-between">
          <div className="flex flex-col flex-shrink-0 overflow-auto p-2 bg-gray-200 rounded-l-md">
            {Array.from(new Array(numPages), (_, index) => (
              <div
                className="flex flex-col items-center justify-center"
                key={`page_${index + 1}`}
              >
                <Thumbnail
                  className="p-2 bg-gray-200"
                  pageNumber={index + 1}
                  scale={0.2}
                />
                <span className="text-xs font-medium">{index + 1}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-1 overflow-hidden h-full w-full mx-auto p-2 bg-gray-200 rounded-r-md">
            <div className="flex flex-1 overflow-auto flex-col max-w-fit mx-auto">
              {Array.from(new Array(numPages), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </Document>
    </div>
  )
}

const PDFDocumentPreview = () => {
  const params = useParams()

  const downloadFile = useQueryDownloadDocumentForOfficer({
    documentId: params.documentId,
    preventCacheCount: -1 // Not effect flow download document
  })

  if (downloadFile.isLoading)
    return <Skeleton className="w-full h-full bg-gray-300" />

  if (!downloadFile.data || !params.documentId) return "💀"

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
