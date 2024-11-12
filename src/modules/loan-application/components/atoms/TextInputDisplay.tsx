import { cn } from "@/lib/utils"

interface TextInputDisplayProps {
  label: string
  value?: string
  className?: string
}

export function TextInputDisplay({
  label,
  value,
  className
}: TextInputDisplayProps) {
  return (
    <div className={cn(className, "gap-sm flex flex-col")}>
      <div className="text-sm font-medium text-text-secondary">{label}</div>
      <p className="items-center truncate text-base hover:overflow-visible hover:whitespace-normal hover:break-all">
        {value ?? "N/A"}
      </p>
    </div>
  )
}
