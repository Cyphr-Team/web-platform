import { LoanDocumentDetailsProvider } from "../../providers/LoanDocumentDetailsProvider"
import { DocumentToolbar } from "../molecules/documents/DocumentToolbar"
import { DocumentData } from "../organisms/DocumentData"
import { DocumentViewer } from "../organisms/DocumentViewer"

export const Component: React.FC = () => {
  return (
    <LoanDocumentDetailsProvider>
      <div className="flex flex-col h-full">
        <DocumentToolbar />
        <div className="flex h-full overflow-y-auto">
          <DocumentViewer />
          <DocumentData />
        </div>
      </div>
    </LoanDocumentDetailsProvider>
  )
}
