import { CheckIcon } from "lucide-react"

interface Props {
  signalCount: number
}

export const SignalCount: React.FC<Props> = ({ signalCount }) => {
  if (signalCount > 0) {
    return (
      <div className="rounded-full bg-error-500 text-white p-2 h-8 w-8 cursor-default flex items-center justify-center">
        <p>{signalCount}</p>
      </div>
    )
  }

  return (
    <p className="rounded-full bg-gray-400 text-white p-2 h-8 w-8 cursor-default">
      <CheckIcon className="h-4 w-4" />
    </p>
  )
}
