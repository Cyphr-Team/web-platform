import { cn } from "@/lib/utils"

type TextInputDisplayProps = {
  label: string
  value?: string
  className?: string
}

export const TextInputDisplay = ({
  label,
  value,
  className
}: TextInputDisplayProps) => {
  return (
    <div className={cn(className, "gap-sm flex flex-col")}>
      <div className="text-text-secondary font-medium text-sm">{label}</div>
      <p className="text-base items-center truncate overflow-ellipsis hover:overflow-visible hover:whitespace-normal hover:break-all">
        {value ?? "N/A"}
      </p>
    </div>
  )
}
