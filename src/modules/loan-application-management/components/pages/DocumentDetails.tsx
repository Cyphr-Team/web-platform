import { useState } from "react"
import { LoanDocumentDetailsProvider } from "../../providers/LoanDocumentDetailsProvider"
import { DocumentToolbar } from "../molecules/documents/DocumentToolbar"
import { DocumentSignalsDetails } from "../organisms/DocumentSignalsDetails"
import { DocumentViewer } from "../organisms/DocumentViewer"

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
        {!isOpen && (
          <p
            className="text-xs bg-error-100 p-3"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.25) 0px 4px 4px, rgba(130, 94, 1, 0.25) 0px -2px 0px inset"
            }}
          >
            Detect signals found.
            <span
              className="underline cursor-pointer ml-0.5"
              onClick={handleOpen}
            >
              View details
            </span>
          </p>
        )}
        <div className="lg:flex h-full overflow-y-auto">
          <DocumentViewer />
          {isOpen && <DocumentSignalsDetails handleClose={handleClose} />}
        </div>
      </div>
    </LoanDocumentDetailsProvider>
  )
}
