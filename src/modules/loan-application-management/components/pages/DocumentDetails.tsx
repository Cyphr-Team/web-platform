import { lazy, useState } from "react"
import {
  LoanDocumentDetailsProvider,
  useLoanDocumentDetailsContext
} from "../../providers/LoanDocumentDetailsProvider"
import { ViewSignalsDetails } from "../atoms/ViewSignalsDetails"
import { DocumentToolbar } from "../molecules/documents/DocumentToolbar"
import { DocumentViewer } from "../organisms/document/DocumentViewer"
import { DocumentSignalsDetails } from "../organisms/document/DocumentSignalsDetails"

const PDFDocumentPreview = lazy(() => import("./PDFDocumentPreview"))

/**
 * Review document with Ocrolus
 */
const DocumentScore = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col h-full">
      <DocumentToolbar />
      <ViewSignalsDetails
        handleOpenSignalDetails={handleOpen}
        isOpenSignalDetails={isOpen}
      />
      <div className="lg:flex h-full overflow-y-auto">
        <DocumentViewer />
        {isOpen && <DocumentSignalsDetails handleClose={handleClose} />}
      </div>
    </div>
  )
}

export const DocumentPreview = () => {
  const { documentDetails, isLoadingDetail } = useLoanDocumentDetailsContext()

  if (isLoadingDetail) return <DocumentScore />
  else if (documentDetails) return <DocumentScore />

  // Review origin PDF when not Ocrolus not supported
  return <PDFDocumentPreview />
}

export const Component: React.FC = () => {
  return (
    <LoanDocumentDetailsProvider>
      <DocumentPreview />
    </LoanDocumentDetailsProvider>
  )
}
