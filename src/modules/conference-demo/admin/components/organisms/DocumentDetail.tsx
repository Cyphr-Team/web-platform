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
    <div className="flex h-full flex-col">
      <DocumentToolbar />
      <ViewSignalsDetails
        handleOpenSignalDetails={handleOpen}
        isOpenSignalDetails={isOpen}
      />
      <div className="h-full overflow-y-auto lg:flex">
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
