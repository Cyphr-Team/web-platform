import { SignalsDetectedRow } from "../../molecules/signals/SignalsDetectedRow"
import { SignalRow } from "../../molecules/signals/SignalRow"
import { AuthenticityScore } from "../../molecules/signals/Authenticity"
import { useLoanDocumentDetailsContext } from "../../../providers/LoanDocumentDetailsProvider"

export const DocumentSignalsDetect: React.FC = () => {
  const { documentDetails } = useLoanDocumentDetailsContext()
  const signalsData = documentDetails?.detect.signals
  const authenticityData = documentDetails?.detect.formAuthenticity

  return (
    <div className="flex flex-col gap-3 overflow-y-auto lg:w-96">
      {!!authenticityData && (
        <AuthenticityScore authenticity={authenticityData} />
      )}
      <div className="flex flex-col">
        {!!signalsData?.length && (
          <p className="py-3 text-sm text-text-secondary">
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
