import {
  DocumentToolbar,
  DocumentViewer,
  ViewSignalsDetails
} from "@/modules/conference-demo/admin/components/molecules"
import { DocumentSignalsDetails } from "@/modules/conference-demo/admin/components/molecules/DocumentSignalsDetails"
import { LoanDocumentDetailsProvider } from "@/modules/conference-demo/admin/providers/LoanDocumentDetailsProvider"
import { useState } from "react"

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

const DocumentDetail: React.FC = () => {
  return (
    <LoanDocumentDetailsProvider>
      <DocumentScore />
    </LoanDocumentDetailsProvider>
  )
}

export default DocumentDetail
