import { CheckCircle2 } from "lucide-react"

export function CashFlowConnectedBadge() {
  return (
    <div className="text-sm rounded-lg flex items-center border border-success justify-center gap-1 font-semibold text-success bg-white h-8 lg:h-10 px-2 lg:px-4 py-2">
      <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-white fill-green-600" />
      Connected
    </div>
  )
}
