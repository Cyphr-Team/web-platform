import {
  FAKE_CAPTURE_BANK_STATEMENT_DATA,
  FAKE_CAPTURE_PAYSTUB_DATA,
  FAKE_CAPTURE_W2_DATA
} from "../../constants"
import { DocumentType } from "../../constants/types/document"
import { useLoanDocumentDetailsContext } from "../../providers/LoanDocumentDetailsProvider"
import { BankStatement } from "../molecules/capture/BankStatement"
import { W2Document } from "../molecules/capture/W2Document"
import { PayStubDocument } from "./capture/PayStub"

export const DocumentCapture: React.FC = () => {
  // Randomly select a document type
  // TODO: Replace with actual document type selection
  const { documentDetails } = useLoanDocumentDetailsContext()

  const documentTypeSelected = documentDetails?.documentType
  return (
    <div className="lg:w-96 h-full overflow-y-auto">
      {documentTypeSelected === DocumentType.BANK_STATEMENT && (
        <BankStatement data={FAKE_CAPTURE_BANK_STATEMENT_DATA} />
      )}
      {documentTypeSelected === DocumentType.W2 && (
        <W2Document data={FAKE_CAPTURE_W2_DATA} />
      )}
      {documentTypeSelected === DocumentType.PAY_STUB && (
        <PayStubDocument data={FAKE_CAPTURE_PAYSTUB_DATA} />
      )}
    </div>
  )
}
