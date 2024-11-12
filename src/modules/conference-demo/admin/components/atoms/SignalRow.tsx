import SignalCount from "@/modules/conference-demo/admin/components/atoms/SignalCount"
import { type SignalsType } from "@/modules/conference-demo/admin/constants/type"
import React from "react"

interface Props {
  signalsData: SignalsType
}
const SignalRow: React.FC<Props> = ({ signalsData }) => {
  return (
    <div className="flex flex-1 items-center justify-between border-b py-4 text-sm font-medium">
      <div className="flex items-center justify-start gap-2">
        <SignalCount signalCount={signalsData.signalCount} />
        <p className="text-sm font-semibold text-gray-500">
          {signalsData.signalDisplayName}
        </p>
      </div>
    </div>
  )
}

export default SignalRow
