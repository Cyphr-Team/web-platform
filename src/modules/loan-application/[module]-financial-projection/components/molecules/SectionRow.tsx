import { cn } from "@/lib/utils.ts"

interface TableTitleProps {
  title: string
  className?: string
  isFirst?: boolean
}

export function SectionRow(props: TableTitleProps) {
  const { title, className = "", isFirst = false } = props

  return (
    <div
      className={cn(
        "flex items-center p-4 text-sm font-bold",
        isFirst ? "" : "border-t border-t-black",
        className
      )}
    >
      {title}
    </div>
  )
}
