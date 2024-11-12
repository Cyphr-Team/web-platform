import { CheckIcon } from "lucide-react"

interface Props {
  signalCount: number
}

export const SignalCount: React.FC<Props> = ({ signalCount }) => {
  if (signalCount > 0) {
    return (
      <div className="flex size-8 cursor-default items-center justify-center rounded-full bg-error-500 p-2 text-white">
        <p>{signalCount}</p>
      </div>
    )
  }

  return (
    <p className="size-8 cursor-default rounded-full bg-gray-400 p-2 text-white">
      <CheckIcon className="size-4" />
    </p>
  )
}
