import { SEARCH_PARAM_KEY } from "@/constants/routes.constants"
import { lazy, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { DocumentType } from "../../constants/types/document"
import {
  LoanDocumentDetailsProvider,
  useLoanDocumentDetailsContext
} from "../../providers/LoanDocumentDetailsProvider"
import { ViewSignalsDetails } from "../atoms/ViewSignalsDetails"
import { DocumentToolbar } from "../molecules/documents/DocumentToolbar"
import { DocumentSignalsDetails } from "../organisms/document/DocumentSignalsDetails"
import { DocumentViewer } from "../organisms/document/DocumentViewer"
import { ESignDocumentPreview } from "./ESignDocumentPreview"

const PDFDocumentPreview = lazy(() => import("./PDFDocumentPreview"))

/**
 * Review document with Ocrolus
 */
function DocumentScore() {
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
        {isOpen ? <DocumentSignalsDetails handleClose={handleClose} /> : null}
      </div>
    </div>
  )
}

export function DocumentPreview() {
  const { documentDetails, isLoadingDetail } = useLoanDocumentDetailsContext()

  if (isLoadingDetail) return <DocumentScore />
  else if (documentDetails) return <DocumentScore />

  // Review origin PDF when not Ocrolus not supported
  return <PDFDocumentPreview />
}

export const Component: React.FC = () => {
  const [search] = useSearchParams()
  const documentType = search.get(SEARCH_PARAM_KEY.DOCUMENT_TYPE)

  if (documentType === DocumentType.E_SIGN) return <ESignDocumentPreview />

  return (
    <LoanDocumentDetailsProvider>
      <DocumentPreview />
    </LoanDocumentDetailsProvider>
  )
}
