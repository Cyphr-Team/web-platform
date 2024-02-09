import { FAKE_SIGNALS_DATA } from "../../constants"
import { SignalsDetectType } from "../../constants/type"
import { SignalsDetectedRow } from "../molecules/signals/SignalsDetectedRow"
import { SignalRow } from "../molecules/signals/SignalRow"
import { AuthenticityScore } from "../molecules/signals/Authenticity"

export const DocumentSignalsDetect: React.FC = () => {
  const signalsData = FAKE_SIGNALS_DATA as SignalsDetectType
  return (
    <div className="flex flex-col w-96 gap-3 overflow-y-auto">
      <AuthenticityScore
        authenticityData={FAKE_SIGNALS_DATA.formAuthenticity}
      />
      <div className="flex flex-col">
        <p className="text-sm text-text-secondary border-b py-3">
          {signalsData.signalCount} Signals in Document
        </p>
        {signalsData.signals?.map((signal) =>
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
