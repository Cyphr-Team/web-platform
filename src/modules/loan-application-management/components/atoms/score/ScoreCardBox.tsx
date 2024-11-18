import { cn } from "@/lib/utils"
import { valueOrZero } from "@/utils"

interface IScoreCardProps {
  name: string
  score: number
  hasBorder?: boolean
  multiple?: boolean
}

export function ScoreCardBox({
  name,
  score,
  hasBorder,
  multiple
}: IScoreCardProps) {
  const formatScore = valueOrZero(score)

  return (
    <div
      className={cn(
        "mb-4 mt-5 w-fit",
        hasBorder && "rounded-md border border-gray-300",
        multiple && "w-full p-2 pb-1"
      )}
    >
      <div className="mb-1 text-xs font-medium uppercase text-zinc-500">
        {name}
      </div>

      <span
        className={cn(
          multiple ? "text-md lg:text-3xl" : "text-md lg:text-5xl",
          formatScore === 0 ? "text-gray-200" : null
        )}
      >
        {formatScore}
        <span className="text-black">/5</span>
      </span>
    </div>
  )
}
