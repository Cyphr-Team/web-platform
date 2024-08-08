import {
  BankStatementType,
  DocumentType,
  PayStubCapturedType,
  W2DocumentType
} from "../../../constants/types/document"
import { useLoanDocumentDetailsContext } from "../../../providers/LoanDocumentDetailsProvider"
import { BankStatement } from "../../molecules/capture/BankStatement"
import { W2Document } from "../../molecules/capture/W2Document"
import { PayStubDocument } from "../capture/PayStub"

export const DocumentCapture: React.FC = () => {
  const { documentDetails } = useLoanDocumentDetailsContext()

  const documentTypeSelected = documentDetails?.documentType
  if (!documentDetails) return null
  if (!documentDetails.capture) return null

  return (
    <div className="lg:w-96 h-full overflow-y-auto">
      {documentTypeSelected === DocumentType.BANK_STATEMENT && (
        <BankStatement data={documentDetails?.capture as BankStatementType} />
      )}
      {documentTypeSelected === DocumentType.W2 && (
        <W2Document data={documentDetails?.capture as W2DocumentType} />
      )}
      {documentTypeSelected === DocumentType.PAY_STUB && (
        <PayStubDocument
          data={documentDetails?.capture as PayStubCapturedType}
        />
      )}
    </div>
  )
}
