import { SignalsDetectedRow } from "../../molecules/signals/SignalsDetectedRow"
import { SignalRow } from "../../molecules/signals/SignalRow"
import { AuthenticityScore } from "../../molecules/signals/Authenticity"
import { useLoanDocumentDetailsContext } from "../../../providers/LoanDocumentDetailsProvider"

export const DocumentSignalsDetect: React.FC = () => {
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
