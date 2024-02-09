import { SignalsType } from "@/modules/loan-application-management/constants/type"
import React from "react"
import { SignalCount } from "../../atoms/signals/SignalCount"

type Props = {
  signalsData: SignalsType
}
export const SignalRow: React.FC<Props> = ({ signalsData }) => {
  return (
    <div className="flex flex-1 items-center justify-between py-4 text-sm font-medium border-b">
      <div className="flex justify-start items-center gap-2">
        <SignalCount signalCount={signalsData.signalCount} />
        <p className="text-sm font-semibold text-gray-500">
          {signalsData.signalDisplayName}
        </p>
      </div>
    </div>
  )
}
