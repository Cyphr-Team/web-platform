import { cn } from "@/lib/utils"

interface Props {
  label: string
  value?: string
  className?: string
  description?: string
  hasUnderline?: boolean
}

export function FormDetailsRow({
  label,
  value,
  className,
  description
}: Props) {
  return (
    <div className="flex flex-col">
      <div className={cn(className, "flex justify-between py-xl items-center")}>
        <div className="flex flex-col">
          <div className="text-base font-medium text-text-secondary">
            {label}
          </div>
          {!!description && (
            <p className="text-sm text-text-tertiary">{description}</p>
          )}
        </div>
        <p className="text-base">{value ?? "N/A"}</p>
      </div>
    </div>
  )
}
