import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  AuthenticityScore,
  SignalRow,
  SignalsDetectedRow
} from "@/modules/conference-demo/admin/components/atoms"
import {
  BankStatementType,
  DocumentType
} from "@/modules/conference-demo/admin/constants/type"
import { useLoanDocumentDetailsContext } from "@/modules/conference-demo/admin/providers/LoanDocumentDetailsProvider"
import { BankStatement } from "@/modules/loan-application-management/components/molecules/capture/BankStatement"
import { X } from "lucide-react"
import { useState } from "react"

type Props = {
  handleClose: () => void
}
export const DocumentSignalsDetails: React.FC<Props> = ({ handleClose }) => {
  const [section, setSection] = useState<Section>(SECTION_DATA[1])

  return (
    <div className="flex flex-col gap-3 px-3">
      <div className="flex justify-between py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="p-0" onClick={handleClose}>
            <X className="w-10 h-10" strokeWidth={0.75} />
          </Button>
          <p className="text-lg">{section.title}</p>
        </div>
        <div className="flex font-semibold text-sm text-center">
          {SECTION_DATA.map((data) => (
            <button
              key={data.content}
              className={cn(
                "flex p-md items-center justify-center transition-colors border-b-2 border-transparent whitespace-nowrap",
                "text-disabled uppercase",
                section.content === data.content &&
                  "text-black border-b-2 border-black"
              )}
              onClick={() => setSection(data)}
            >
              {data.content}
            </button>
          ))}
        </div>
      </div>
      {section.content === SECTION_CONTENTS.DETECT ? (
        <DocumentSignalsDetect />
      ) : (
        <DocumentCapture />
      )}
    </div>
  )
}

const DocumentCapture = () => {
  const { documentDetails } = useLoanDocumentDetailsContext()
  const documentTypeSelected = documentDetails?.documentType

  if (!documentDetails) return null

  if (!documentDetails.capture) return null

  return (
    <div className="lg:w-96 h-full overflow-y-auto">
      {documentTypeSelected === DocumentType.BANK_STATEMENT && (
        <BankStatement data={documentDetails?.capture as BankStatementType} />
      )}
    </div>
  )
}

const DocumentSignalsDetect = () => {
  const { documentDetails } = useLoanDocumentDetailsContext()
  const signalsData = documentDetails?.detect.signals
  const authenticityData = documentDetails?.detect.formAuthenticity

  return (
    <div className="flex flex-col lg:w-96 gap-3 overflow-y-auto">
      {!!authenticityData && (
        <AuthenticityScore authenticity={authenticityData} />
      )}
      <div className="flex flex-col">
        {!!signalsData?.length && (
          <p className="text-sm text-text-secondary py-3">
            {signalsData?.length} Signals in Document
          </p>
        )}
        {signalsData?.map((signal) =>
          signal.signalCount > 0 ? (
            <SignalsDetectedRow
              key={signal?.signalDisplayName}
              signalsData={signal}
            />
          ) : (
            <SignalRow key={signal?.signalDisplayName} signalsData={signal} />
          )
        )}
      </div>
    </div>
  )
}

type Section = {
  title: string
  content: string
}
enum SECTION_CONTENTS {
  CAPTURE = "Capture",
  DETECT = "Detect"
}

const SECTION_DATA = [
  {
    title: "Captured Data",
    content: SECTION_CONTENTS.CAPTURE
  },
  {
    title: "Detect Signals",
    content: SECTION_CONTENTS.DETECT
  }
]
