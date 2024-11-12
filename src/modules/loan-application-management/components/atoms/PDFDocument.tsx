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
    <div className="mx-auto size-full overflow-hidden">
      <Document
        className="flex size-full overflow-hidden"
        file={file}
        options={options}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <div className="flex w-full justify-between overflow-hidden">
          <div className="flex shrink-0 flex-col overflow-auto rounded-l-md bg-gray-200 p-2">
            {Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="flex flex-col items-center justify-center"
              >
                <Thumbnail
                  className="bg-gray-200 p-2"
                  pageNumber={index + 1}
                  scale={0.2}
                />
                <span className="text-xs font-medium">{index + 1}</span>
              </div>
            ))}
          </div>

          <div className="mx-auto flex size-full flex-1 overflow-hidden rounded-r-md bg-gray-200 p-2">
            <div className="mx-auto flex max-w-fit flex-1 flex-col overflow-auto">
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
