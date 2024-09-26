import { cn } from "@/lib/utils"

interface IScoreCardProps {
  name: string
  score: number
  hasBorder?: boolean
  multiple?: boolean
  isFinishScored?: boolean
}

export const ScoreCardBox = ({
  name,
  score,
  hasBorder,
  multiple,
  isFinishScored
}: IScoreCardProps) => {
  return (
    <div
      className={cn(
        "mt-5 mb-4 w-fit",
        hasBorder && "border border-gray-300 rounded-md",
        multiple && "p-2 w-full pb-1"
      )}
    >
      <div className="uppercase text-xs font-medium text-zinc-500 mb-1">
        {name}
      </div>

      <span
        className={cn(
          multiple ? "text-md lg:text-3xl" : "text-md lg:text-5xl",
          !isFinishScored && "text-gray-200"
        )}
      >
        {score}
        <span className="text-black">/5</span>
      </span>
    </div>
  )
}
