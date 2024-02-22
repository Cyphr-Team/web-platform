import { useState } from "react"
import { LoanDocumentDetailsProvider } from "../../providers/LoanDocumentDetailsProvider"
import { DocumentToolbar } from "../molecules/documents/DocumentToolbar"
import { DocumentSignalsDetails } from "../organisms/DocumentSignalsDetails"
import { DocumentViewer } from "../organisms/DocumentViewer"
import { ViewSignalsDetails } from "../atoms/ViewSignalsDetails"

export const Component: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <LoanDocumentDetailsProvider>
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
    </LoanDocumentDetailsProvider>
  )
}
