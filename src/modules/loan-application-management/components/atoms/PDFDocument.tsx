import { useState } from "react"
import { Document, Page, pdfjs, Thumbnail } from "react-pdf"
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import "react-pdf/dist/esm/Page/TextLayer.css"

import type { PDFDocumentProxy } from "pdfjs-dist"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/"
}

interface IPDFDocument {
  file: string | Blob
}

export function PDFDocument({ file }: IPDFDocument) {
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
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <div className="flex overflow-hidden w-full justify-between">
          <div className="flex flex-col flex-shrink-0 overflow-auto p-2 bg-gray-200 rounded-l-md">
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="flex flex-col items-center justify-center"
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
                  className="w-full"
                  pageNumber={index + 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Document>
    </div>
  )
}
